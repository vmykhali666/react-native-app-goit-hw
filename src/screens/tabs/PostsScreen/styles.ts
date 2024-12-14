import { StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.white,
  },
  userCard: {},
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

export default styles;
