import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import { globalStyles } from "@/styles/global";
import BackIcon from "@/assets/icons/BackIcon";
import LogOutIcon from "@/assets/icons/LogOutIcon";

interface CustomHeaderProps extends BottomTabHeaderProps {
  showLogOutButton?: boolean;
  showBackButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  navigation,
  route,
  options,
  showLogOutButton = false,
  showBackButton = false,
}) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={[styles.backButton, showBackButton && { opacity: 1 }]}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity
          style={[styles.logOutBotton, showLogOutButton && { opacity: 1 }]}
          onPress={() => navigation.navigate("login")}
        >
          <LogOutIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: globalStyles.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.colors.strokeGray,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 88,
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    color: globalStyles.colors.primary,
    fontSize: globalStyles.sizes.font.regular,
    fontFamily: globalStyles.mainFont.medium,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  },
  logOutBotton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  },
});

export default CustomHeader;
