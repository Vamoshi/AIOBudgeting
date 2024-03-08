import { Dimensions, View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import { Block, theme } from "galio-framework";
import SummaryCard from "../components/SummaryCard";
import { ScrollView } from "react-native-gesture-handler";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";

export default function AccountsDetails() {
    const route = useRoute()
    const { navigationProps } = route.params

    const [accountData, setAccountData] = useState(navigationProps && navigationProps.accountData)
    const [cardData, setCardData] = useState(navigationProps && navigationProps.cardData)
    const [summary, setSummary] = useState(navigationProps && navigationProps.summary)
    const [transactions, setTransactions] = useState()

    const fetchTransactions = () => setTransactions(
        Object.keys(accountData.transactions).filter((key) => accountData.transactions[key].cardID === cardData.cardID || cardData.cardID === "summary")
    )

    useEffect(() => {
        !accountData && setAccountData(navigationProps.accountData)
        !cardData && setCardData(navigationProps.categoryData)
        !summary && setSummary(navigationProps.summary)

        accountData && !transactions && fetchTransactions()
    }, [navigationProps, transactions])

    return (
        <Block flex center style={[]}>
            <ScrollView
                style={[styles.components]}
                showsVerticalScrollIndicator={false}
            >
                <Block flex style={[styles.group]}>
                    <Block flex>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            <SummaryCard
                                accountData={accountData}
                                cardData={cardData}
                                summary={summary}
                                horizontal
                                imageStyle={{ backgroundColor: "white" }}
                            />
                            {
                                transactions && transactions.map((key) =>
                                    <TransactionCard
                                        accountData={accountData}
                                        tid={key}
                                        key={key}
                                        summary={summary}
                                    />
                                )
                            }
                        </Block>
                    </Block>
                </Block>
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    ...HomePageStyles
});