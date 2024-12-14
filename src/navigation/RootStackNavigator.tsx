import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "@/src/screens/CommentsScreen";
import CustomHeader from "@/src/components/CustomHeader";
import MapScreen from "@/src/screens/MapScreen";
import TabNavigator from "@/src/navigation/TabNavigator";
import LoginScreen from "@/src/screens/LoginScreen";
import RegistrationScreen from "@/src/screens/RegistrationScreen";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

const Stack = createStackNavigator();

const RootStackNavigator = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  return (
    <Stack.Navigator
      initialRouteName={user ? "home" : "login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="registration" component={RegistrationScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="home" component={TabNavigator} />
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
