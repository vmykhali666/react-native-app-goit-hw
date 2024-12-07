import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import RegistrationScreen from "./screens/RegistrationScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import TabNavigator from "@/navigation/TabNavigator";
import MapScreen from "./screens/MapScreen";
import CommentsScreen from "./screens/CommentsScreen";
import CustomHeader from "@/components/CustomHeader";

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
        <Stack.Screen
          name="map"
          component={MapScreen}
          options={{
            headerShown: true,
            title: "Мапа",
            header: (props) => (
              <CustomHeader {...props} showBackButton={true} />
            ),
          }}
        />
        <Stack.Screen
          name="comments"
          component={CommentsScreen}
          options={{
            headerShown: true,
            title: "Коментарі",
            header: (props) => (
              <CustomHeader {...props} showBackButton={true} />
            ),
          }}
        />
        <Stack.Screen name="home" component={TabNavigator} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default AppLayout;
