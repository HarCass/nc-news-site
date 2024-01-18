import axios from 'axios';
import { Nullable } from 'vitest';
import { Article, ArticlesResponse, Comment, CommentsResponse, NewArticle, NewComment, NewVote, Topic, User } from '../types';

const newsApi = axios.create({
    baseURL: 'https://hc-nc-news-api.onrender.com/api'
});

export const getArticles = async (p: Nullable<string>, topic: Nullable<string>, sort_by: Nullable<string>, order: Nullable<string>, limit: Nullable<number | 'all'>) => {
    return newsApi.get('/articles', { params: { p, topic, sort_by, order, limit } })
        .then(res => res.data as ArticlesResponse);
}

export const getUsers = async () => {
    return newsApi.get('/users')
        .then(res => res.data.users as User[]);
}

export const getArticleById = async (id: number) => {
    return newsApi.get(`/articles/${id}`)
        .then(res => res.data.article as Article);
}

export const patchArticleById = async (id: number, vote: NewVote) => {
    return newsApi.patch(`/articles/${id}`, vote)
        .then(res => res.data.article as Article);
}

export const getArticleCommentsById = async (id: number, limit: Nullable<number | 'all'>) => {
    return newsApi.get(`/articles/${id}/comments`, { params: { limit } })
        .then(res => res.data as CommentsResponse);
}

export const postCommentToArticleById = async (id: number, comment: NewComment) => {
    return newsApi.post(`/articles/${id}/comments`, comment)
        .then(res => res.data.comment as Comment);
}

export const patchCommentById = async (id: number, vote: NewVote) => {
    return newsApi.patch(`/comments/${id}`, vote)
        .then(res => res.data.comment as Comment);
}

export const getTopics = async () => {
    return newsApi.get('/topics')
        .then(res => res.data.topics as Topic[]);
}

export const delCommentById = async (id: number) => {
    return newsApi.delete(`/comments/${id}`);
}

export const postArticle = async (article: NewArticle) => {
    return newsApi.post('/articles', article)
        .then(res => res.data.article as Article);
}

export const postTopic = async (topic: Topic) => {
    return newsApi.post('/topics', topic)
        .then(res => res.data.topic as Topic);
}

export const delArticleById = async (id: number) => {
    return newsApi.delete(`/articles/${id}`);
}

export const getUserbyId = async (id: string) => {
    return newsApi.get(`/users/${id}`)
        .then(res => res.data.user as User);
}

export const postUser = async (user: User) => {
    return newsApi.post('/users', user)
        .then(res => res.data.user as User);
}

export const getUserCommentsById = async (id: string) => {
    return newsApi.get(`/users/${id}/comments`)
        .then(res => res.data.comments as Comment[]);
}
