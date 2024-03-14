import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "./ScreenNames";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BudgetHomeScreen from "../screens/BudgetHomeScreen";
import AccountsHomeScreen from "../screens/AccountsHomeScreen";
import { Icon } from "galio-framework";
import materialTheme from "../constants/Theme";
import { formatTitle, removeIconOutline } from "../constants/utils";
import Components from "../screens/Components";
import BudgetDetails from "../screens/BudgetDetails";
import AccountsDetails from "../screens/AccountsDetails";
import IconExtra from "../components/IconExtra";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import { TouchableRipple } from "react-native-paper";
import CustomModal from "../components/CustomModal";
import EditableSummaryCard from "../components/EditableSummaryCard";

const BudgetStack = createStackNavigator();

const RenderHeaderRight = ({ budgetStyle }) => {
  const [budgetPopup, setBudgetPopup] = useState(false);
  const [accountPopup, setAccountPopup] = useState(false);

  const [categoryNameField, setCategoryNameField] = useState("")
  const [budgetField, setBudgetField] = useState("")
  const [lastNameField, setLastNameField] = useState("")
  const [firstNameField, setFirstNameField] = useState("")
  const [cardNumberField, setCardNumberField] = useState("")

  return <TouchableRipple onPress={() => { budgetStyle ? setBudgetPopup(true) : setAccountPopup(true) }}>
    <>
      <IconExtra size={30} name="add-circle-outline" family="ionicon" />
      <CustomModal
        visible={budgetStyle ? budgetPopup : accountPopup}
        setVisibility={budgetStyle ? setBudgetPopup : setAccountPopup}
        component={
          <EditableSummaryCard
            full
            budgetStyle={budgetStyle}
            stateFunctions={budgetStyle ? { setCategoryNameField, setBudgetField } : { setLastNameField, setFirstNameField, setCardNumberField }}
          />
        }
        disableConfirm={budgetStyle ? !categoryNameField && !budgetField : !lastNameField && !firstNameField && !cardNumberField}
      />
    </>
  </TouchableRipple>
}

function BudgetStackHomeScreen() {
  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen name={ScreenNames().Stack.BudgetHomeScreen} component={BudgetHomeScreen}
        options={() => ({
          headerTitle: "Budget",
          headerRight: () => <RenderHeaderRight budgetStyle />,
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
          headerRight: () => <RenderHeaderRight />,
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
      <Tab.Screen name={ScreenNames().Tabs.ComponentsTab} component={Components} />
    </Tab.Navigator>
  );
}

// Create Screens
// Group Screens to Stack
// Add to Tab.Screen with Stack Function Component as component

const styles = StyleSheet.create({
  ...HomePageStyles
});