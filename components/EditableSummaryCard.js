import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Dimensions, TouchableNativeFeedback, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import Theme from '../constants/Theme';
import IconExtra from './IconExtra';
import { ProgressBar, TouchableRipple, Dropdown } from 'react-native-paper';
import { categories, materialTheme } from '../constants';
import CustomSegmentedButtons from '../components/CustomSegmentedButtons'

const { width } = Dimensions.get('screen');

const EditableSummaryCard = ({ budgetStyle, horizontal, style, imageStyle }) => {

    const imageStyles = [
        styles.image,
        styles.fullImage,
        imageStyle,
    ];

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const [selectedValue, setSelectedValue] = useState(options[0] && options[0].value);

    const handleValueChange = (itemValue, itemIndex) => {
        setSelectedValue(itemValue);
    };

    function detectCreditCardType(cardNumber) {
        if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
            return "visa";
        }
        if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
            return "mastercard";
        }
        // American Express
        if (/^3[47][0-9]{13}$/.test(cardNumber)) {
            return "amex";
        }
        // Add more card types if needed

        return "Unknown"; // If the card type is not recognized
    }


    const [accountType, setAccountType] = useState('');
    const [cardType, setCardType] = useState('');


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            {/* Picture */}
            <TouchableWithoutFeedback>
                <Block flex style={[styles.imageContainer, styles.shadow]}>
                    <Image source={{ uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" }} style={imageStyles} />
                </Block>
            </TouchableWithoutFeedback>
            <Block flex space={"evenly"} style={[styles.cardDesc,]}>
                {
                    !budgetStyle ?
                        <View>
                            {/* Name Field */}
                            <View style={[styles.topLabel]}>
                                <View style={[styles.inputContainer, { marginRight: "1%" }]}>
                                    <Input
                                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                        style={[{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT },]}
                                        placeholder="Last Name"
                                    />
                                </View>
                                <View style={[styles.inputContainer]}>
                                    <Input
                                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                        style={[{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT },]}
                                        placeholder="First Name"
                                    />
                                </View>
                            </View>
                            {/* cardnumber && card Type*/}
                            <View style={styles.topLabel}>
                                {/* change to input */}
                                <View style={[styles.inputContainer]}>
                                    <Input
                                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                        style={[{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT },]}
                                        placeholder="Card Number"
                                        inputMode='numeric'
                                    />
                                </View>
                                <Text size={10}></Text>
                            </View>
                            <CustomSegmentedButtons
                                items={[{ value: 'debit', label: 'Debit', }, { value: 'credit', label: 'Credit', },]}
                                randomizer={() => Math.random() < 0.5 ? setAccountType("debit") : setAccountType("credit")}
                                setValue={setAccountType}
                                value={accountType}
                            />
                            <View style={[styles.topLabel, { marginBottom: "2%" }]}>
                                <CustomSegmentedButtons
                                    items={[{ value: 'visa', label: 'Visa', }, { value: 'mastercard', label: 'Mastercard', }, { value: 'amex', label: 'Amex', },]}
                                    randomizer={() => Math.random() < (1 / 3) ? setCardType("visa") : Math.random() < (1 / 2) ? setCardType("mastercard") : setCardType("amex")}
                                    value={cardType}
                                    setValue={setCardType}
                                />
                            </View>
                        </View>
                        :
                        <View style={[styles.inputContainer]}>
                            <Input
                                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                style={[{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT },]}
                                placeholder="Category Name"
                            />
                            <ProgressBar style={styles.progressBar} progress={0.5} color={Theme.COLORS.ERROR} />
                        </View>
                }
                <View style={styles.priceContainer}>
                    <Text size={12} color={Theme.COLORS.ERROR} style={[styles.numberStyle, styles.numberBorder]}>$Outflow</Text>
                    <Text size={12} color={Theme.COLORS.SUCCESS} style={[styles.numberStyle, budgetStyle && styles.numberBorder]}>
                        {budgetStyle ? "$Remaining" : "$Inflow"}
                    </Text>
                    {/* change to input */}
                    {budgetStyle &&
                        <View style={[styles.inputContainer]}>
                            <Input
                                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                style={[{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT, marginHorizontal: "2%" },]}
                                placeholder="$Budget"
                                inputMode='numeric'
                            />
                        </View>
                    }
                </View>
            </Block>
        </ScrollView>
    );
};

export default EditableSummaryCard;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
    },
    imageContainer: {
        elevation: 1,
        paddingTop: theme.SIZES.BASE / 2,
    },
    image: {
        borderRadius: 5,
        marginHorizontal: theme.SIZES.BASE / 2,
    },
    fullImage: {
        height: 215,
        width: width - theme.SIZES.BASE * 3,
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },

    whiteBG: {
        backgroundColor: "white",
    },
    budgetTitle: {
        textTransform: 'capitalize',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: "10%",
    },
    progressBar: {
        backgroundColor: Theme.COLORS.SUCCESS,
        marginTop: theme.SIZES.BASE * 0.6,
        marginBottom: theme.SIZES.BASE * 0.8,
    },
    accountType: {
        textTransform: 'capitalize',
        color: Theme.COLORS.MUTED
    },
    topLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: Theme.COLORS.DEFAULT,
    },
    numberBorder: {
        borderRightWidth: 1,
        borderColor: Theme.COLORS.DEFAULT,
    },
    numberStyle: {
        flex: 1,
        marginVertical: theme.SIZES.BASE,
        textAlign: "center"
    },
    cardDesc: {
        padding: theme.SIZES.BASE / 2,
        paddingBottom: 0,
        marginHorizontal: theme.SIZES.BASE / 2,
    },
    test: {
        borderWidth: 1,
        borderColor: "red",
    },
});

