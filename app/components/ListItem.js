import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native';

export const ListItem = ({ img, title, date, onPress }) => (
    <TouchableOpacity onPress={ onPress }>
        <View style={ styles.itemContainer }>
            <Image
                style={ styles.image }
                source={ { uri: img } }
            />
            <View style={ styles.contentContainer }>
                <Text style={ styles.title }>
                    { title }
                </Text>
                <Text style={ styles.date }>
                    { date }
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        width: 60,
        height: 60,
    },
    contentContainer: {
        paddingLeft: 15,
        marginRight: 50,
    },
    title: {
        fontSize: 16,
    },
    date: {
        fontSize: 14,
        color: '#999999',
    },
});
