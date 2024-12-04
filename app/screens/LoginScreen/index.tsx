import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StylizedInputText from "@/components/ui/StylizedInputText";
import StylizedButton from "@/components/ui/StylizedButton";
import { globalStyles } from "@/styles/global";
import useKeyboardIsVisible from "@/hooks/useKeyboardIsVisible";
import { LoginFormData } from "@/data/types";

const LoginScreen = () => {
  const bottomPadding = 111;

  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const handleRegistrationRedirectLink = () => {
    navigation.navigate("registration");
  };

  const isKeyboardVisible = useKeyboardIsVisible();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    console.log("Form Data:", formData);
    navigation.navigate("home");
  };

  const handleInputChange = (name: keyof LoginFormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("@/assets/images/mountains-bg.jpg")}
          style={styles.backgroundImage}
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              styles.container,
              {
                paddingBottom: !isKeyboardVisible
                  ? insets.bottom + bottomPadding
                  : 0,
              },
            ]}
          >
            <View style={styles.content}>
              <Text style={styles.title}>Увійти</Text>
              <View
                style={[
                  styles.inputs,
                  {
                    marginBottom: isKeyboardVisible
                      ? globalStyles.sizes.margins.defaultMargin
                      : globalStyles.sizes.margins.marginBottom,
                  },
                ]}
              >
                <StylizedInputText
                  placeholderText="Адреса електронної пошти"
                  textChanged={(text) => handleInputChange("email", text)}
                />
                <StylizedInputText
                  placeholderText="Пароль"
                  withShowHideSecure={true}
                  textChanged={(text) => handleInputChange("password", text)}
                />
              </View>
              {!isKeyboardVisible && (
                <View style={styles.action}>
                  <StylizedButton text="Увійти" onPress={handleLogin} />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.redirectText}>Немає акаунту? </Text>
                    <TouchableOpacity onPress={handleRegistrationRedirectLink}>
                      <Text style={styles.registerLink}>Зареєструватися</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    backgroundColor: globalStyles.colors.white,
    width: "100%",
    borderTopStartRadius: globalStyles.sizes.borderRadius.content,
    borderTopEndRadius: globalStyles.sizes.borderRadius.content,
    fontFamily: globalStyles.mainFont.regular,
    paddingTop: globalStyles.sizes.margins.defaultMargin,
  },
  avatarContent: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  content: {
    paddingLeft: globalStyles.sizes.padding,
    paddingRight: globalStyles.sizes.padding,
  },
  title: {
    fontSize: globalStyles.sizes.font.title,
    fontWeight: "medium",
    textAlign: "center",
    fontFamily: globalStyles.mainFont.medium,
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: globalStyles.sizes.padding,
    marginBottom: globalStyles.sizes.margins.marginBottom,
    marginTop: globalStyles.sizes.margins.defaultMargin,
  },
  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: globalStyles.sizes.padding,
  },
  redirectText: {
    fontFamily: globalStyles.mainFont.regular,
    fontSize: globalStyles.sizes.font.regular,
    color: globalStyles.colors.darkBlue,
  },
  registerLink: {
    fontSize: globalStyles.sizes.font.regular,
    color: globalStyles.colors.darkBlue,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
