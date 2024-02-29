import { Animated, Dimensions, Easing, View, Text, Button } from "react-native";
// import { Header } from "../components";
import Header from '../components/Header';
import { Images, materialTheme } from "../constants/";

import ComponentsScreen from "../screens/Components";
import Menu from "./Menu";
// import HomeScreen from "../screens/Home";
import ProScreen from "../screens/Pro";
import ProfileScreen from "../screens/Profile";
import React, { useEffect, useRef } from "react";
// import SettingsScreen from "../screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "./ScreenNames";
import RecipeSearch from "../screens/RecipeSearch";
import RecipeDetails from "../screens/RecipeDetails";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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

function BudgetDetails() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function AccountsDetails() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function BudgetHomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate(ScreenNames().Stack.BudgetDetails)}
      />
    </View>
  );
}

function AccountsHomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accounts Screen</Text>
      <Button
        title="Go to Account Details"
        onPress={() => navigation.navigate(ScreenNames().Stack.AccountsDetails)}
      />
    </View>
  );
}

const BudgetStack = createStackNavigator();

function BudgetStackHomeScreen() {
  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen name={ScreenNames().Stack.BudgetHomeScreen} component={BudgetHomeScreen} />
      <BudgetStack.Screen name={ScreenNames().Stack.BudgetDetails} component={BudgetDetails} />
    </BudgetStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const AccountsStack = createStackNavigator();

  function AccountsStackHomeScreen() {
    return (
      <AccountsStack.Navigator>
        <AccountsStack.Screen name={ScreenNames().Stack.AccountsHomeScreen} component={AccountsHomeScreen} />
        <AccountsStack.Screen name={ScreenNames().Stack.AccountsDetails} component={AccountsDetails} />
      </AccountsStack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="BudgetTab" component={BudgetStackHomeScreen} />
      <Tab.Screen name="AccountsTab" component={AccountsStackHomeScreen} />
    </Tab.Navigator>
  );
}

// Create Screens
// Group Screens to Stack
// Add to Tab.Screen with Stack Function Component as component