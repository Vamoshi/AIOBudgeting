import { Dimensions, View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import { Block, theme } from "galio-framework";
import SummaryCard from "../components/SummaryCard";
import { accountData } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import AccountsDetails from "./AccountsDetails";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";
import ScreenNames from "../navigation/ScreenNames";

export default function AccountsHomeScreen({ navigation }) {

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
                                Object.keys(accountData.cards).map((key) => {
                                    cardData = accountData.cards[key]
                                    return <SummaryCard
                                        accountData={accountData}
                                        cardData={cardData}
                                        key={key}
                                        navigateTo={ScreenNames().Stack.AccountsDetails}
                                        navigationProps={{ accountData, cardData }}
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
    ...HomePageStyles
});