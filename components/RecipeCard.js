import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('screen');

const RecipeCard = ({ product, horizontal, full, style, priceColor, imageStyle, navigateTo, navigationProps }) => {

  const { navigate } = useNavigation()

  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];

  return (
    <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
      <TouchableWithoutFeedback onPress={() => {
        navigateTo && navigate(navigateTo, { navigationProps })
      }}>
        <Block flex style={[styles.imageContainer, styles.shadow]}>
          <Image source={{ uri: product.image }} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        navigateTo && navigate(navigateTo, { navigationProps })
      }}>
        <Block flex space="between" style={styles.productDescription}>
          <Text size={20} style={styles.productTitle}>{product.title}</Text>
          <Text size={12} muted={true}>
            {
              navigationProps &&
              navigationProps.recipe &&
              `${navigationProps.recipe.source}` ||
              ""
            }
          </Text>
          <Text size={12} muted={!priceColor} color={priceColor}>
            {
              navigationProps &&
              navigationProps.recipe.calories &&
              `${navigationProps.recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(2)} ${navigationProps.recipe.totalNutrients.ENERC_KCAL.unit.toUpperCase()}` ||
              ""
            }
          </Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block >
  );
};


export default RecipeCard;

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});