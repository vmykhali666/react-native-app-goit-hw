import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
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
import AddRemoveButton from "@/src/components/ui/AddRemoveButton";
import useKeyboardIsVisible from "@/hooks/useKeyboardIsVisible";
import { registrationDB } from "@/src/utils/auth";
import { useDispatch } from "react-redux";
import { pickImage } from "@/src/utils/imagePicker";
import { setUserInfo } from "@/src/redux/reducers/userSlice";
import styles from "@/src/screens/RegistrationScreen/styles";

const RegistrationScreen = () => {
  const bottomPadding = 45;

  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleRemoveImage = () => {
    setImage("");
  };

  const handleAddRemoveImageClick = async () => {
    if (image) {
      handleRemoveImage();
    } else {
      const picked = await pickImage();
      if (picked) {
        setImage(picked);
      }
    }
  };

  const handleLoginRedirectLink = () => {
    navigation.navigate("login");
  };

  const handleRegister = async () => {
    setIsButtonDisabled(true);
    registrationDB({
      email,
      password,
      name,
      image,
    })
      .then((user) => dispatch(setUserInfo(user)))
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (email && password && name && image) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, name, image]);

  const isKeyboardVisible = useKeyboardIsVisible();

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
            <View style={styles.avatarContent}>
              {image !== "" ? (
                <Image source={{ uri: image }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarImage} />
              )}
              <AddRemoveButton
                hasContent={image !== ""}
                onPress={handleAddRemoveImageClick}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>Реєстрація</Text>
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
                  placeholderText="Логін"
                  textChanged={(text) => setName(text)}
                />
                <StylizedInputText
                  placeholderText="Адреса електронної пошти"
                  textChanged={(text) => setEmail(text)}
                />
                <StylizedInputText
                  placeholderText="Пароль"
                  withShowHideSecure={true}
                  textChanged={(text) => setPassword(text)}
                />
              </View>
              {!isKeyboardVisible && (
                <View style={styles.action}>
                  <StylizedButton
                    disabled={isButtonDisabled}
                    text="Зареєструватися"
                    onPress={handleRegister}
                  />
                  <TouchableOpacity>
                    <Text
                      style={styles.alreadyHaveAccount}
                      onPress={handleLoginRedirectLink}
                    >
                      Вже є акаунт? Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegistrationScreen;
