import { StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    backgroundColor: globalStyles.colors.white,
    width: "100%",
    borderTopStartRadius: globalStyles.sizes.borderRadius.content,
    borderTopEndRadius: globalStyles.sizes.borderRadius.content,
    fontFamily: globalStyles.mainFont.regular,
    paddingTop: globalStyles.sizes.margins.defaultMargin,
  },
  avatarContent: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  content: {
    paddingLeft: globalStyles.sizes.padding,
    paddingRight: globalStyles.sizes.padding,
  },
  title: {
    fontSize: globalStyles.sizes.font.title,
    fontWeight: "medium",
    textAlign: "center",
    fontFamily: globalStyles.mainFont.medium,
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: globalStyles.sizes.padding,
    marginBottom: globalStyles.sizes.margins.marginBottom,
    marginTop: globalStyles.sizes.margins.defaultMargin,
  },
  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: globalStyles.sizes.padding,
  },
  redirectText: {
    fontFamily: globalStyles.mainFont.regular,
    fontSize: globalStyles.sizes.font.regular,
    color: globalStyles.colors.darkBlue,
  },
  registerLink: {
    fontSize: globalStyles.sizes.font.regular,
    color: globalStyles.colors.darkBlue,
    textDecorationLine: "underline",
  },
});

export default styles;
