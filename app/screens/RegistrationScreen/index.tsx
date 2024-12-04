import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StylizedInputText from "@/components/ui/StylizedInputText";
import StylizedButton from "@/components/ui/StylizedButton";
import { globalStyles } from "@/styles/global";
import AddRemoveButton from "@/components/ui/AddRemoveButton";
import useKeyboardIsVisible from "@/hooks/useKeyboardIsVisible";
import { RegistrationFormData } from "@/data/types";
import UniversalButton from "@/components/ui/UniversalButton";

const RegistrationScreen = () => {
  const bottomPadding = 45;

  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        image: result.assets[0].uri,
      });
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: "",
    });
  };

  const handleAddRemoveImageClick = () => {
    if (formData.image) {
      handleRemoveImage();
    } else {
      pickImage();
    }
  }

  const handleLoginRedirectLink = () => {
    navigation.navigate("login");
  };

  const [formData, setFormData] = useState<RegistrationFormData>({
    image: "",
    login: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    console.log("Form Data:", formData);
    navigation.navigate("home");
  };

  const handleInputChange = (
    name: keyof RegistrationFormData,
    value: string
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
              {
                formData.image !== "" ? (
                  <Image
                    source={{ uri: formData.image }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <View style={styles.avatarImage} />
                )
              }
              <AddRemoveButton
                hasContent={formData.image !== ""}
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
                  textChanged={(text) => handleInputChange("login", text)}
                />
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
                  <StylizedButton
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
    paddingTop: 92,
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
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: globalStyles.sizes.borderRadius.avatar,
    backgroundColor: globalStyles.colors.lightGray,
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
  alreadyHaveAccount: {
    color: globalStyles.colors.darkBlue,
  },
});

export default RegistrationScreen;
