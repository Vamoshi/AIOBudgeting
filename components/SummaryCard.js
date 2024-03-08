import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableNativeFeedback, View, Linking, Modal } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import IconExtra from './IconExtra';
import { ProgressBar, TouchableRipple } from 'react-native-paper';
import { categories, materialTheme } from '../constants';


// Needs (categoryData || cardData) && accountData & summary, 
const SummaryCard = ({ categoryData, cardData, summary, imageStyle, navigateTo, navigationProps, budgetStyle }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const { navigate } = useNavigation()

  const handleNavigation = () => {
    navigateTo && navigate(navigateTo, { navigationProps })
  }

  const handleConfirm = () => {
    !budgetStyle && cardData && cardData.link && Linking.openURL(cardData.link);
  }
  const hidePopup = () => {
    setPopupVisible(false);
  };
  const imageClickHandler = () => {
    !budgetStyle ? setPopupVisible(true) : handleNavigation();
  };

  const imageStyles = [
    styles.image,
    imageStyle,
    budgetStyle && styles.whiteBG
  ];

  const editBudgetCard = () => {
    console.log('====================================');
    console.log(categoryData);
    console.log('====================================');
  }

  const editAccountCard = () => {
    console.log('====================================');
    console.log(cardData);
    console.log('====================================');
  }

  // useEffect(() => {
  //   console.log('====================================');
  //   console.log(categoryData);
  //   console.log('====================================');
  // }, [categoryData])

  return (
    <Block row={true} card flex style={[styles.SummaryCard, styles.shadow, budgetStyle && {
      marginVertical: theme.SIZES.BASE * 0.5,
    }]}>
      {
        !budgetStyle && cardData || budgetStyle && categoryData ?
          <>
            {/* <Block style={[styles.bankDetailsContainer,]}> */}
            <TouchableNativeFeedback onPress={cardData && cardData.link ? imageClickHandler : handleNavigation}>
              <View style={[styles.cardBorder]}>
                <View style={[
                  budgetStyle ? styles.imageContainerBudget : styles.imageContainer,
                  styles.shadow,
                  !budgetStyle && cardData && cardData.link && styles.imageOffset,
                ]}>
                  <Image source={{ uri: budgetStyle ? categoryData.image : cardData.image }} style={imageStyles} resizeMode='contain' />
                </View>
                {
                  !budgetStyle && cardData && cardData.link &&
                  <View style={styles.bankNameContainer}>
                    <Text muted={true} style={[styles.bankText]}><IconExtra name="open-outline" family="ionicon" />{cardData.bank}</Text>
                  </View>
                }
              </View>
            </TouchableNativeFeedback>
            {/* </Block> */}
            {
              budgetStyle && !categoryData.category.toLowerCase().includes("summary") &&
              <TouchableRipple style={[styles.budgetSettingsIcon]} onPress={editBudgetCard}>
                <IconExtra name="ellipsis-horizontal-outline" family="ionicon" />
              </TouchableRipple>
            }
            <TouchableNativeFeedback onPress={handleNavigation}>
              <Block flex space={budgetStyle ? "evenly" : "around"} style={styles.cardDesc}>
                {
                  !budgetStyle ?
                    <View>
                      {/* Name & settings */}
                      <View style={styles.topLabel}>
                        <Text size={12}>{cardData.firstName} {cardData.lastName}</Text>
                        {
                          !budgetStyle && !cardData.accountType.toLowerCase().includes("summary") && <TouchableRipple style={[styles.accountSettingsIcon]} onPress={editAccountCard}>
                            <IconExtra name="ellipsis-horizontal-outline" family="ionicon" />
                          </TouchableRipple>
                        }
                        {cardData.accountType.toLowerCase().includes("summary") && <Text size={10} style={[styles.accountType]}>{cardData.accountType}</Text>}
                      </View>
                      {/*  cardnumber && Debit/credit */}
                      <View style={styles.topLabel}>
                        <Text size={12}>{cardData.number.slice(-9)}</Text>
                        {!cardData.accountType.toLowerCase().includes("summary") && <Text size={10} style={[styles.accountType]}>{cardData.accountType}</Text>}
                      </View>
                      {/* mastercard/visa */}
                      <View style={[styles.topLabel, { flexDirection: "", }]}>
                        <Text size={10} style={[styles.accountType, { textAlign: "right" }]}>{cardData.cardType}</Text>
                      </View>
                    </View>
                    :
                    <View>
                      <View style={[styles.topLabel]}>
                        <Text size={17} style={[styles.budgetTitle]}>{categoryData.category}</Text>
                      </View>
                    </View>
                }
                {summary && budgetStyle && <ProgressBar style={styles.progressBar} progress={(Math.max(0, summary.outflow) / categoryData.budget)} color={Theme.COLORS.ERROR} />}
                {
                  summary && summary.inflow && summary.outflow ?
                    <View style={styles.priceContainer}>
                      <Text size={12} color={Theme.COLORS.ERROR} style={[styles.numberStyle, styles.numberBorder]}>${summary && summary.outflow || ""}</Text>
                      <Text size={12} color={Theme.COLORS.SUCCESS} style={[styles.numberStyle, budgetStyle && styles.numberBorder]}>${summary && summary.inflow || ""}</Text>
                      {budgetStyle && <Text size={12} color={Theme.COLORS.MUTED} style={[styles.numberStyle]}>${categoryData.budget}</Text>}
                    </View>
                    :
                    <></>
                }
              </Block>
            </TouchableNativeFeedback>
          </>
          :
          <></>
      }
      <Modal
        visible={isPopupVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={hidePopup}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            <Text p style={{ marginBottom: theme.SIZES.BASE * 1.5, textAlign: "center" }}>Do you want to exit and open the {cardData && cardData.bank} app?</Text>
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
  )
};

export default SummaryCard;

const styles = StyleSheet.create({
  budgetSettingsIcon: {
    position: 'absolute',
    top: "14%",
    right: "5%",
    zIndex: 999,
    borderRadius: 999,
  },
  accountSettingsIcon: {
    // position: 'absolute',
    // top: "9%",
    // right: "6%",
    zIndex: 999,
    borderRadius: 999,
  },
  whiteBG: {
    backgroundColor: "white",
  },
  budgetTitle: {
    textTransform: 'capitalize',
  },
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
  accountType: {
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
    paddingBottom: "1.5%",
    paddingLeft: "2%",
    height: "85%",
    width: 'auto',
  },
  imageOffset: {
    marginTop: "-10%",
  },
  imageContainerBudget: {
    borderRadius: 10,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE / 2,
    aspectRatio: 5 / 5,
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