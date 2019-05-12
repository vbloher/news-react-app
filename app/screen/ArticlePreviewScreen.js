import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, Dimensions } from 'react-native';
import { Button, Tile, Icon } from 'react-native-elements/src/index';
import { getDateString } from '../utils';

class ArticlePreviewScreen extends React.Component {
    state = {
        width: '100%',
    };

    componentDidMount() {
        const { width, height } = Dimensions.get("window");

        this.setState({
            width,
        });
    }

    handleLayout = event => {
        this.setState({
            width: event.nativeEvent.layout.width,
        });
    };

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
        const { width } = this.state;
        const article = navigation.getParam('article');

        return (
            <ScrollView
                contentContainerStyle={ {
                    display: 'flex',
                    width: width,
                } }
                onLayout={ this.handleLayout }
            >
                <View>
                    <Tile
                        imageSrc={ { uri: article.img } }
                        title={ article.title }
                        caption={ getDateString(article.date) }
                        onPress={ () => this.onOpenUrl(article.url) }
                        featured
                        imageContainerStyle={{
                            display: 'flex',
                            width: width,
                        }}
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
            </ScrollView>
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
