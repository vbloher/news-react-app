import React from 'react';
import { ScrollView, View, FlatList, RefreshControl } from 'react-native';
import { getDateString } from '../utils';
import { downloadArticles, readArticles } from '../service/articleService';
import { ListItem } from '../components/ListItem';

class HomeScreen extends React.Component {
    state = {
        isLoading: true,
        articles: [],
    };

    static navigationOptions = {
        title: 'Mega News',
    };

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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={ isLoading }
                            onRefresh={ this.update }
                        />
                    }
                >
                    <FlatList
                        data={ articles }
                        renderItem={ this.renderItem }
                        keyExtractor={ this.keyExtractor }
                        initialNumToRender={ 10 }
                        maxToRenderPerBatch={ 10 }
                    />
                </ScrollView>
            </View>
        );
    }
}

export default HomeScreen;
