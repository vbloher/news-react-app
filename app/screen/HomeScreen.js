import React from 'react';
import { ScrollView, ActivityIndicator, View, FlatList } from 'react-native';
import AppHeader from '../components/AppHeader';
import { getDateString } from '../utils';
import { downloadArticles, readArticles } from '../service/articleService';
import { ListItem } from '../components/ListItem';

class HomeScreen extends React.Component {
    state = {
        isLoading: true,
        articles: [],
    };

    static navigationOptions = { header: null };

    async componentDidMount() {
        this.setState({
            isLoading: true,
        });

        let articles = await readArticles();

        if (articles && articles.length === 0) {
            articles = await downloadArticles();
        }

        this.setState({
            isLoading: false,
            articles,
        })
    };

    update = async () => {
        this.setState({
            isLoading: true,
        });

        const articles = await downloadArticles();

        this.setState({
            isLoading: false,
            articles,
        })
    };

    renderItem = ({ item }) => (
        <ListItem
            img={ item.img }
            title={ item.title }
            date={ getDateString(item.date) }
            onPress={ () => {
                this.props.navigation.navigate('ArticlePreview', {
                    article: item,
                });
            } }
        />
    );

    keyExtractor = (article) => article.url;

    render() {
        const { isLoading, articles } = this.state;

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
                        <FlatList
                            data={ articles }
                            renderItem={ this.renderItem }
                            keyExtractor={ this.keyExtractor }
                            initialNumToRender={ 10 }
                            maxToRenderPerBatch={ 10 }
                        />
                    </ScrollView>
                ) }
            </View>
        );
    }
}

export default HomeScreen;
