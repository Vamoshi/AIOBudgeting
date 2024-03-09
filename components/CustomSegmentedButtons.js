import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import Theme from '../constants/Theme';
import { theme } from 'galio-framework';

const MyComponent = ({ randomizer, items, value, setValue }) => {

    useEffect(() => {
        randomizer && randomizer()
    }, [value])

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                density='small'
                theme={{ colors: { primary: Theme.COLORS.PRIMARY } }}
                value={value}
                onValueChange={setValue}
                buttons={
                    items.map((item) => {
                        return {
                            ...item,
                            disabled: true,
                            style: { borderRadius: 4 },
                        }
                    })
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: theme.SIZES.BASE / 3,
        flex: 1,
        alignItems: 'center',
    },
    test: {
        borderWidth: 1,
        borderColor: "red",
    },
});

export default MyComponent;