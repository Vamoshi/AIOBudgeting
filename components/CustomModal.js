import { Block, Button, theme } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { materialTheme } from '../constants';

// need component, visible, setVisibility
const CustomModal = ({ disableConfirm, extraButtons, noCancelButton, noConfirmButton, buttonColor = { cancel: "", confirm: "", }, buttonStyle = { cancel: {}, confirm: {} }, buttons, noButtons, component, visible = false, setVisibility, handleConfirm = () => { }, handleCancel = () => { } }) => {

    const hidePopup = () => {
        setVisibility(false)
    };

    // useEffect(() => {
    //     console.log('====================================');
    //     console.log("disableconfirm", disableConfirm);
    //     console.log('====================================');
    // }, [])

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={hidePopup}
        >
            <View style={[styles.modalBG]} >
                {/* <TouchableWithoutFeedback onPress={hidePopup}> */}
                <Block style={[styles.modalContent,]}>
                    <Block>
                        {component}
                        {
                            !noButtons &&
                            <Block row space="evenly" style={{ marginTop: "2%" }}>
                                {extraButtons}
                                <Block flex>
                                    {!noCancelButton &&
                                        <Button
                                            color={buttonColor.cancel || materialTheme.COLORS.MUTED}
                                            textStyle={styles.optionsText}
                                            style={[styles.optionsButton, buttonStyle.cancel]}
                                            onPress={() => {
                                                hidePopup()
                                                handleCancel()
                                            }}
                                        >
                                            {buttons && buttons.cancel || "Cancel"}
                                        </Button>
                                    }
                                </Block>
                                <Block flex={1}>
                                    {!noConfirmButton &&
                                        <Button
                                            disabled={disableConfirm}
                                            center
                                            shadowless
                                            color={buttonColor.confirm || disableConfirm && materialTheme.COLORS.SWITCH_OFF || materialTheme.COLORS.INFO}
                                            textStyle={styles.optionsText}
                                            style={[styles.optionsButton, buttonStyle.confirm]}
                                            onPress={() => {
                                                hidePopup()
                                                handleConfirm()
                                            }}
                                        >
                                            {buttons && buttons.confirm || "Confirm"}
                                        </Button>
                                    }
                                </Block>
                            </Block>
                        }
                    </Block>
                </Block>
                {/* </TouchableWithoutFeedback> */}
            </View>
        </Modal >
    )
};

export default CustomModal;

const styles = StyleSheet.create({
    optionsText: {
        fontSize: theme.SIZES.BASE * 0.8,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.29,
    },
    optionsButton: {
        width: 'auto',
        height: 34,
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: 10,
    },
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