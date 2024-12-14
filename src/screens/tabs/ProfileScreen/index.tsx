import PostCard from "@/src/components/PostCard";
import AddRemoveButton from "@/src/components/ui/AddRemoveButton";
import { Coordinates, PostType } from "@/src/data/post";
import { updatePost } from "@/src/redux/reducers/postsSlice";
import { setUserInfo } from "@/src/redux/reducers/userSlice";
import { RootState } from "@/src/redux/store";
import {
  getPostsForUser,
  updateLikes,
  updateUserImage,
} from "@/src/utils/firestore";
import { pickImage } from "@/src/utils/imagePicker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/screens/tabs/ProfileScreen/styles";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import LogOutIcon from "@/assets/icons/LogOutIcon";
import { logoutDB } from "@/src/utils/auth";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);
  const allPosts = useSelector((state: RootState) => state.posts);
  const [image, setImage] = useState(currentUser?.image || "");
  const [name, setName] = useState(currentUser?.name || "");
  const [posts, setUserPosts] = useState<PostType[]>([]);

  const handleAddRemoveImageClick = async () => {
    const picked = await pickImage();
    if (picked && currentUser) {
      await updateUserImage(currentUser.userId, picked);
      dispatch(setUserInfo({ ...currentUser, image: picked }));
      setImage(picked);
    }
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
    console.log("Location press", location);
    navigation.navigate("map", {
      coordinates,
    });
  };

  const onLogOutPress = () => {
    logoutDB(dispatch);
  }

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!currentUser) return;

      const tempPosts = await getPostsForUser(currentUser.userId);
      setUserPosts(tempPosts);
    };

    fetchUserPosts();
  }, [allPosts]);

  return (
    <>
      <ImageBackground
        source={require("@/assets/images/mountains-bg.jpg")}
        style={styles.backgroundImage}
      />
      <ScrollView
        contentContainerStyle={[
          styles.displayHeightContainer,
          {
            paddingTop: insets.top + 103,
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false} // Disable bouncing on iOS
        overScrollMode="never" // Disable overscroll on Android
      >
        <View style={[styles.container]}>
          <View style={styles.avatarContent}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarImage} />
            )}
            <AddRemoveButton
              hasContent={image !== ""}
              onPress={handleAddRemoveImageClick}
            />
          </View>
          <TouchableOpacity
            style={[styles.logOutBotton]}
            onPress={onLogOutPress}
          >
            <LogOutIcon />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.title}>{name}</Text>
            {posts.length > 0 ? (
              <View style={styles.postsListContent}>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    postId={post.id}
                    image={post.image}
                    title={post.title}
                    location={post.location}
                    coordinates={post.coordinates}
                    comments={post.comments.length}
                    likes={post.likes}
                    isMine={post.ownerId !== currentUser?.userId}
                    onCommentPress={onCommentPress}
                    onLikePress={onLikePress}
                    onLocationPress={onLocationPress}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.noPostsText}>There is no posts yet</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
