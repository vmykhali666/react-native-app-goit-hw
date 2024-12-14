import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface UniversalButtonProps {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

const UniversalButton: React.FC<UniversalButtonProps> = ({
  onPress,
  style,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UniversalButton;
