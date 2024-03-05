import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SummaryCard from "../components/SummaryCard";
import { useRoute } from "@react-navigation/core";
import { Block, theme } from "galio-framework";
import { ScrollView } from "react-native-gesture-handler";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";


export default function BudgetDetails() {

    const route = useRoute()
    const { navigationProps } = route.params

    const [accountData, setAccountData] = useState(navigationProps && navigationProps.accountData)
    const [categoryData, setCategoryData] = useState(navigationProps && navigationProps.categoryData)

    useEffect(() => {
        setAccountData(navigationProps.accountData)
        setCategoryData(navigationProps.categoryData)
    }, [navigationProps])

    return (
        <Block flex center>
            <ScrollView
                style={styles.components}
                showsVerticalScrollIndicator={false}
            >
                <Block flex style={styles.group}>
                    <Block flex>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            <SummaryCard
                                categoryData={categoryData}
                                accountData={accountData}
                                budgetStyle
                                horizontal
                            />
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