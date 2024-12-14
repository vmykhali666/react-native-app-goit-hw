import PostCard from "@/src/components/PostCard";
import UserPostCard from "@/src/components/ui/UserPostCard";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { getPosts, updateLikes } from "@/src/utils/firestore";
import { setPosts, updatePost } from "@/src/redux/reducers/postsSlice";
import { Coordinates } from "@/src/data/post";
import styles from "@/src/screens/tabs/PostsScreen/styles";

const PostsScreen = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const tempPosts = await getPosts();
    dispatch(setPosts(tempPosts));
    setRefreshing(false);
  };

  const onCommentPress = (postId: string) => {
    navigation.navigate("comments", {
      post: posts.find((post) => post.id === postId),
    });
  };

  const onLikePress = async (postId: string) => {
    if (!currentUser) {
      return;
    }
    await updateLikes(postId, currentUser.userId);

    const updatedPost = posts.find((post) => post.id === postId);

    if (!updatedPost) {
      return;
    }

    const isAlreadyLiked = updatedPost?.likesUsers.includes(currentUser.userId);

    dispatch(
      updatePost({
        ...updatedPost,
        likes: isAlreadyLiked ? updatedPost.likes - 1 : updatedPost.likes + 1,
        likesUsers: isAlreadyLiked
          ? updatedPost.likesUsers.filter((id) => id !== currentUser.userId)
          : [...updatedPost.likesUsers, currentUser.userId],
      })
    );
  };

  const onLocationPress = (coordinates: Coordinates) => {
    navigation.navigate("map", {
      coordinates,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            postId={item.id}
            image={item.image}
            title={item.title}
            location={item.location}
            coordinates={item.coordinates}
            comments={item.comments.length}
            likes={item.likes}
            isMine={item.ownerId !== currentUser?.userId}
            onCommentPress={onCommentPress}
            onLikePress={onLikePress}
            onLocationPress={onLocationPress}
          />
        )}
        style={styles.postsList}
        contentContainerStyle={styles.postsListContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["grey"]}
            progressBackgroundColor={"black"}
          />
        }
        ListHeaderComponent={
          currentUser && (
            <UserPostCard
              style={styles.userCard}
              imageUrl={currentUser?.image}
              name={currentUser?.name || "Name"}
              email={currentUser?.email || "Email"}
            />
          )
        }
      />
    </View>
  );
};

export default PostsScreen;
