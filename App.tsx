import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import store from "@/src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { authStateChanged } from "@/src/utils/auth";

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
    <Provider store={store.store}>
      <PersistGate
        loading={<ActivityIndicator />}
        persistor={store.persistor}
      >
        <SafeAreaProvider>
            <AuthListener />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

const AuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        authStateChanged(dispatch);
    }, [dispatch]);

    return (
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    )
}

export default AppLayout;
