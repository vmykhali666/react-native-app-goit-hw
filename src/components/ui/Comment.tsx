import { getUser } from "@/src/utils/firestore";
import { globalStyles } from "@/styles/global";
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface CommentProps {
  id: string;
  ownerId: string;
  text: string;
  createAt: number;
  leftSide: boolean;
}

const Comment: React.FC<CommentProps> = (comment) => {
  const { id, ownerId, text, createAt, leftSide } = comment;

  const postDate = new Date(createAt);
  const time = postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = postDate.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getUser(ownerId);
      setAvatarUrl(user?.image || "");
    };

    getUserInfo();
    console.log("Comment rendered");
  }, []);

  return (
    <View key={id} style={styles.container}>
      {leftSide &&
        (avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        ))}
      <View
        style={[
          styles.textContainer,
          !leftSide && {
            alignItems: "flex-start",
            borderTopRightRadius: 0,
            borderTopLeftRadius: 6,
          },
        ]}
      >
        <Text style={styles.text}>{text}</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>{date}</Text>
          <Text style={styles.dateTime}>{"|"}</Text>
          <Text style={styles.dateTime}>{time}</Text>
        </View>
      </View>
      {!leftSide &&
        (avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: globalStyles.colors.lightGray,
  },
  textContainer: {
    flex: 1,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: globalStyles.colors.lightGray,
    gap: 8,
    padding: 16,
    alignItems: "flex-end",
  },
  text: {
    fontSize: 13,
    color: globalStyles.colors.primary,
    fontFamily: globalStyles.mainFont.regular,
    width: "100%",
  },
  dateTimeContainer: {
    flexDirection: "row",
    gap: 4,
  },
  dateTime: {
    fontSize: 10,
    color: globalStyles.colors.regularGray,
    fontFamily: globalStyles.mainFont.regular,
  },
});

export default Comment;
