import { globalStyles } from "@/styles/global";
import React, { useState } from "react";
import {
    TextInput,
    StyleSheet,
    TextInputProps,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

interface StylizedInputTextProps extends TextInputProps {
    placeholderText: string;
    withShowHideSecure?: boolean;
}

const StylizedInputText: React.FC<StylizedInputTextProps> = ({
    placeholderText,
    withShowHideSecure = false,
    ...props
}) => {
    const [text, setText] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [focused, setFocused] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    focused && styles.focused,
                    withShowHideSecure && styles.withSecure,
                ]}
                placeholder={placeholderText}
                secureTextEntry={showPassword}
                value={text}
                onChangeText={setText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
            {withShowHideSecure && (
                <TouchableOpacity style={styles.showHideSecure} onPress={toggleShowPassword}>
                    <Text style={styles.showHideSecureText}>
                        {showPassword ? "Показати" : "Приховати"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    input: {
        borderWidth: 1,
        borderColor: globalStyles.colors.strokeGray,
        fontFamily: globalStyles.mainFont.regular,
        padding: 16,
        borderRadius: 8,
        width: "100%",
        fontSize: 16,
        color: globalStyles.colors.primary,
        backgroundColor: globalStyles.colors.lightGray,
    },
    withSecure: {
        paddingRight: 100,
    },
    focused: {
        borderColor: globalStyles.colors.accent,
    },
    showHideSecure: {
        position: "absolute",
        right: 16,
        top: 16,
    },
    showHideSecureText: {
        fontFamily: globalStyles.mainFont.regular,
        color: globalStyles.colors.darkBlue,
    },
});

export default StylizedInputText;
