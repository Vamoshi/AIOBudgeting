import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableNativeFeedback, View, Linking, Modal, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import IconExtra from './IconExtra';
import { ActivityIndicator, ProgressBar, TouchableRipple } from 'react-native-paper';
import CustomModal from './CustomModal';
import EditableSummaryCard from '../components/EditableSummaryCard'
import { materialTheme } from '../constants';


// Needs (categoryData || cardData) && accountData & summary, 
const SummaryCard = ({ categoryData, cardData, summary, imageStyle, navigateTo, navigationProps, budgetStyle }) => {
  const [exitAppPopup, setExitAppPopup] = useState(false);
  const [budgetPopup, setBudgetPopup] = useState(false);
  const [accountPopup, setAccountPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false)
  const [deleteFeedbackPopup, setDeleteFeedbackPopup] = useState(false)

  const { navigate } = useNavigation()

  const handleNavigation = () => {
    navigateTo && navigate(navigateTo, { navigationProps })
  }

  const openExternalApp = () => {
    !budgetStyle && cardData && cardData.link && Linking.openURL(cardData.link);
  }
  const hidePopup = () => {
    setExitAppPopup(false);
  };
  const imageClickHandler = () => {
    !budgetStyle ? setExitAppPopup(true) : handleNavigation();
  };

  const imageStyles = [
    styles.image,
    imageStyle,
    budgetStyle && styles.whiteBG
  ];

  const editBudgetCard = () => {
    setBudgetPopup(true)
  }

  const editAccountCard = () => {
    setAccountPopup(true)
  }

  // useEffect(() => {
  //   console.log('====================================');
  //   console.log(categoryData, cardData);
  //   console.log('====================================');
  // }, [categoryData])

  const [optionsPopup, setOptionsPopup] = useState(false)

  const [categoryNameField, setCategoryNameField] = useState("")
  const [budgetField, setBudgetField] = useState("")
  const [lastNameField, setLastNameField] = useState("")
  const [firstNameField, setFirstNameField] = useState("")
  const [cardNumberField, setCardNumberField] = useState("")

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
              <TouchableRipple style={[styles.budgetSettingsIcon]} onPress={() => setOptionsPopup(true)}>
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
                          !budgetStyle && !cardData.accountType.toLowerCase().includes("summary") && <TouchableRipple style={[styles.accountSettingsIcon]} onPress={() => setOptionsPopup(true)}>
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
                    <ActivityIndicator animating={true} color={theme.COLORS.PRIMARY} />
                }
              </Block>
            </TouchableNativeFeedback>
          </>
          :
          <ActivityIndicator animating={true} color={theme.COLORS.PRIMARY} />
      }
      <>
        <CustomModal
          visible={exitAppPopup}
          setVisibility={setExitAppPopup}
          handleConfirm={openExternalApp}
          component={
            <Block
              style={[{ padding: theme.SIZES.BASE }]}
            >
              <Text p style={{ textAlign: "center" }}>Do you want to open the {cardData && cardData.bank} app?</Text>
            </Block>
          }
        />
        <CustomModal
          visible={budgetPopup}
          setVisibility={setBudgetPopup}
          component={
            <EditableSummaryCard
              full
              budgetStyle
              stateFunctions={{ setCategoryNameField, setBudgetField }}
            />
          }
          disableConfirm={!categoryNameField && !budgetField}
        />
        <CustomModal
          visible={accountPopup}
          setVisibility={setAccountPopup}
          component={
            <EditableSummaryCard
              full
              stateFunctions={{ setLastNameField, setFirstNameField, setCardNumberField }}
            />
          }
          disableConfirm={!lastNameField && !firstNameField && !cardNumberField}
        />
        <CustomModal
          visible={optionsPopup}
          setVisibility={setOptionsPopup}
          buttons={
            {
              confirm: "Edit",
              cancel: "Delete",
            }
          }
          extraButtons={
            <Block flex>
              <Button
                color={materialTheme.COLORS.MUTED}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}
                onPress={() => {
                  setOptionsPopup(false)
                }}
              >
                Cancel
              </Button>
            </Block>
          }
          buttonColor={{ cancel: Theme.COLORS.ERROR }}
          handleConfirm={budgetStyle ? editBudgetCard : editAccountCard}
          handleCancel={() => {
            setBudgetPopup(false)
            setAccountPopup(false)
            setDeletePopup(true)
          }}
          component={
            <Block
              style={[{ padding: theme.SIZES.BASE }]}
            >
              <Text p style={{ textAlign: "center" }}>What do you want to do with "{budgetStyle ? categoryData && categoryData.category : cardData && cardData.number || cardData.cardID}"?</Text>
            </Block>
          }
        />
        <CustomModal
          visible={deletePopup}
          setVisibility={setDeletePopup}
          component={
            <Block
              style={[{ padding: theme.SIZES.BASE }]}
            >
              <Text p style={{ textAlign: "center" }}>Are you sure you want to delete "{budgetStyle ? categoryData && categoryData.category : cardData && cardData.number || cardData.cardID}"? </Text>
              <Text style={{ textAlign: "center" }} h6></Text>
              <Text p style={{ textAlign: "center", color: Theme.COLORS.ERROR }}>Warning: This action cannot be undone</Text>
            </Block>
          }
          handleConfirm={() => setDeleteFeedbackPopup(true)}
          buttonColor={{ confirm: Theme.COLORS.ERROR, cancel: Theme.COLORS.SUCCESS }}
        />
        <CustomModal
          visible={deleteFeedbackPopup}
          setVisibility={setDeleteFeedbackPopup}
          component={
            <Block
              style={[{ padding: theme.SIZES.BASE }]}
            >
              <Text p style={{ textAlign: "center" }}>"{budgetStyle ? categoryData && categoryData.category : cardData && cardData.number || cardData.cardID}" Has been deleted </Text>
            </Block>
          }
          noCancelButton
        />
      </>
    </Block >
  )
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
  budgetSettingsIcon: {
    position: 'absolute',
    top: "14%",
    right: "5%",
    zIndex: 10,
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