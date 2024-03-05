import { Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { accountData, categories } from "../constants";
import { Block, theme } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import SummaryCard from "../components/SummaryCard";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import ScreenNames from "../navigation/ScreenNames"

const { width } = Dimensions.get("screen");

export default function BudgetHomeScreen({ navigation }) {

  useEffect(() => {
    accountData
  }, [accountData])

  return (
    <Block flex center>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <Block flex style={styles.group}>
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              {
                Object.keys(categories).map((key) => {
                  categoryData = categories[key]

                  return <SummaryCard
                    categoryData={categoryData}
                    accountData={accountData}
                    navigationProps={{ categoryData, accountData }}
                    budgetStyle
                    key={key}
                    horizontal
                    navigateTo={ScreenNames().Stack.BudgetDetails}
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