import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StylizedInputText from "@/src/components/ui/StylizedInputText";
import StylizedButton from "@/src/components/ui/StylizedButton";
import { globalStyles } from "@/styles/global";
import useKeyboardIsVisible from "@/hooks/useKeyboardIsVisible";
import { loginDB } from "@/src/utils/auth";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/src/redux/reducers/userSlice";
import styles from "@/src/screens/LoginScreen/styles";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const bottomPadding = 111;

  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleRegistrationRedirectLink = () => {
    navigation.navigate("registration");
  };

  const isKeyboardVisible = useKeyboardIsVisible();

  const handleLogin = async () => {
    setIsButtonDisabled(true);
    loginDB({
      email,
      password,
    })
      .then((user) => dispatch(setUserInfo(user)))
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

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
                  textChanged={setEmail}
                />
                <StylizedInputText
                  placeholderText="Пароль"
                  withShowHideSecure={true}
                  textChanged={setPassword}
                />
              </View>
              {!isKeyboardVisible && (
                <View style={styles.action}>
                  <StylizedButton
                    disabled={isButtonDisabled}
                    text="Увійти"
                    onPress={handleLogin}
                  />
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

export default LoginScreen;
