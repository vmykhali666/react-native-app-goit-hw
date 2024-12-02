import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostScreen from "./CreatePostScreen";
import GridIcon from "@/assets/icons/GridIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomTabBar from "@/components/CustomTabBar";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{}}
      tabBar={(props) => <CustomTabBar {...props} />}
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
