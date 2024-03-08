import { Dimensions, View, Text, Button, TouchableNativeFeedback, StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "./ScreenNames";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BudgetHomeScreen from "../screens/BudgetHomeScreen";
import AccountsHomeScreen from "../screens/AccountsHomeScreen";
import { Block, Icon } from "galio-framework";
import materialTheme from "../constants/Theme";
import { formatTitle, removeIconOutline } from "../constants/utils";
import Components from "../screens/Components";
import BudgetDetails from "../screens/BudgetDetails";
import AccountsDetails from "../screens/AccountsDetails";
import IconExtra from "../components/IconExtra";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import { TouchableRipple } from "react-native-paper";

const { width } = Dimensions.get("screen");

const BudgetStack = createStackNavigator();

function BudgetStackHomeScreen() {
  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen name={ScreenNames().Stack.BudgetHomeScreen} component={BudgetHomeScreen}
        options={() => ({
          headerTitle: "Budget",
          headerRight: () =>
            <TouchableRipple onPress={() => { }}>
              <IconExtra size={30} name="add-circle-outline" family="ionicon" />
            </TouchableRipple>,
          headerRightContainerStyle: {
            paddingRight: "5%"
          }
        })}
      />
      <BudgetStack.Screen name={ScreenNames().Stack.BudgetDetails} component={BudgetDetails}
        options={() => ({
          headerTitle: "Details",
        })}
      />
    </BudgetStack.Navigator>
  );
}

const AccountsStack = createStackNavigator();

function AccountsStackHomeScreen() {
  return (
    <AccountsStack.Navigator>
      <AccountsStack.Screen name={ScreenNames().Stack.AccountsHomeScreen} component={AccountsHomeScreen}
        options={() => ({
          headerTitle: "Accounts",
          headerRight: () =>
            <Block>
              <TouchableNativeFeedback>
                <IconExtra size={30} name="add-circle-outline" family="ionicon" />
              </TouchableNativeFeedback>
            </Block>,
          headerRightContainerStyle: {
            paddingRight: "5%"
          }
        })}
      />
      <AccountsStack.Screen name={ScreenNames().Stack.AccountsDetails} component={AccountsDetails}
        options={() => ({
          headerTitle: "Details",
        })}
      />
    </AccountsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return ScreenNames().Icons[route.name] &&
            <Icon
              size={23}
              name={focused ? removeIconOutline(ScreenNames().Icons[route.name].icon) : ScreenNames().Icons[route.name].icon}
              family={ScreenNames().Icons[route.name].family}
              color={focused ? materialTheme.COLORS.ACTIVE : materialTheme.COLORS.MUTED}
            />
        },
        headerShown: false,
        tabBarLabel: formatTitle(ScreenNames().Tabs[route.name]),
        tabBarActiveTintColor: materialTheme.COLORS.ACTIVE,
        tabBarInactiveTintColor: materialTheme.COLORS.MUTED,
      })}
    >
      <Tab.Screen name={ScreenNames().Tabs.BudgetTab} component={BudgetStackHomeScreen} />
      <Tab.Screen name={ScreenNames().Tabs.AccountsTab} component={AccountsStackHomeScreen} />
      {/* <Tab.Screen name={ScreenNames().Tabs.ComponentsTab} component={Components} /> */}
    </Tab.Navigator>
  );
}

// Create Screens
// Group Screens to Stack
// Add to Tab.Screen with Stack Function Component as component

const styles = StyleSheet.create({
  ...HomePageStyles
});