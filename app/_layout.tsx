import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import RegistrationScreen from "./screens/RegistrationScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [fontsloaded] = useFonts({
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Light": require("@/assets/fonts/Roboto-Light.ttf"),
  });

  useEffect(() => {
    if (fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded]);

  if (!fontsloaded) {
    return (
      <SafeAreaProvider>
        <ActivityIndicator />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="registration" component={RegistrationScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default AppLayout;
