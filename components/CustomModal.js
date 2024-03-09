import { Block, Button, theme } from 'galio-framework';
import React, { useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { materialTheme } from '../constants';



// Needs (categoryData || cardData) && accountData & summary, 
const CustomModal = ({ component, visible = false, setVisibility, handleConfirm = () => { } }) => {

    const hidePopup = () => {
        setVisibility(false)
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={hidePopup}
        >
            <View style={[styles.modalBG]}>
                <Block style={[styles.modalContent,]}>
                    <Block>
                        {component}
                        <Block row space="evenly" style={{ marginTop: "2%" }}>
                            <Block flex>
                                <Button
                                    color={materialTheme.COLORS.MUTED}
                                    textStyle={styles.optionsText}
                                    style={[styles.optionsButton, styles.shadow]}
                                    onPress={hidePopup}
                                >
                                    Cancel
                                </Button>
                            </Block>
                            <Block flex={1}>
                                <Button
                                    center
                                    shadowless
                                    color={materialTheme.COLORS.INFO}
                                    textStyle={styles.optionsText}
                                    style={[styles.optionsButton, styles.shadow]}
                                    onPress={() => {
                                        hidePopup()
                                        handleConfirm()
                                    }}
                                >
                                    Confirm
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </View>
        </Modal >
    )
};

export default CustomModal;

const styles = StyleSheet.create({

    modalBG: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
        width: "92.5%",
        marginHorizontal: "10%",
    },
    test: {
        borderWidth: 1,
        borderColor: "red",
    },
});