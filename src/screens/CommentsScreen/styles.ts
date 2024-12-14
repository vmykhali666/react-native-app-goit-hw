import { StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.white,
  },
  commentsListContent: {
    paddingHorizontal: 16,
    paddingTop: 32,
    gap: 24,
    paddingBottom: 66 + 66,
  },
  commentsList: {
    flex: 1,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: globalStyles.colors.lightGray,
  },
  commentFormContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: globalStyles.colors.white,
    padding: 16,
  },
});

export default styles;
