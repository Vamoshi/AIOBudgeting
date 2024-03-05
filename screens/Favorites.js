import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import IconExtra from '../components/IconExtra';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function Favorites({ navigation }) {

  const [recipes, setRecipes] = useState([])
  const [pairs, setPairs] = useState([])

  const favorites = useSelector(state => state.recipeSearch.favorites)

  const chunkArray = (recipeList, chunkSize = 2) => {

    const chunked = [];
    for (let i = 0; i < recipeList.length; i += chunkSize) {
      chunked.push(recipeList.slice(i, i + chunkSize));
    }
    return chunked;
  };


  useEffect(() => {
    setRecipes(Object.values(favorites))
    recipes.length > 0 && setPairs(chunkArray(recipes))
  }, [favorites])


  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={{ uri: Images.Profile }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>Your Account</Text>
              <Block row space="between">
                <Block row>
                  <Block middle style={styles.pro}>
                    <Text size={14} color="white">#00001</Text>
                  </Block>
                  {/* <Text color="white" size={16} muted style={styles.seller}>Recipe</Text> */}
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    Favorites <IconExtra name="shape-star" family="GalioExtra" size={14} />
                  </Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    {/* <IconExtra name="" family="font-awesome" color={theme.COLORS.MUTED} size={16} /> */}
                    {/* {` `} Los Angeles, CA */}
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={25}>Recipes</Text>
          </Block>
          {
            pairs && pairs.length > 0 && pairs.map((pair, index) => {
              return <Block flex row key={index}>
                {
                  pair.map((recipe, i) =>
                    <RecipeCard
                      key={i}
                      product={{
                        title: recipe.recipe.label,
                        image: recipe.recipe.image,
                        // price: 220,
                      }}
                      style={{ marginRight: theme.SIZES.BASE }}
                    />)
                }
              </Block>
            }
            )
          }
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 1.5,
  },
  profileImage: {
    width: width * 1.0,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2.1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 0,
    marginRight: theme.SIZES.BASE * 12,
    borderRadius: 30,
    height: 19,
    width: 66,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 8.5,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    position: 'absolute',
  },
});
