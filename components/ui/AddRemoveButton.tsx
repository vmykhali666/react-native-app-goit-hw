import React, { useRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import AddIcon from "@/assets/icons/AddIcon";
import { globalStyles } from "@/styles/global";

interface AddRemoveButtonProps {
    hasContent: boolean;
    onPress: () => void;
}

const AddRemoveButton: React.FC<AddRemoveButtonProps> = ({
    hasContent,
    onPress,
}) => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(rotation, {
            toValue: hasContent ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [hasContent]);

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"],
    });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Animated.View style={{ transform: [{ rotate }] }}>
                <AddIcon
                    style={styles.icon}
                    color={
                        hasContent
                            ? globalStyles.colors.strokeGray
                            : globalStyles.colors.accent
                    }
                    fillColor={globalStyles.colors.white}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        right: -12,
        bottom: 14,
    },
    icon: {},
});

export default AddRemoveButton;
