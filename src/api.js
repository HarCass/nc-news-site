import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://hc-nc-news-api.onrender.com/api'
});

export const getArticles = (page) => {
    return newsApi.get('/articles', { params: {p: page} })
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

export const patchArticleById = (id, vote) => {
    return newsApi.patch(`/articles/${id}`, vote)
    .then(res => res.data.article);
}

export const getArticleCommentsById = (id, limit) => {
    return newsApi.get(`/articles/${id}/comments`, { params: { limit } })
    .then(res => res.data);
}

export const postCommentToArticleById = (id, comment) => {
    return newsApi.post(`/articles/${id}/comments`, comment)
    .then(res => res.data.comment);
}

export const patchCommentById = (id, vote) => {
    return newsApi.patch(`/comments/${id}`, vote)
    .then(res => res.data.comment);
}