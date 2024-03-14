import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { accountData, categories } from "../constants";
import { Block, theme } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import SummaryCard from "../components/SummaryCard";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import ScreenNames from "../navigation/ScreenNames"
import EditableSummaryCard from '../components/EditableSummaryCard'

const { width } = Dimensions.get("screen");

export default function BudgetHomeScreen({ navigation }) {
  const [cardType, setCardType] = useState('');



  useEffect(() => {
    accountData
  }, [accountData])

  const calcBudgetOutflow = (categoryTransactions) => {
    let outflow = 0;

    if (accountData && categories) {
      transactionDetails = accountData.transactions

      categoryTransactions.forEach((tID) => {
        outflow += parseFloat(transactionDetails[tID].amount)
      })
    }

    return outflow
  }

  const calcBudgetRemaining = (categoryData, budgetOutflow) => {
    return parseInt(categoryData.budget) - parseInt(budgetOutflow) || 0
  }

  const createCategorySummary = () => {
    const summaryObject = {
      category: "Budget Summary",
      budget: 0,
      transactions: [],
      image: "https://cdn4.iconfinder.com/data/icons/fintech-color-line-vol-1/256/BUDGETING-1024.png"
    }

    let budget = 0
    let transactions = []

    Object.keys(categories).forEach((categoryID) => {
      transactions = transactions.concat(categories[categoryID].transactions)
      budget += categories[categoryID].budget
    })

    summaryObject.budget = budget
    summaryObject.transactions = transactions

    return summaryObject
  }

  const SummarySummaryCard = () => {
    if (categories) {

      const categorySummary = createCategorySummary()

      const budgetOutflow = calcBudgetOutflow(categorySummary.transactions)
      const budgetInflow = calcBudgetRemaining(categorySummary, budgetOutflow)
      const summary = { outflow: budgetOutflow, inflow: budgetInflow }

      return <SummaryCard
        categoryData={categorySummary}
        accountData={accountData}
        navigationProps={{ categoryData: categorySummary, accountData, summary }}
        budgetStyle
        navigateTo={ScreenNames().Stack.BudgetDetails}
        summary={summary}
      />
    }
  }

  return (
    <Block flex center>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <Block flex style={styles.group}>
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <SummarySummaryCard />
              {
                categories && Object.keys(categories).map((key) => {
                  categoryData = categories[key]

                  const budgetOutflow = calcBudgetOutflow(categoryData.transactions)
                  const budgetInflow = calcBudgetRemaining(categoryData, budgetOutflow)
                  const summary = { outflow: budgetOutflow, inflow: budgetInflow }

                  return <SummaryCard
                    categoryData={categoryData}
                    accountData={accountData}
                    navigationProps={{ categoryData, accountData, summary }}
                    budgetStyle
                    key={key}
                    navigateTo={ScreenNames().Stack.BudgetDetails}
                    summary={summary}
                  />
                })
              }
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  ...HomePageStyles,
});