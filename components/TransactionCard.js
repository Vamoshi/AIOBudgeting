import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Linking, Modal } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import { materialTheme } from '../constants';

// Needs accountData && tid
const TransactionCard = ({ categoryData, summary, accountData, cardData, tid, navigateTo, navigationProps, budgetStyle }) => {
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

  const formatDate = () => {
    const date = new Date(transaction.date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(date);

    setDate(formattedDate)
  }

  const [transaction, setTransaction] = useState({})
  const [date, setDate] = useState()

  const formatPercent = (number) => {
    return Math.round(Math.abs((number)), 0) || 0
  }

  const calcBudgetPercent = () => {
    return formatPercent((transaction.amount / (transaction.amount <= 0 ? summary.inflow : summary.outflow)) * 100)
  }

  const calcAccountPercent = () => {
    return formatPercent((transaction.amount / categoryData.budget) * 100)
  }

  useEffect(() => {
    accountData && setTransaction(accountData.transactions[tid])
    transaction && transaction.date && formatDate()
  }, [categoryData, accountData, cardData, transaction, tid])

  return (
    <Block row={true} card flex={1} style={[styles.SummaryCard, styles.shadow]}>
      {
        tid && accountData ?
          <>
            <TouchableNativeFeedback onPress={handleNavigation}>
              <Block flex={1} style={styles.cardDesc}>
                <View>
                  <View style={styles.topLabel}>
                    <Text size={15} style={[styles.title]}>{accountData.transactions[tid].description}</Text>
                  </View>
                </View>
                <View style={[styles.priceContainer]}>
                  <Text size={12} color={Theme.COLORS.PRIMARY} style={[styles.numberStyle, styles.numberBorder, styles.date]}>{date || ""}</Text>
                  <Text size={12} color={transaction.amount >= 0 ? Theme.COLORS.ERROR : Theme.COLORS.SUCCESS} style={[styles.numberStyle, styles.numberBorder]}>
                    {
                      budgetStyle ? calcAccountPercent() : calcBudgetPercent()
                    }%
                  </Text>
                  <Text size={12} color={transaction.amount >= 0 ? Theme.COLORS.ERROR : Theme.COLORS.SUCCESS} style={[styles.numberStyle, styles.numberBorder]}>${parseFloat(transaction.amount)}</Text>
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

export default TransactionCard;

const styles = StyleSheet.create({
  date: {
    paddingHorizontal: theme.SIZES.BASE * 1.2,
  },
  title: {
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
  topLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: '3%',
    borderTopWidth: 1,
    borderColor: Theme.COLORS.DEFAULT,
  },
  numberBorder: {
    borderRightWidth: 1,
    borderColor: Theme.COLORS.DEFAULT,
  },
  numberStyle: {
    flex: 1,
    marginTop: "2%",
    textAlign: "center"
  },
  SummaryCard: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE * 0.2,
    height: "auto",
  },
  cardDesc: {
    padding: theme.SIZES.BASE / 2,
    marginHorizontal: theme.SIZES.BASE / 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  test: {
    borderWidth: 1,
    borderColor: "red",
  },
});