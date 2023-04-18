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

export const getArticleById = (id) => {
    return newsApi.get(`/articles/${id}`)
    .then(res => res.data.article);
}

export const patchArticleById = (id, data) => {
    return newsApi.patch(`/articles/${id}`, data)
    .then(res => res.data.article);
}

export const getArticleCommentsById = (id) => {
    return newsApi.get(`/articles/${id}/comments`)
    .then(res => res.data.comments);
}