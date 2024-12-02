import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostScreen from "./CreatePostScreen";
import GridIcon from "@/assets/icons/GridIcon";
import { globalStyles } from "@/styles/global";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  const navigation = useNavigation();
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      console.log(`TabNavigator focused${e}`);
    });
    return unsubscribe;
  }, [navigation]);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarButton: (props) => {
          return (
            <TouchableOpacity
              {...props}
              style={[props.style, styles.tabButton]}
            />
          );
        },
        tabBarActiveTintColor: globalStyles.colors.white,
        tabBarInactiveTintColor: globalStyles.colors.secondary,
        tabBarActiveBackgroundColor: globalStyles.colors.accent,
        tabBarItemStyle: styles.tabItem,
        tabBarIconStyle: styles.tabIcon,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="posts"
        component={PostsScreen}
        options={{
          headerTitle: "Публікації",
          tabBarIcon: ({ color, size }) => (
            <GridIcon strokeColor={color} size={size} fillColor="transparent" />
          ),
        }}
      />
      <Tab.Screen
        name="create-post"
        component={CreatePostScreen}
        options={{
          headerTitle: "Створити публікацію",
          tabBarIcon: ({ color }) => <PlusIcon strokeColor={color} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon
              strokeColor={color}
              size={size}
              fillColor="transparent"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
  tabBar: {
    paddingTop: 9,
  },
});
