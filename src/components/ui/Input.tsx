import { AppIconProps } from "@/src/data/types";
import { globalStyles } from "@/styles/global";
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface InputProps {
  placeholder: string;
  icon?: React.FC<AppIconProps>;
  onTextChanged?: (text: string) => void;
  onBlur?: () => void;
  onFocused?: () => void;
  value?: string;
  children?: any;
}

const Input: React.FC<InputProps> = ({
  placeholder = "text",
  icon = null,
  value = "",
  children = null,
  onTextChanged,
  onBlur,
  onFocused,
}) => {
  const [isFocused, setFocus] = useState(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleTextChange = (text: string) => {
    if (onTextChanged) {
      onTextChanged(text);
    }
  };

  const handleBlur = () => {
    setFocus(false);
    if (onBlur) {
      onBlur();
    }
  };

  const handleOnFocus = () => {
    setFocus(true);
    if (onFocused) {
      onFocused();
    }
  }

  return (
    <View style={[styles.inputContainer, isFocused && styles.focused]}>
      {icon &&
        React.createElement(icon, {
          strokeColor: isFocused
            ? globalStyles.colors.accent
            : globalStyles.colors.regularGray,
          fillColor: isFocused
            ? globalStyles.colors.accent
            : globalStyles.colors.regularGray,
          size: 24,
        })}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={text}
        onChangeText={handleTextChange}
        placeholderTextColor={globalStyles.colors.regularGray}
        onFocus={handleOnFocus}
        onBlur={handleBlur}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: globalStyles.colors.strokeGray,
    gap: 4,
  },
  textInput: {
    flex: 1,
    fontFamily: globalStyles.mainFont.regular,
    fontSize: 16,
    color: globalStyles.colors.primary,
    paddingVertical: 16,
  },
  focused: {
    borderColor: globalStyles.colors.accent,
  },
});

export default Input;
