import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import UniversalButton from "./ui/UniversalButton";
import CommentsIcon from "@/assets/icons/CommentsIcon";
import { globalStyles } from "@/styles/global";
import LocationIcon from "@/assets/icons/LocationIcon";
import LikeIcon from "@/assets/icons/LikeIcon";
import { useNavigation } from "expo-router";
import * as Location from "expo-location";

interface PostCardProps {
  postId: string;
  image: string;
  title: string;
  location: string;
  isMine?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  postId,
  image,
  title,
  location,
  isMine = false,
}) => {
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const navigation = useNavigation();

  const onCommentPress = () => {
    navigation.navigate("comments", { postId });
  };

  const onLikePress = () => {
    setLikes(likes + 1);
  };

  const onLocationPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    await Location.geocodeAsync(location).then((result) => {
      navigation.navigate("map", {
        location: {
          latitude: result[0].latitude,
          longitude: result[0].longitude,
        },
      });
    })
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.footer}>
        <View style={styles.commentButtons}>
          <UniversalButton
            style={styles.commentButton}
            onPress={onCommentPress}
          >
            <CommentsIcon
              size={24}
              strokeColor={
                comments > 0
                  ? globalStyles.colors.accent
                  : globalStyles.colors.regularGray
              }
              fillColor={
                comments > 0 ? globalStyles.colors.accent : "transparent"
              }
            />
            <Text
              style={[
                styles.commentText,
                {
                  color:
                    comments > 0
                      ? globalStyles.colors.accent
                      : globalStyles.colors.regularGray,
                },
              ]}
            >
              {comments}
            </Text>
          </UniversalButton>
          {!isMine && (
            <UniversalButton style={styles.commentButton} onPress={onLikePress}>
              <LikeIcon
                size={24}
                strokeColor={
                  likes > 0
                    ? globalStyles.colors.accent
                    : globalStyles.colors.regularGray
                }
                fillColor={
                  likes > 0 ? globalStyles.colors.accent : "transparent"
                }
              />
              <Text
                style={[
                  styles.commentText,
                  {
                    color:
                      likes > 0
                        ? globalStyles.colors.accent
                        : globalStyles.colors.regularGray,
                  },
                ]}
              >
                {likes}
              </Text>
            </UniversalButton>
          )}
        </View>
        <View style={styles.location}>
          <LocationIcon
            size={24}
            strokeColor={globalStyles.colors.regularGray}
          />
          <TouchableOpacity onPress={onLocationPress}>
            <Text style={styles.locationText}>{location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  title: {
    fontSize: globalStyles.sizes.font.regular,
    fontFamily: globalStyles.mainFont.medium,
    marginVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentButtons: {
    flexDirection: "row",
    gap: 24,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  commentText: {
    fontSize: globalStyles.sizes.font.regular,
    fontFamily: globalStyles.mainFont.regular,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: globalStyles.sizes.font.regular,
    fontFamily: globalStyles.mainFont.regular,
    textDecorationLine: "underline",
  },
});

export default PostCard;
