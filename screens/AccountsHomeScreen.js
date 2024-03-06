import { StyleSheet, } from "react-native";
import { Block, theme } from "galio-framework";
import SummaryCard from "../components/SummaryCard";
import { accountData } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import ScreenNames from "../navigation/ScreenNames";
import { useEffect, useState } from "react";

export default function AccountsHomeScreen({ navigation }) {
    const [transactions, setTransactions] = useState();

    const calcInflowOutflow = (cardTransactions) => {
        let inflow = 0;
        let outflow = 0;

        if (transactions) {
            cardTransactions.forEach((tID) => {
                const transactionAmount = transactions[tID].amount;
                transactionAmount < 0 ? inflow += parseFloat(transactionAmount) * -1 : outflow += parseFloat(transactionAmount);
            });
        }
        return { inflow, outflow };
    };

    const getCardTransactions = (cardID) => {
        if (transactions) {
            return Object.values(transactions).filter(transaction => transaction.cardID === cardID).map(transaction => transaction.transactionID);
        }
        return [];
    };

    useEffect(() => {
        if (accountData && accountData.transactions) {
            setTransactions(accountData.transactions);
        }
    }, [accountData, transactions]);

    return (
        <Block flex center style={[]}>
            <ScrollView
                style={[styles.components]}
                showsVerticalScrollIndicator={false}
            >
                <Block flex style={[styles.group]}>
                    <Block flex>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            {
                                accountData ? Object.keys(accountData.cards).map((cardID) => {
                                    const cardTransactions = getCardTransactions(cardID);
                                    const summary = calcInflowOutflow(cardTransactions);

                                    const cardData = accountData.cards[cardID];
                                    return (
                                        <SummaryCard
                                            accountData={accountData}
                                            cardData={cardData}
                                            key={cardID}
                                            navigateTo={ScreenNames().Stack.AccountsDetails}
                                            navigationProps={{ accountData, cardData, summary }}
                                            summary={{
                                                outflow: summary.outflow,
                                                inflow: summary.inflow,
                                            }}
                                        />
                                    );
                                })
                                    :
                                    null
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