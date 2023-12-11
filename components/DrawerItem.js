import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./IconExtra";
import materialTheme from "../constants/Theme";
import ScreenNames from "../navigation/ScreenNames";
import { formatTitle } from "../constants/utils";

const proScreens = [
  "Woman",
  "Man",
  "Kids",
  "New Collection",
  "Sign In",
  "Sign Up"
];

const DrawerItem = ({ screenKey, focused, navigation }) => {

  const renderIcon = () => {
    return ScreenNames().Icons[screenKey] &&
      <Icon
        size={16}
        name={ScreenNames().Icons[screenKey].icon}
        family={ScreenNames().Icons[screenKey].family}
        color={focused ? "white" : materialTheme.COLORS.MUTED}
      />
  }

  // const renderIcon = () => {
  //   switch (ScreenNames().Drawer[screenKey]) {
  //     case ScreenNames().Drawer.Home:
  //       return (
  //         <Icon
  //           size={16}
  //           name="shop"
  //           family="GalioExtra"
  //           color={focused ? "white" : materialTheme.COLORS.MUTED}
  //         />
  //       );
  //     case ScreenNames().Drawer.Profile:
  //       return (
  //         <Icon
  //           size={16}
  //           name="circle-10"
  //           family="GalioExtra"
  //           color={focused ? "white" : materialTheme.COLORS.MUTED}
  //         />
  //       );
  //     case ScreenNames().Drawer.Settings:
  //       return (
  //         <Icon
  //           size={16}
  //           name="gears"
  //           family="font-awesome"
  //           color={focused ? "white" : materialTheme.COLORS.MUTED}
  //         />
  //       );
  //     case ScreenNames().Drawer.Components:
  //       return (
  //         <Icon
  //           size={16}
  //           name="toggle-outline"
  //           family="ionicon"
  //           color={focused ? "white" : materialTheme.COLORS.MUTED}
  //         />
  //       );
  //     case ScreenNames().Drawer.RecipeSearch:
  //       return (
  //         <Icon
  //           size={16}
  //           name="search-outline"
  //           family="ionicon"
  //           color={focused ? "white" : materialTheme.COLORS.MUTED}
  //         />)
  //     // case "Sign In":
  //     //   return (
  //     //     <Icon
  //     //       size={16}
  //     //       name="ios-log-in"
  //     //       family="ionicon"
  //     //       color={focused ? "white" : materialTheme.COLORS.MUTED}
  //     //     />
  //     //   );
  //     // case "Sign Up":
  //     //   return (
  //     //     <Icon
  //     //       size={16}
  //     //       name="md-person-add"
  //     //       family="ionicon"
  //     //       color={focused ? "white" : materialTheme.COLORS.MUTED}
  //     //     />
  //     //   );
  //     default:
  //       return null;
  //   }
  // };

  const renderLabel = () => {
    if (proScreens.includes(screenKey)) {
      return (
        <Block middle style={styles.pro}>
          <Text size={12} color="white">
            PRO
          </Text>
        </Block>
      );
    }

    return null;
  };

  const proScreen = proScreens.includes(screenKey);

  return (
    <TouchableOpacity style={{ height: 55 }} onPress={() => { navigation.navigate(ScreenNames().Drawer[screenKey]) }}>
      <Block
        flex
        row
        style={[
          styles.defaultStyle,
          focused ? [styles.activeStyle, styles.shadow] : null
        ]}
      >
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            size={18}
            color={
              focused
                ? "white"
                : proScreen
                  ? materialTheme.COLORS.MUTED
                  : "black"
            }
          >
            {ScreenNames().Drawer[screenKey] === ScreenNames().Drawer.RecipeSearch ? "Search Recipes" : formatTitle(ScreenNames().Drawer[screenKey])}
          </Text>
          {renderLabel()}
        </Block>
      </Block>
    </TouchableOpacity>
  );
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36
  }
});
