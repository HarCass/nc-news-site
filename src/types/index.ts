import { Dispatch, SetStateAction } from "react"
import { SetURLSearchParams } from "react-router-dom"
import { Nullable } from "vitest"

export type Article = {
    author: string,
    title: string,
    article_id: number,
    topic: string,
    created_at: string,
    votes: number,
    article_img_url: string,
    comment_count: string,
    body?: string
}

export type Comment = {
    comment_id: number,
    body: string,
    article_id: number,
    author:string,
    votes: number,
    created_at: string
}

export type Topic = {
    slug: string,
    description: string
}

export type User = {
    username: string,
    name: string,
    avatar_url: string
}

export type ArticlesResponse = {
    articles: Article[],
    total_count: number
}

export type CommentsResponse = {
    comments: Comment[]
}

export type NewArticle = {
    author: string,
    title: string,
    topic: string,
    body: string,
    article_img_url: string
}

export type NewComment = {
    username: string,
    body: string
}

export type NewVote = {
    inc_votes: number
}

export type UserContext = {
    activeUser: Nullable<string>,
    setActiveUser: React.Dispatch<React.SetStateAction<Nullable<string>>>,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type ArticlesParams = {
    page?: Nullable<string>,
    topic?: Nullable<string>,
    sortBy?: Nullable<string>,
    order?: Nullable<string>,
    limit?: Nullable<number>
}

export type ArticlesCardProps = {
    article: Article
}

export type ArticlesSortProps = {
    topic: Nullable<string>,
    sortBy: Nullable<string>,
    order: Nullable<string>,
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
}

export type ArticleVoteProps = {
    articleData: Article
}

export type DelteArticleProps = {
    author: string,
    articleId: number,
    setIsDeleted: Dispatch<SetStateAction<boolean>>
}

export type CommentProps = {
    articleId: number
}

export type CommentCardProps = {
    comment: Comment
}

export type CommentVoteProps = {
    comment: Comment
}

export type CommentFormProps = {
    articleId: number,
    setCommentsData: Dispatch<SetStateAction<Comment[]>>
}

export type DeleteCommentProps = {
    author: string,
    commentId: number,
    setIsDeleted: Dispatch<SetStateAction<boolean>>;
}

export type AddTopicProps = {
    setTopicsData: Dispatch<SetStateAction<Topic[]>>
}

export type TopicsCardProps = {
    topic: Topic
}

export type PageButtonsProps = {
    page: string,
    totalPages: number,
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
}

export type ApiErrorResponse = {
    response: ApiError
}

export type ApiError = {
    status: number,
    data: {
        msg: string
    }
}