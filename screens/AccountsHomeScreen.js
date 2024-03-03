import { Dimensions, View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import { Block, theme } from "galio-framework";
import SummaryCard from "../components/SummaryCard";
import { accountData } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import AccountsDetails from "./AccountsDetails";
import HomePageStyles from "../constants/CommonStyles/HomePageStyles";

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
                            <SummaryCard accountData={accountData[0]} horizontal navigateTo={AccountsDetails} />
                            <SummaryCard accountData={accountData[1]} horizontal navigateTo={AccountsDetails} />
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