import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image, TouchableHighlight, TouchableNativeFeedback, View, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import ScreenNames from '../navigation/ScreenNames';
import { accountData } from '../constants';
import IconExtra from './IconExtra';


const { width } = Dimensions.get('screen');

const CardCard = ({ accountData, horizontal, full, style, priceColor, imageStyle, navigateTo, navigationProps }) => {

  const { navigate } = useNavigation()

  const imageStyles = [
    styles.image,
    imageStyle,
  ];

  const goToBank = () => {
    Linking.openURL(accountData.link);
  }

  return (
    <Block row={horizontal} card flex style={[styles.cardCard, styles.shadow, style]}>
      <Block style={[styles.bankDetailsContainer,]}>
        <TouchableNativeFeedback onPress={accountData && accountData.link && goToBank}>
          <View style={[styles.cardBorder]}>
            <View style={[styles.imageContainer, styles.shadow]}>
              <Image source={{ uri: accountData && accountData.image }} style={imageStyles} resizeMode='cover' />
            </View>
            <View style={styles.bankNameContainer}>
              <Text muted={true} style={[styles.bankText]}><IconExtra name="open-outline" family="ionicon" /> Bank</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Block>

      <TouchableNativeFeedback onPress={() => {
        navigate(navigateTo, navigationProps)
      }}>
        <Block flex space="around" style={styles.cardDesc}>
          <View style={[]}>
            <View style={styles.topLabel}>
              <Text size={12}>{accountData && accountData.firstName} {accountData && accountData.lastName}</Text>
              <Text size={10} style={[styles.cardType,]}>{accountData && accountData.type}</Text>
            </View>
            <Text size={12}>{accountData && accountData.number}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text size={12} style={styles.outflow}>$1,000</Text>
            <Text size={12} style={styles.inflow}>$1,000</Text>
          </View>
        </Block>
      </TouchableNativeFeedback>
    </Block >
  );
};

export default CardCard;

const styles = StyleSheet.create({
  cardType: {
    // borderWidth: 1,
    // borderColor: "red",
    textTransform: 'capitalize',
    color: Theme.COLORS.MUTED
  },
  topLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: "5%",
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: "15%",
    marginBottom: '-5%',
    // paddingTop: "5%"
    // paddingLeft: "40%",

    borderTopWidth: 1,
    borderColor: Theme.COLORS.DEFAULT,
  },
  outflow: {
    color: Theme.COLORS.ERROR,
    marginTop: "4%",
    paddingRight: "14%",
    borderRightWidth: 1,
    borderColor: Theme.COLORS.DEFAULT,
  },
  inflow: {
    color: Theme.COLORS.SUCCESS,
    marginTop: "4%",
    // borderWidth: 1,
    // borderColor: "red",
  },
  cardCard: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE * 0.8,
    minHeight: 114,

    // borderWidth: 1,
    // borderColor: "red",
  },
  cardDesc: {
    padding: theme.SIZES.BASE / 2,
    marginHorizontal: theme.SIZES.BASE / 2,
    //   borderWidth: 1,
    //   borderColor: "red",
  },
  cardBorder: {
    borderRightColor: Theme.COLORS.DEFAULT,
    borderRightWidth: 0.5,
    // borderColor: "red",
    height: "100%",
  },
  // imageContainer: {
  //   elevation: 1,
  //   borderWidth: 1,
  //   borderColor: "red",
  // },
  imageContainer: {
    borderRadius: 10,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE / 2,
    aspectRatio: 15 / 10,
    marginTop: "-10%",
    paddingBottom: "1.5%",
    paddingLeft: "2%",
    height: "85%",
    width: 'auto',
  },
  image: {
    borderRadius: 10,
    height: "100%",
    width: "auto",
    // borderWidth: 1,
    // borderColor: "red",
  },
  bankDetailsContainer: {
    elevation: 1,
    position: "relative",
    // borderWidth: 1,
    // borderColor: "red",
  },
  bankNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bankText: {
    color: Theme.COLORS.PRIMARY,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  test: {
    borderWidth: 1,
    borderColor: "red",
  },
});