import PostCard from "@/components/PostCard";
import UserPostCard from "@/components/ui/UserPostCard";
import { globalStyles } from "@/styles/global";
import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {
            id: "1",
            image: "https://picsum.photos/200/300",
            title: "Karpaty",
            location: "Karpaty, Ukraine",
            isMine: true,
          },
          {
            id: "2",
            image: "https://picsum.photos/200/300",
            title: "Mountains",
            location: "Karpaty, Ukraine",
            isMine: true,
          },
          {
            id: "3",
            image: "https://picsum.photos/200/300",
            title: "Kharkiv",
            location: "Kharkiv, Ukraine",
            isMine: true,
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            postId={item.id}
            image={item.image}
            title={item.title}
            location={item.location}
            isMine={item.isMine}
          />
        )}
        style={styles.postsList}
        contentContainerStyle={ styles.postsListContent }
        ListHeaderComponent={() => (
          <UserPostCard
            style={styles.userCard}
            imageUrl="https://picsum.photos/200/300"
            name="John Doe"
            email="example@gmail.com"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.white,
  },
  userCard: {
  },
  postsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postsListContent: {
    paddingTop: 32,
    paddingBottom: 16,
    gap: 32,
  },
});

export default PostsScreen;
