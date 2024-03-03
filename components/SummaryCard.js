import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableNativeFeedback, View, Linking, Modal } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import IconExtra from './IconExtra';
import { ProgressBar } from 'react-native-paper';
import { materialTheme } from '../constants';



const SummaryCard = ({ accountData, horizontal, style, imageStyle, navigateTo, navigationProps, budgetStyle }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const { navigate } = useNavigation()

  const imageStyles = [
    styles.image,
    imageStyle,
  ];


  const hidePopup = () => {
    setPopupVisible(false);
  };

  // const imageClickHandler = () => {
  //   !budgetStyle && accountData && accountData.link && Linking.openURL(accountData.link);
  // }

  const imageClickHandler = () => {
    !budgetStyle ? setPopupVisible(true) : handleNavigation();
  };

  const handleNavigation = () => {
    navigateTo && navigate(navigateTo, navigationProps)
  }

  const handleConfirm = () => {
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
                <Text muted={true} style={[styles.bankText]}><IconExtra name="open-outline" family="ionicon" />{accountData && accountData.bank}</Text>
              </View>
            }
          </View>
        </TouchableNativeFeedback>
      </Block>

      <TouchableNativeFeedback onPress={handleNavigation}>
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

      {/* Popup component */}
      <Modal
        visible={isPopupVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={hidePopup}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            <Text p style={{ marginBottom: theme.SIZES.BASE * 1.5, textAlign: "center" }}>Do you want to exit and open the {accountData && accountData.bank} app?</Text>
            <Block row space="evenly">
              <Block flex>
                <Button
                  color={materialTheme.COLORS.MUTED}
                  textStyle={styles.optionsText}
                  style={[styles.optionsButton, styles.shadow]}
                  onPress={hidePopup}
                >
                  No
                </Button>
              </Block>
              <Block flex={1}>
                <Button
                  center
                  shadowless
                  color={materialTheme.COLORS.INFO}
                  textStyle={styles.optionsText}
                  style={[styles.optionsButton, styles.shadow]}
                  onPress={handleConfirm}
                >
                  Yes
                </Button>
              </Block>
            </Block>
          </View>
        </View>
      </Modal>
    </Block >
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.8,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: "10%",
  },
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