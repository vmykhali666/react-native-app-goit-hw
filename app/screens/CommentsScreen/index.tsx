import Comment from "@/components/ui/Comment";
import CommentForm from "@/components/ui/CommentForm";
import { globalStyles } from "@/styles/global";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ParamList = {
  comments: {
    postId: number;
    otherParam?: string;
  };
};

const CommentsScreen = () => {
  const route = useRoute<RouteProp<ParamList, "comments">>();
  const insets = useSafeAreaInsets();

  const { postId } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {
            id: "1",
            avatarUrl: "https://picsum.photos/80",
            text: "This is a great post! Thanks for sharing. I really enjoyed reading it and found the information very useful.",
            date: "2023-10-01",
            time: "10:00 AM",
            leftSide: true,
          },
          {
            id: "2",
            avatarUrl: "https://picsum.photos/80",
            text: "I found this information really helpful. It answered a lot of questions I had and provided clear explanations.",
            date: "2023-10-02",
            time: "11:00 AM",
            leftSide: false,
          },
          {
            id: "3",
            avatarUrl: "https://picsum.photos/80",
            text: "Can you provide more details on this topic? I am particularly interested in the methods you used.",
            date: "2023-10-03",
            time: "12:00 PM",
            leftSide: true,
          },
          {
            id: "4",
            avatarUrl: "https://picsum.photos/80",
            text: "I agree with the previous comment. More details would be helpful.",
            date: "2023-10-04",
            time: "1:00 PM",
            leftSide: false,
          },
          {
            id: "5",
            avatarUrl: "https://picsum.photos/80",
            text: "I would also like to know more about the methods used. Can you provide additional information?",
            date: "2023-10-05",
            time: "2:00 PM",
            leftSide: true,
          },
          {
            id: "6",
            avatarUrl: "https://picsum.photos/80",
            text: "Can you provide more details on this topic? I am particularly interested in the methods you used.",
            date: "2023-10-03",
            time: "12:00 PM",
            leftSide: true,
          },
          {
            id: "7",
            avatarUrl: "https://picsum.photos/80",
            text: "I agree with the previous comment. More details would be helpful.",
            date: "2023-10-04",
            time: "1:00 PM",
            leftSide: false,
          },
          {
            id: "8",
            avatarUrl: "https://picsum.photos/80",
            text: "I would also like to know more about the methods used. Can you provide additional information?",
            date: "2023-10-05",
            time: "2:00 PM",
            leftSide: true,
          },
          {
            id: "9",
            avatarUrl: "https://picsum.photos/80",
            text: "Can you provide more details on this topic? I am particularly interested in the methods you used.",
            date: "2023-10-03",
            time: "12:00 PM",
            leftSide: true,
          },
          {
            id: "10",
            avatarUrl: "https://picsum.photos/80",
            text: "I agree with the previous comment. More details would be helpful.",
            date: "2023-10-04",
            time: "1:00 PM",
            leftSide: false,
          },
          {
            id: "11",
            avatarUrl: "https://picsum.photos/80",
            text: "I would also like to know more about the methods used. Can you provide additional information?",
            date: "2023-10-05",
            time: "2:00 PM",
            leftSide: true,
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Comment
            id={item.id}
            avatarUrl={item.avatarUrl}
            text={item.text}
            date={item.date}
            time={item.time}
            leftSide={item.leftSide}
          />
        )}
        style={styles.commentsList}
        contentContainerStyle={styles.commentsListContent}
        ListHeaderComponent={() => (
          <Image
            source={{ uri: "https://picsum.photos/400/600" }}
            style={styles.postImage}
          />
        )}
      />
      <View style={[styles.commentFormContainer, {
        paddingBottom: 16 + insets.bottom,
      }]}>
        <CommentForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.white,
  },
  commentsListContent: {
    paddingHorizontal: 16,
    paddingTop: 32,
    gap: 24,
    paddingBottom: 66 + 31,
  },
  commentsList: {
    flex: 1,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentFormContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: globalStyles.colors.white,
    padding: 16,
  },
});

export default CommentsScreen;
