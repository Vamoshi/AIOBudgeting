import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import RecipeCard from '../components/RecipeCard';

const { width } = Dimensions.get('screen');
import ScreenNames from '../navigation/ScreenNames';
import { useSelector } from 'react-redux';

const RecipeSearch = () => {

  const searchResults = useSelector(state => state.recipeSearch)

  const renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          {
            searchResults.loading ? <Text>Loading...</Text> :
              !searchResults.loading && searchResults.error ? <Text>Error: {searchResults.error}</Text> :
                !searchResults.loading && searchResults.recipes.length === 0 ? <Text>No Results Found</Text> :
                  !searchResults.loading && searchResults.recipes
                    ? searchResults.recipes.map((recipe, index) => {
                      return <RecipeCard
                        product={{
                          title: recipe.recipe.label,
                          image: recipe.recipe.image,
                          price: 180,
                          horizontal: true,
                        }}
                        key={index}
                        horizontal
                        navigateToStack={ScreenNames().Stack.RecipeDetails}
                      />
                    }) : <></>
          }
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

export default RecipeSearch;

const styles = StyleSheet.create({
  centeredText: {

  },
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
