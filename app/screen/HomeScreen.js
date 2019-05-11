import React from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import { ListItem } from 'react-native-elements';
import { getDateString } from '../utils';
import { downloadArticles, readArticles } from '../service/articleService';

class HomeScreen extends React.Component {
    state = {
        isLoading: true,
        articles: [],
    };

    static navigationOptions = { header: null };

    async componentDidMount() {
        await this.update();
    };

    update = async () => {
        this.setState({
            isLoading: true,
        });

        let articles = await readArticles();

        if (articles.length === 0) {
            articles = await downloadArticles();
        }

        this.setState({
            isLoading: false,
            articles,
        })
    };

    render() {
        const { navigation } = this.props;
        const { isLoading, articles } = this.state;

        const articleItems = articles.map((article, index) => (
            <ListItem
                key={ index }
                title={ article.title }
                subtitle={ getDateString(article.date) }
                leftAvatar={ { source: { uri: article.img } } }
                onPress={() => {
                    navigation.navigate('ArticlePreview', {
                        article: article,
                    });
                }}
            />
        ));

        return (
            <View>
                <AppHeader
                    onUpdate={ this.update }
                />

                { isLoading ? (
                    <ActivityIndicator
                        size="large"
                    />
                ) : (
                    <ScrollView>
                        <View>
                            { articleItems }
                        </View>
                    </ScrollView>
                ) }
            </View>
        );
    }
}

export default HomeScreen;
