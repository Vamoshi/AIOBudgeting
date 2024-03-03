import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image, TouchableHighlight, TouchableNativeFeedback, View, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import ScreenNames from '../navigation/ScreenNames';
import { accountData } from '../constants';
import IconExtra from './IconExtra';
import { ProgressBar } from 'react-native-paper';


const { width } = Dimensions.get('screen');

const SummaryCard = ({ accountData, horizontal, style, imageStyle, navigateTo, navigationProps, budgetStyle }) => {

  const { navigate } = useNavigation()

  const imageStyles = [
    styles.image,
    imageStyle,
  ];

  const imageClickHandler = () => {
    !budgetStyle && accountData && accountData.link && Linking.openURL(accountData.link);
  }

  return (
    <Block row={horizontal} card flex style={[styles.SummaryCard, styles.shadow, style]}>
      <Block style={[styles.bankDetailsContainer,]}>
        <TouchableNativeFeedback onPress={imageClickHandler}>
          <View style={[styles.cardBorder]}>
            <View style={[budgetStyle ? styles.imageContainerBudget : styles.imageContainer, styles.shadow]}>
              <Image source={{ uri: accountData && accountData.image }} style={imageStyles} resizeMode='cover' />
            </View>
            {
              !budgetStyle &&
              <View style={styles.bankNameContainer}>
                <Text muted={true} style={[styles.bankText]}><IconExtra name="open-outline" family="ionicon" />{accountData.bank}</Text>
              </View>
            }
          </View>
        </TouchableNativeFeedback>
      </Block>

      <TouchableNativeFeedback onPress={() => {
        navigate(navigateTo, navigationProps)
      }}>
        <Block flex space={budgetStyle ? "evenly" : "around"} style={styles.cardDesc}>
          {
            !budgetStyle ?
              <View>
                <View style={styles.topLabel}>
                  <Text size={12}>{accountData && accountData.firstName} {accountData && accountData.lastName}</Text>
                  <Text size={10} style={[styles.cardType,]}>{accountData && accountData.type}</Text>
                </View>
                <Text size={12}>{accountData && accountData.number}</Text>
              </View>
              :
              <View>
                <View style={styles.topLabel}>
                  <Text size={17}>Food</Text>
                </View>
              </View>
          }
          {budgetStyle && <ProgressBar style={styles.progressBar} progress={200 / 500} color={Theme.COLORS.ERROR} />}
          <View style={styles.priceContainer}>
            <Text size={12} color={Theme.COLORS.ERROR} style={[styles.numberStyle, styles.numberBorder]}>$200</Text>
            <Text size={12} color={Theme.COLORS.SUCCESS} style={[styles.numberStyle, budgetStyle && styles.numberBorder]}>$300</Text>
            {budgetStyle && <Text size={12} color={Theme.COLORS.MUTED} style={[styles.numberStyle]}>$500</Text>}
          </View>
        </Block>
      </TouchableNativeFeedback>
    </Block >
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: Theme.COLORS.SUCCESS,
  },
  cardType: {
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
    marginBottom: '-5%',
    borderTopWidth: 1,
    borderColor: Theme.COLORS.DEFAULT,
  },
  numberBorder: {
    borderRightWidth: 1,
    borderColor: Theme.COLORS.DEFAULT,
  },
  numberStyle: {
    flex: 1,
    marginTop: "4%",
    textAlign: "center"
  },
  SummaryCard: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE * 0.8,
    minHeight: 114,
  },
  cardDesc: {
    padding: theme.SIZES.BASE / 2,
    marginHorizontal: theme.SIZES.BASE / 2,
  },
  cardBorder: {
    borderRightColor: Theme.COLORS.DEFAULT,
    borderRightWidth: 0.5,
    height: "100%",
  },
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
  imageContainerBudget: {
    borderRadius: 10,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE / 2,
    aspectRatio: 15 / 10,
    height: "85%",
    width: 'auto',
  },
  image: {
    borderRadius: 10,
    height: "100%",
    width: "auto",
  },
  bankDetailsContainer: {
    elevation: 1,
    position: "relative",
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