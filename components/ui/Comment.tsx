import { globalStyles } from "@/styles/global";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface CommentProps {
  id: string;
  avatarUrl: string;
  text: string;
  date: string;
  time: string;
  leftSide: boolean;
}

const Comment: React.FC<CommentProps> = ({
  id,
  avatarUrl,
  text,
  date,
  time,
  leftSide,
}) => {
  return (
    <View key={id} style={styles.container}>
      {leftSide && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}
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
          <Text style={styles.dateTime}>{time}</Text>
        </View>
      </View>
      {!leftSide && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}
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
