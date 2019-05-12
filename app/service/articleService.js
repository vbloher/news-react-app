import { AsyncStorage } from 'react-native';
import { API_KEY, ARTICLES_STORAGE_KEY } from '../config/constants';
import { clearImagesDir, downloadFile } from '../utils';

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
    } catch (e) {
        console.log('Cannot read the articles.', e);
        return [];
    }
};

export const downloadArticles = async () => {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&pageSize=30&apiKey=${ API_KEY }`);
        const { articles } = await response.json();

        await clearImagesDir();
        const imagesPromises = articles.map(article => downloadFile(article.urlToImage, article.urlToImage));
        const images = await Promise.all(imagesPromises);

        const result = articles
            .map((article, index) => ({
                img: images[index],
                imgUrl: article.urlToImage,
                title: article.title,
                date: article.publishedAt,
                description: article.description,
                url: article.url,
            }));

        saveArticles(result);

        return result;
    } catch (e) {
        console.log('Cannot get articles from web.', e);
    }
};
