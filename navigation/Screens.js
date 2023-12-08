import { Animated, Dimensions, Easing } from "react-native";
import { Header, Icon } from "../components";
import { Images, materialTheme } from "../constants/";

import ComponentsScreen from "../screens/Components";
import Menu from "./Menu";
import HomeScreen from "../screens/Home";
import ProScreen from "../screens/Pro";
import ProfileScreen from "../screens/Profile";
import React from "react";
import SettingsScreen from "../screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "./ScreenNames";
import RecipeSearch from "../screens/RecipeSearch";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Seller",
  plan: "Pro",
  rating: 4.8,
};

function ProfileStack(props) {
  const profile = ScreenNames.Stack.Profile

  return (
    <Stack.Navigator
      initialRouteName={profile}
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name={profile}
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title={profile}
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  const settings = ScreenNames.Stack.Settings
  return (
    <Stack.Navigator
      initialRouteName={settings}
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name={settings}
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title={settings} scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  const components = ScreenNames.Stack.Components
  return (
    <Stack.Navigator
      initialRouteName={components}
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name={components}
        component={ComponentsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title={components} scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  const home = ScreenNames.Stack.Home
  const pro = ScreenNames.Stack.Pro
  return (
    <Stack.Navigator
      initialRouteName={home}
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name={home}
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title={home}
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
      <Stack.Screen
        name={pro}
        component={ProScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SearchStack(props) {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Stack.RecipeSearch}
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name={ScreenNames.Stack.RecipeSearch}
        component={RecipeSearch}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              title="Search Recipes"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerGroup() {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => (
        <Menu {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          justifyContent: "center",
          alignContent: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal",
        },
      }}
      initialRouteName={ScreenNames.Drawer.Home}
      options={{ headerShown: false }}
    >
      <Drawer.Screen
        name={ScreenNames.Drawer.Home}
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreenNames.Drawer.Profile}
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreenNames.Drawer.Settings}
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreenNames.Drawer.Components}
        component={ComponentsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="toggle-outline"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={ScreenNames.Drawer.Pro}
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={ScreenNames.Drawer.RecipeSearch}
        component={SearchStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function ScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen name="App" component={DrawerGroup} />
    </Stack.Navigator>
  );
}
