import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackIcon from "@/assets/icons/BackIcon";
import { globalStyles } from "@/styles/global";

interface CommentFormProps {
  placeholder?: string;
  onTextChange?: (text: string) => void;
  onCommentSubmit?: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  placeholder = "Коментувати",
  onTextChange,
  onCommentSubmit,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (text: string) => {
    setComment(text);
    onTextChange && onTextChange(text);
  };

  const handleSubmit = () => {
    console.log(comment);
    onCommentSubmit && onCommentSubmit(comment);
    setComment("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={comment}
        onChangeText={handleCommentChange}
        multiline={true}
        numberOfLines={7}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <BackIcon
            size={20}
            strokeColor={globalStyles.colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    backgroundColor: globalStyles.colors.lightGray,
    borderRadius: 34,
    padding: 8,
    paddingLeft: 16,
    borderColor: globalStyles.colors.strokeGray,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: globalStyles.mainFont.regular,
    fontSize: 16,
    maxHeight: 200,
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: globalStyles.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "90deg" }],
  }
});

export default CommentForm;
