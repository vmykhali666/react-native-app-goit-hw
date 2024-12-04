import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostScreen from "./CreatePostScreen";
import GridIcon from "@/assets/icons/GridIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomTabBar, { RouteBehavior } from "@/components/CustomTabBar";
import CustomHeader from "@/components/CustomHeader";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="posts"
      tabBar={(props) => (
        <CustomTabBar
          {...props}
          routeOptions={[
            { routeName: "posts", behavior: RouteBehavior.Fixed },
            { routeName: "create-post", behavior: RouteBehavior.Swappable },
            { routeName: "profile", behavior: RouteBehavior.Swappable },
          ]}
          hiddenScreens={["create-post"]}
        />
      )}
    >
      <Tab.Screen
        name="posts"
        component={PostsScreen}
        options={{
          headerTitle: "Публікації",
          header: (props) => (
            <CustomHeader
              {...props}
              showLogOutButton={true}
            />
          ),
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
          header: (props) => <CustomHeader {...props} showBackButton={true} />,
          tabBarStyle: { display: "none" },
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
