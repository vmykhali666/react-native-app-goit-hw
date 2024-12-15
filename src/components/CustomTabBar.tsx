import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/global";

export enum RouteBehavior {
  Swappable = "swappable",
  Fixed = "fixed",
}

interface CustomTabBarProps extends BottomTabBarProps {
  routeOptions?: {
    routeName: string;
    behavior: RouteBehavior;
  }[];
  hiddenScreens?: string[];
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  routeOptions = [],
  hiddenScreens = [],
}) => {

  const insets = useSafeAreaInsets();

  const focusedRoute = state.routes[state.index];

  if (hiddenScreens.includes(focusedRoute.name)) {
    return null;
  }

  const focusedRouteOption = routeOptions.find(
    (option) => option.routeName === focusedRoute.name
  );

  let routes = [...state.routes];
  if (
    focusedRouteOption &&
    focusedRouteOption.behavior === RouteBehavior.Swappable
  ) {
    const middleRouteIndex = Math.floor(routes.length / 2);
    routes = routes.filter((route) => route.name !== focusedRoute.name);
    routes.splice(middleRouteIndex, 0, focusedRoute);
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 34 }]}>
      {routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const middleRouteIndex = Math.floor(routes.length / 2);

        const isMiddleRoute = index === middleRouteIndex;

        const isFocused =
          state.index === state.routes.findIndex((r) => r.key === route.key);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, isMiddleRoute && styles.focused]}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isMiddleRoute
                  ? globalStyles.colors.white
                  : globalStyles.colors.secondary,
                size: 24,
              })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: globalStyles.colors.strokeGray,
    justifyContent: "center",
    paddingTop: 9,
    backgroundColor: globalStyles.colors.white,
    gap: 31,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  focused: {
    backgroundColor: globalStyles.colors.accent,
    width: 70,
  },
});

export default CustomTabBar;
