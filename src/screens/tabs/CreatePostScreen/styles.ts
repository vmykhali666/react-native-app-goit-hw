import { globalStyles } from "@/styles/global";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: globalStyles.colors.white,
    paddingTop: 32,
    paddingHorizontal: 16,
    gap: 32,
  },
  imageContent: {
    width: "100%",
    alignItems: "flex-start",
    gap: 8,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    backgroundColor: globalStyles.colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: globalStyles.colors.strokeGray,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundImage: "cover",
    overflow: "hidden",
  },
  imageCamera: {
    width: "100%",
    height: "100%",
  },
  imageButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -30,
    marginTop: -30,
    backgroundColor: globalStyles.colors.white,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLoaded: {
    backgroundColor: globalStyles.colors.whiteTransparent,
  },
  imageText: {
    fontFamily: globalStyles.mainFont.regular,
    fontSize: 16,
    color: globalStyles.colors.regularGray,
  },
  trashButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: globalStyles.colors.accent,
    width: 70,
    height: 40,
  },
  disabled: {
    backgroundColor: globalStyles.colors.lightGray,
    color: globalStyles.colors.regularGray,
  },

  inputsContent: {
    width: "100%",
    gap: 16,
  },
  locationHints: {
    position: "absolute",
    left: 0,
    bottom: 60,
    width: "100%",
    maxHeight: 160,
    fontSize: 16,
    color: globalStyles.colors.primary,
    backgroundColor: globalStyles.colors.white,
    borderRadius: 8,
    borderColor: globalStyles.colors.accent,
    borderWidth: 1,
  },
  locationHint: {
    padding: 8,
    backgroundColor: globalStyles.colors.white,
    borderRadius: 8,
  },
  hintText: {
    color: globalStyles.colors.primary,
    fontSize: 16,
  },
  hintContainer: {
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export default styles;
