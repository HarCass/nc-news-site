import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://hc-nc-news-api.onrender.com/api'
});

export const getArticles = (page) => {
    return newsApi.get(`/articles?p=${page}`)
    .then(res => res.data);
}

export const getUsers = () => {
    return newsApi.get('/users')
    .then(res => res.data.users);
}