import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import BudgetDetails from "./BudgetDetails";
import { accountData } from "../constants";
import { Block, theme } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import SummaryCard from "../components/SummaryCard";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";

const { width } = Dimensions.get("screen");

export default function BudgetHomeScreen({ navigation }) {
  return (
    <Block flex center>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}
      >
        <Block flex style={styles.group}>
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <SummaryCard budgetStyle accountData={accountData[0]} horizontal navigateTo={BudgetDetails} />
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