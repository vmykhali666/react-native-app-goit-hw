import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/styles/global';

interface StylizedButtonProps {
    text?: string;
    iconName?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: ViewStyle;
}

const StylizedButton: React.FC<StylizedButtonProps> = ({ text, iconName, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {iconName && <Ionicons name={iconName} size={24} color={globalStyles.colors.accent} />}
            {text && <Text style={styles.text}>{text}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: globalStyles.colors.accent,
        borderRadius: 100,
        width: '100%',
    },
    text: {
        color: globalStyles.colors.white,
        fontFamily: globalStyles.mainFont.regular,
    },
});

export default StylizedButton;