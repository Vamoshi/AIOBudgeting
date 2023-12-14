import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Linking } from 'react-native';
import { Block, Text, theme, } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { useRoute } from '@react-navigation/core';
import RecipeCard from '../components/RecipeCard';
import IconExtra from "../components/IconExtra";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/RecipeSearchSlice';


const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function RecipeDetails({ navigation }) {

    const { params: { navigationProps } } = useRoute()
    const [recipe, setRecipe] = useState({})
    const [link, setLink] = useState({})
    const [pairs, setPairs] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)

    const chunkArray = (ingredients, chunkSize = 2) => {
        const chunked = [];
        for (let i = 0; i < ingredients.length; i += chunkSize) {
            chunked.push(ingredients.slice(i, i + chunkSize));
        }
        return chunked;
    };

    const dispatch = useDispatch()

    const favorites = useSelector(state => {
        return state.recipeSearch.favorites
    })

    useEffect(() => {
        setRecipe(navigationProps.recipe)
        setLink(navigationProps._links)
        recipe.ingredients && setPairs(chunkArray(recipe.ingredients))

        setIsFavorite(false)
        link.self && link.self.href in favorites && setIsFavorite(true)

    }, [navigationProps, recipe, favorites])

    return (
        <Block flex style={styles.profile}>
            <Block flex>
                <ImageBackground
                    source={{ uri: recipe.image }}
                    style={styles.profileContainer}
                    imageStyle={styles.profileImage}>
                    <Block flex style={styles.profileDetails}>
                        <Block style={styles.profileTexts}>
                            <Text color="white" size={28} style={{ paddingBottom: 8 }}>{recipe.label}</Text>
                            <Block row space="between">
                                <Block row>
                                    <Text color="white" size={16} muted style={styles.seller}>{recipe.source}</Text>
                                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                                        {recipe.calories && `${recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(2)} ${recipe.totalNutrients.ENERC_KCAL.unit.toUpperCase()}             ` || ""}
                                    </Text>
                                    <Text size={16} color={materialTheme.COLORS.WARNING}>{
                                        isFavorite ?
                                            <IconExtra name="star" family="FontAwesome" size={20} onPress={() => dispatch(removeFavorite(link.self.href))} />
                                            :
                                            <IconExtra name="shape-star" family="GalioExtra" size={20} onPress={() => dispatch(addFavorite(obj = { [link.self.href]: navigationProps }))} />
                                    }
                                    </Text>
                                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                                        {`   Favorite`}
                                    </Text>
                                </Block>
                            </Block>
                        </Block>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                    </Block>
                </ImageBackground>
            </Block>
            <Block flex style={styles.options}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                        <Block middle>
                            <Text bold size={16} style={{ marginBottom: 8 }}>{recipe.mealType}</Text>
                            <Text muted size={16}>Meal Type</Text>
                        </Block>
                        <Block middle>
                            <Text bold size={16} style={{ marginBottom: 8 }}>{`${recipe.dishType && recipe.dishType}`}</Text>
                            <Text muted size={16}>Dish Type</Text>
                        </Block>
                        <Block middle>
                            <Text bold size={16} style={{ marginBottom: 8 }}>{recipe.yield}</Text>
                            <Text muted size={16}>Servings</Text>
                        </Block>
                    </Block>
                    <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                        <Text size={20}>Summary</Text>
                        <Text size={16} color={theme.COLORS.PRIMARY} onPress={() => Linking.openURL(recipe.url)}>View Full Recipe</Text>
                    </Block>
                    <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                        {
                            pairs && pairs.length > 0 && pairs.map((pair, index) =>
                                <Block flex row key={index}>
                                    {
                                        pair.map((ingredient, i) => <RecipeCard
                                            key={i}
                                            product={{
                                                title: ingredient.text,
                                                image: ingredient.image,
                                                // price: 220,
                                            }}
                                            style={{ marginRight: theme.SIZES.BASE }}
                                        />)
                                    }
                                </Block>
                            )
                        }
                    </Block>
                </ScrollView>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
    },
    profileImage: {
        width: width * 1.1,
        height: 'auto',
    },
    profileContainer: {
        width: width,
        height: height / 2,
    },
    profileDetails: {
        paddingTop: theme.SIZES.BASE * 4,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    profileTexts: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 6,
        zIndex: 2
    },
    pro: {
        backgroundColor: materialTheme.COLORS.LABEL,
        paddingHorizontal: 6,
        marginRight: theme.SIZES.BASE / 2,
        borderRadius: 4,
        height: 19,
        width: 38,
    },
    seller: {
        marginRight: theme.SIZES.BASE / 2,
    },
    options: {
        position: 'relative',
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: -theme.SIZES.BASE * 7,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: 'center',
        width: thumbMeasure,
        height: thumbMeasure
    },
    gradient: {
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: '30%',
        position: 'absolute',
    },
});
