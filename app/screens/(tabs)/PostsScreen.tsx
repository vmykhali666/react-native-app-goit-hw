import UserPostCard from "@/components/ui/UserPostCard";
import { globalStyles } from "@/styles/global";
import React from "react";
import { View, StyleSheet } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <UserPostCard
        imageUrl="https://img.freepik.com/free-photo/portrait-beautiful-smiling-brunette-model-dressed-summer-hipster-jacket-clothes_158538-1693.jpg?t=st=1733349784~exp=1733353384~hmac=37067362d3ce5cc05f2166639e865bba27ef572361dd0e2532d10bc4a42be8e5&w=1800"
        name="Natali Romanova"
        email="email@example.com"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: globalStyles.colors.white,
  },
});

export default PostsScreen;
