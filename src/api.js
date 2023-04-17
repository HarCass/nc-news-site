import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://hc-nc-news-api.onrender.com/api'
});

export const getArticles = () => {
    return newsApi.get('/articles')
    .then(res => res.data.articles);
}