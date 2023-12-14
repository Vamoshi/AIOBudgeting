import { Animated, Dimensions, Easing } from "react-native";
// import { Header } from "../components";
import Header from '../components/Header';
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
import RecipeDetails from "../screens/RecipeDetails";
import CustomDropDown from "../components/CustomDropDown"
import { healthLabels } from "../constants/HealthLabels";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: null,
  name: "",
  type: "",
  plan: "",
  rating: "",
};

const RenderScreens = () => {
  const screenKeys = Object.keys(ScreenNames().Stack)
  const screenNames = ScreenNames()

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
      initialRouteName={ScreenNames().Drawer.Home}
      options={{ headerShown: false }}
    >
      {
        screenKeys.map((screenKey, index) => {

          const stackName = screenNames.Stack[screenKey]
          const drawerName = screenNames.Drawer[screenKey]



          return (
            <Drawer.Screen
              name={drawerName}
              options={{
                headerShown: false,
              }}
              key={index}
              component={
                stackName === screenNames.Stack.Home ? HomeStack :
                  stackName === screenNames.Stack.Profile ? ProfileStack :
                    stackName === screenNames.Stack.Settings ? SettingsStack :
                      stackName === screenNames.Stack.Components ? ComponentsStack :
                        stackName === screenNames.Stack.RecipeSearch ? RecipeSearchStack :
                          HomeStack
              }
            />
          )
        })
      }
    </Drawer.Navigator>
  )
}

function ProfileStack(props) {
  const profile = ScreenNames().Stack.Profile

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
  const settings = ScreenNames().Stack.Settings
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
  const components = ScreenNames().Stack.Components

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
  const home = ScreenNames().Stack.Home
  const pro = ScreenNames().Stack.Pro
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

function RecipeSearchStack(props) {

  return (
    <Stack.Navigator
      initialRouteName={ScreenNames().Stack.RecipeSearch}
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name={ScreenNames().Stack.RecipeSearch}
        component={RecipeSearch}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              dropdownTab
              search
              dropdown={() => <CustomDropDown items={healthLabels} placeholder="Select a Health type" />}
              title="Search Recipes"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenNames().Stack.RecipeDetails}
        component={RecipeDetails}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Recipe Details"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
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
      <Stack.Screen name="App" component={RenderScreens} />
    </Stack.Navigator>
  );
}
