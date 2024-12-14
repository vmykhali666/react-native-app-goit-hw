import Comment from "@/src/components/ui/Comment";
import CommentForm from "@/src/components/ui/CommentForm";
import { PostComment } from "@/src/data/post";
import { CommentsParamList } from "@/src/data/types";
import { RootState } from "@/src/redux/store";
import { getPostById, updateComments } from "@/src/utils/firestore";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "@/src/redux/reducers/postsSlice";
import styles from "@/src/screens/CommentsScreen/styles";

const CommentsScreen = () => {
  const route = useRoute<RouteProp<CommentsParamList, "comments">>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { post } = route.params;
  const currentUser = useSelector((state: RootState) => state.user.userInfo);

  const [comments, setComments] = useState<PostComment[]>(post.comments || []);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComments = async () => {
    const currentPostInfo = await getPostById(post.id);
    currentPostInfo && setComments(currentPostInfo.comments);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchComments();
    setRefreshing(false);
  };

  const onCommentSubmit = async (text: string) => {
    if (!text || !currentUser) {
      return;
    }

    const newComment: PostComment = {
      id: currentUser.userId + "_" + Date.now(),
      ownerId: currentUser.userId,
      text,
      createdAt: Date.now(),
    };

    await updateComments(post.id, newComment);
    setComments((prev) => [...prev, newComment]);
    dispatch(updatePost({ ...post, comments: [...post.comments, newComment] }));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Comment
            id={item.id}
            ownerId={item.ownerId}
            text={item.text}
            createAt={item.createdAt}
            leftSide={item.ownerId !== currentUser?.userId}
          />
        )}
        style={styles.commentsList}
        contentContainerStyle={styles.commentsListContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["grey"]}
            progressBackgroundColor={"black"}
          />
        }
        ListHeaderComponent={
          post?.image ? (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          ) : (
            <View style={styles.postImage} />
          )
        }
      />
      <View
        style={[
          styles.commentFormContainer,
          {
            paddingBottom: 16 + insets.bottom,
          },
        ]}
      >
        <CommentForm onCommentSubmit={onCommentSubmit} />
      </View>
    </View>
  );
};

export default CommentsScreen;
