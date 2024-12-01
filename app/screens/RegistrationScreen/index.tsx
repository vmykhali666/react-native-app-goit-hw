import React from "react";
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
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StylizedInputText from "@/components/ui/StylizedInputText";
import StylizedButton from "@/components/ui/StylizedButton";
import { globalStyles } from "@/styles/global";
import AddRemoveButton from "@/components/ui/AddRemoveButton";

const RegistrationScreen = () => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const handleLoginRedirectLink = () => {
    navigation.navigate("login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <StatusBar style="auto" />
        <ImageBackground
          source={require("@/assets/images/mountains-bg.jpg")}
          style={styles.backgroundImage}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View
            style={[styles.container, { paddingBottom: insets.bottom + 45 }]}
          >
            <View style={styles.avatarContent}>
              <Image
                style={styles.avatarImage}
                source={require("@/assets/images/avatar.jpg")}
              />
              <AddRemoveButton hasContent={true} onPress={() => {}} />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.inputs}>
                <StylizedInputText placeholderText="Логін" />
                <StylizedInputText placeholderText="Адреса електронної пошти" />
                <StylizedInputText
                  placeholderText="Пароль"
                  withShowHideSecure={true}
                />
              </View>
              <View style={styles.action}>
                <StylizedButton text="Зареєструватися" onPress={() => {}} />
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={styles.alreadyHaveAccount}
                    onPress={handleLoginRedirectLink}
                  >
                    Вже є акаунт? Увійти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
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
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
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
    paddingLeft: 16,
    paddingRight: 16,
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "medium",
    textAlign: "center",
    fontFamily: globalStyles.mainFont.medium,
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 16,
    marginBottom: 43,
    marginTop: 32,
  },
  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  alreadyHaveAccount: {
    color: globalStyles.colors.darkBlue,
  },
});

export default RegistrationScreen;
