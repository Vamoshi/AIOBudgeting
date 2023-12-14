import React from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";

// import { Icon, Drawer as DrawerCustomItem } from '../components/';
import { Images, materialTheme } from "../constants/";
import ScreenNames from "./ScreenNames";

import IconExtra from '../components/IconExtra';
import DrawerItem from '../components/DrawerItem';

function Menu({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const screens = () => {
    return Object.keys(ScreenNames().Drawer).filter(
      (key) => {
        const drawer = ScreenNames().Drawer
        const dontIclude = drawer[key]

        return dontIclude != drawer.Pro &&
          dontIclude != drawer.RecipeDetails &&
          dontIclude != drawer.Components
      }
    )
  };

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(ScreenNames().Drawer.Favorites)}
        >
          <Block style={styles.profile}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <Text h5 color={"white"}>
              {profile.name}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <Block row>
          <Block middle style={styles.pro}>
            <Text size={16} color="white">{"#00001"}
              {profile.plan}
            </Text>
          </Block>
          <Text size={16} muted style={styles.seller}>
            {profile.type}
          </Text>
          <Text size={16} color={materialTheme.COLORS.WARNING}>
            {profile.rating}{""}
            {/* <IconExtra name="shape-star" family="GalioExtra" size={14} /> */}
          </Text>
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {screens().map((screenKey, index) => {
            return (
              <DrawerItem
                screenKey={screenKey}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
      <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}>
        {/* <DrawerCustomItem
          title="Sign In"
          navigation={navigation}
          focused={state.index === 9 ? true : false}
        />
        <DrawerCustomItem
          title="Sign Up"
          navigation={navigation}
          focused={state.index === 9 ? true : false}
        /> */}
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4B1958',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 30,
    height: 22,
    width: 69,
  },
  seller: {
    marginRight: 16,
  }
});

export default Menu;
