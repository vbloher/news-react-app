import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Button, Tile, Icon } from 'react-native-elements/src/index';
import { getDateString } from '../utils';

class ArticlePreviewScreen extends React.Component {
    onOpenUrl = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log(`Don't know how to open URI: ${ url }`);
            }
        });
    };

    render() {
        const { navigation } = this.props;
        const article = navigation.getParam('article');

        return (
            <View>
                <Tile
                    imageSrc={ { uri: article.img } }
                    title={ article.title }
                    caption={ getDateString(article.date) }
                    featured
                />
                <Text style={ styles.description }>
                    { article.description }
                </Text>
                <Button
                    outline
                    icon={
                        <Icon
                            name='md-open'
                            type='ionicon'
                            color='#fff'
                        />
                    }
                    titleStyle={ {
                        paddingLeft: 5,
                        fontSize: 16,
                    } }
                    title='Read full article'
                    onPress={ () => this.onOpenUrl(article.url) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        fontSize: 16,
        padding: 15,
    },
});

export default ArticlePreviewScreen;
