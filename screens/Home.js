import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import SummaryCard from '../components/SummaryCard';


const { width } = Dimensions.get('screen');
import products from '../constants/products';
import ScreenNames from '../navigation/ScreenNames';

const Home = () => {
  const renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <SummaryCard
            product={{
              title: 'Recipes Search',
              image: 'https://source.unsplash.com/tb6ulgGY5Zc/840x840',
              price: 220,
            }}
            horizontal
            navigateTo={ScreenNames().Drawer.RecipeSearch}
          />
          <SummaryCard product={products[0]} horizontal />
          {/* <Block flex row>
            <SummaryCard product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <SummaryCard product={products[2]} />
          </Block>
          <SummaryCard product={products[3]} horizontal />
          <SummaryCard product={products[4]} full /> */}
        </Block>
      </ScrollView>
    )
  }

  return (
    <Block flex center style={styles.home}>
      {renderProducts()}
    </Block>
  );
}

export default Home;

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
