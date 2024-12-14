import { globalStyles } from "@/styles/global";
import React from "react";
import { View, Text, Image, StyleSheet, ViewStyle } from "react-native";

interface UserPostCardProps {
  imageUrl?: string;
  name: string;
  email: string;
  style?: ViewStyle | ViewStyle[];
}

const UserPostCard: React.FC<UserPostCardProps> = ({
  imageUrl,
  name,
  email,
  style = {},
}) => {
  return (
    <View style={[styles.card, style]}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.image} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: globalStyles.colors.lightGray,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 13,
    fontFamily: globalStyles.mainFont.bold,
    fontWeight: "bold",
  },
  email: {
    fontSize: 11,
    fontFamily: globalStyles.mainFont.regular,
    color: globalStyles.colors.secondary,
  },
});

export default UserPostCard;
