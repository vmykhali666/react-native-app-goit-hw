import { StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  displayHeightContainer: {
    minHeight: "100%",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: globalStyles.colors.white,
    width: "100%",
    borderTopStartRadius: globalStyles.sizes.borderRadius.content,
    borderTopEndRadius: globalStyles.sizes.borderRadius.content,
    fontFamily: globalStyles.mainFont.regular,
    paddingTop: 92,
    paddingBottom: 43,
  },
  avatarContent: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  content: {},
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: globalStyles.sizes.borderRadius.avatar,
    backgroundColor: globalStyles.colors.lightGray,
  },
  title: {
    fontSize: globalStyles.sizes.font.title,
    fontWeight: "medium",
    textAlign: "center",
    fontFamily: globalStyles.mainFont.medium,
    marginBottom: 32,
  },
  postsListContent: {
    paddingHorizontal: 16,
    gap: 32,
  },
  noPostsText: {
    fontSize: globalStyles.sizes.font.regular,
    textAlign: "center",
    fontFamily: globalStyles.mainFont.regular,
  },
  logOutBotton: {
    position: "absolute",
    top: 22,
    right: 16,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
