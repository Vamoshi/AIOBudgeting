import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableNativeFeedback, View, Linking, Modal } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import IconExtra from './IconExtra';
import { ProgressBar } from 'react-native-paper';
import { categories, materialTheme } from '../constants';


// Needs (categoryData || cardData) && accountData, 
const SummaryCard = ({ categoryData, accountData, cardData, summary, imageStyle, navigateTo, navigationProps, budgetStyle }) => {
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
  ];

  const [accountsOutflow, setAccountsOutflow] = useState(0)
  const calcAccountsOutflow = () => {
    total = 0

    if (cardData && accountData) {
      transactions = accountData.transactions
      allTransactionKeys = Object.keys(accountData.transactions)
      allTransactionKeys.forEach((tID) => {
        transactionAmount = transactions[tID].amount
        transactionCard = transactions[tID].cardID
        card = cardData.cardID
        transactionCard === card ? transactionAmount > 0 ? total += parseFloat(transactionAmount) : 0 : 0
      })
    }
    setAccountsOutflow(total)
  }

  const [accountsInflow, setAccountsInflow] = useState(0)
  const calcAccountsInflow = () => {
    total = 0

    if (cardData && accountData) {
      transactions = accountData.transactions
      allTransactionKeys = Object.keys(accountData.transactions)
      allTransactionKeys.forEach((tID) => {
        transactionAmount = transactions[tID].amount
        transactionCard = transactions[tID].cardID
        card = cardData.cardID

        transactionCard === card ? transactionAmount < 0 ? total += parseFloat(transactionAmount) * -1 : 0 : 0
      })
    }
    setAccountsInflow(total)
  }

  const [budgetOutflow, setBudgetOutflow] = useState(0)
  const calcBudgetOutflow = () => {
    total = 0

    if (accountData && categories && categoryData) {
      categoryTransactions = categories[categoryData.category].transactions
      transactionDetails = accountData.transactions

      categoryTransactions.forEach((tID) => {
        total += parseFloat(transactionDetails[tID].amount)
      })
    }

    setBudgetOutflow(total)
  }

  const [budgetRemaining, setBudgetRemaining] = useState(0)
  const calcBudgetRemaining = () => {
    setBudgetRemaining(parseInt(categoryData.budget) - parseInt(budgetOutflow))
  }

  useEffect(() => {
    if (budgetStyle && categoryData) {
      calcBudgetOutflow()
      calcBudgetRemaining()
    }
    else {
      calcAccountsOutflow()
      calcAccountsInflow()
    }
  }, [categoryData, accountData, cardData, budgetOutflow])

  return (
    <Block row={true} card flex style={[styles.SummaryCard, styles.shadow]}>

      {
        !budgetStyle && cardData || budgetStyle && categoryData ?
          <>
            <Block style={[styles.bankDetailsContainer,]}>
              <TouchableNativeFeedback onPress={imageClickHandler}>
                <View style={[styles.cardBorder]}>
                  <View style={[budgetStyle ? styles.imageContainerBudget : styles.imageContainer, styles.shadow]}>
                    <Image source={{ uri: budgetStyle ? categoryData.image : cardData.image }} style={imageStyles} resizeMode='contain' />
                  </View>
                  {
                    !budgetStyle &&
                    <View style={styles.bankNameContainer}>
                      <Text muted={true} style={[styles.bankText]}><IconExtra name="open-outline" family="ionicon" />{cardData.bank}</Text>
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
                        <Text size={12}>{cardData.firstName} {cardData.lastName}</Text>
                        <Text size={10} style={[styles.accountType,]}>{cardData.accountType}</Text>
                      </View>
                      <View style={styles.topLabel}>
                        <Text size={12}>{cardData.number.slice(-9)}</Text>
                        <Text size={10} style={[styles.accountType,]}>{cardData.cardType}</Text>
                      </View>
                    </View>
                    :
                    <View>
                      <View style={styles.topLabel}>
                        <Text size={17} style={[styles.budgetTitle]}>{categoryData.category}</Text>
                      </View>
                    </View>
                }
                {budgetStyle && <ProgressBar style={styles.progressBar} progress={(Math.max(0, budgetOutflow) / categoryData.budget)} color={Theme.COLORS.ERROR} />}
                <View style={styles.priceContainer}>
                  <Text size={12} color={Theme.COLORS.ERROR} style={[styles.numberStyle, styles.numberBorder]}>${budgetStyle ? budgetOutflow : accountsOutflow}</Text>
                  <Text size={12} color={Theme.COLORS.SUCCESS} style={[styles.numberStyle, budgetStyle && styles.numberBorder]}>${budgetStyle ? budgetRemaining : accountsInflow}</Text>
                  {budgetStyle && <Text size={12} color={Theme.COLORS.MUTED} style={[styles.numberStyle]}>${categoryData.budget}</Text>}
                </View>
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