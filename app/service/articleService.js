import { AsyncStorage } from 'react-native';
import { API_KEY, ARTICLES_STORAGE_KEY } from '../config/constants';

export const saveArticles = async (articles) => {
    try {
        await AsyncStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
        console.log('Cannot save the articles.', e);
    }
};

export const readArticles = async () => {
    try {
        const articles = await AsyncStorage.getItem(ARTICLES_STORAGE_KEY);

        if (articles !== null) {
            return JSON.parse(articles);
        } else {
            return [];
        }
    } catch(e) {
        console.log('Cannot read the articles.', e);
    }
};

export const downloadArticles = async () => {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&pageSize=10&apiKey=${ API_KEY }`);
        const responseJson = await response.json();

        const articles = responseJson.articles
            .map(article => ({
                img: article.urlToImage,
                title: article.title,
                date: article.publishedAt,
                description: article.description,
                url: article.url,
            }));

        saveArticles(articles);

        return articles;
    } catch (e) {
        console.log('Cannot get articles from web.', e);
    }
};
