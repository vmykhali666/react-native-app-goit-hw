import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "@/styles/global";

interface StylizedButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  text?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const StylizedButton: React.FC<StylizedButtonProps> = ({
  text,
  iconName,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, props.disabled && styles.disabled]}
      onPress={onPress}
      {...props}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={24}
          color={globalStyles.colors.accent}
        />
      )}
      {text && <Text style={[styles.text, textStyle, props.disabled && styles.disabled]}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: globalStyles.colors.accent,
    borderRadius: 100,
    width: "100%",
  },
  text: {
    color: globalStyles.colors.white,
    fontFamily: globalStyles.mainFont.regular,
    fontSize: globalStyles.sizes.font.regular,
  },
  disabled: {
    color: globalStyles.colors.regularGray,
    backgroundColor: globalStyles.colors.lightGray,
  },
});

export default StylizedButton;
