import TrashIcon from "@/assets/icons/TrashIcon";
import { globalStyles } from "@/styles/global";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CreatePostScreen = () => {

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          console.log("trash");
        }}
        style={[styles.tab, styles.focused]}
      >
        <TrashIcon
          size={24}
          strokeColor={globalStyles.colors.white}
          fillColor={globalStyles.colors.white}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text>Create Post Screen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  focused: {
    backgroundColor: globalStyles.colors.accent,
    width: 70,
  },
});

export default CreatePostScreen;
