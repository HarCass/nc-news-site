import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://hc-nc-news-api.onrender.com/api'
});

export const getArticles = () => {
    
}

export const getArticleById = (id) => {
    return newsApi.get(`/articles/${id}`)
    .then(res => res.data.article);
}