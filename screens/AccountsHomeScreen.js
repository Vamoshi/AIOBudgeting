import { StyleSheet, } from "react-native";
import { Block, theme } from "galio-framework";
import SummaryCard from "../components/SummaryCard";
import { accountData } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import ScreenNames from "../navigation/ScreenNames";
import { useEffect, useState } from "react";

export default function AccountsHomeScreen({ navigation }) {
    const [allCardTransactions, setAllCardTransactions] = useState();

    const calcInflowOutflow = (cardTransactionIDs) => {
        let inflow = 0;
        let outflow = 0;

        if (allCardTransactions) {
            cardTransactionIDs.forEach((tID) => {
                const transactionAmount = allCardTransactions[tID].amount;
                transactionAmount < 0 ? inflow += parseFloat(transactionAmount) * -1 : outflow += parseFloat(transactionAmount);
            });
        }
        return { inflow, outflow };
    };

    const getCardTransactions = (cardID) => {
        if (allCardTransactions) {
            return Object.values(allCardTransactions).filter(transaction => transaction.cardID === cardID).map(transaction => transaction.transactionID);
        }
        return [];
    };

    const createCardDataSummary = () => {
        const cardDataSummary = {
            cardID: "summary",
            number: "",
            bank: "",
            image: "https://cdn-icons-png.flaticon.com/512/8258/8258643.png",
            lastName: "Cards",
            firstName: "All",
            horizontal: true,
            link: "",
            accountType: "Summary",
            cardType: ""
        }

        return cardDataSummary
    }

    const RenderSummaryCard = () => {
        const summary = calcInflowOutflow(Object.keys(allCardTransactions));
        const cardData = createCardDataSummary()

        return (
            <SummaryCard
                accountData={accountData}
                cardData={cardData}
                navigateTo={ScreenNames().Stack.AccountsDetails}
                navigationProps={{ accountData, cardData, summary }}
                summary={{
                    outflow: summary.outflow,
                    inflow: summary.inflow,
                }}
                imageStyle={{ backgroundColor: "white" }}
            />
        )
    }

    useEffect(() => {
        if (accountData && accountData.transactions) {
            setAllCardTransactions(accountData.transactions);
        }
    }, [accountData, allCardTransactions]);

    return (
        <Block flex center style={[]}>
            <ScrollView
                style={[styles.components]}
                showsVerticalScrollIndicator={false}
            >
                <Block flex style={[styles.group]}>
                    <Block flex>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            {accountData && allCardTransactions && <RenderSummaryCard />}
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