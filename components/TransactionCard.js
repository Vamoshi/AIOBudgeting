import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Linking, Modal } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import { categories, materialTheme } from '../constants';
import { ActivityIndicator, List } from 'react-native-paper';
import CustomModal from "../components/CustomModal"

// Needs accountData && tid
const TransactionCard = ({ categoryData, summary, accountData, cardData, tid, navigateTo, navigationProps, budgetStyle }) => {
  const { navigate } = useNavigation()

  const handleNavigation = () => {
    navigateTo && navigate(navigateTo, { navigationProps })
  }

  const formatDate = () => {
    const date = new Date(transaction.date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(date);

    setDate(formattedDate)
  }

  const [transaction, setTransaction] = useState()
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


  const [editCategoryModal, setEditCategoryModal] = useState(false)
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    accountData && setTransaction(accountData.transactions[tid])
    transaction && transaction.date && formatDate()
    const timer = setTimeout(() => {
      setRendered(true);
    }, 3000); // Wait for 1 second (1000 milliseconds)

    return () => clearTimeout(timer);

  }, [categoryData, accountData, cardData, transaction, tid])

  return (
    <Block row={true} card flex={1} style={[styles.SummaryCard, styles.shadow]}>
      {
        tid && accountData && transaction && rendered ?
          <>
            <TouchableNativeFeedback onPress={navigateTo ? handleNavigation : () => setEditCategoryModal(true)}>
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
          <Block flex={1} style={styles.cardDesc}>
            <ActivityIndicator animating={true} color={theme.COLORS.PRIMARY} />
          </Block>
      }

      <CustomModal
        setVisibility={setEditCategoryModal}
        visible={editCategoryModal}
        component={
          <List.Section>
            <List.Accordion
              title="Categories"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              {
                categories && categoryData && Object.keys(categories).filter((cateID) => cateID !== categoryData.category).map(
                  (catID) => {
                    return <List.Item title={catID}
                      onPress={() => {
                        categories[categoryData.category].transactions = categories[categoryData.category].transactions.filter(item => item !== tid)
                        categories[catID].transactions.push(tid)
                        setEditCategoryModal(false)
                      }}
                      key={catID}
                    />
                  }
                )
              }
            </List.Accordion>
          </List.Section>
        }
        noButtons
      />
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