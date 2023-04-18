import { useState } from "react";
import { useParams } from "react-router-dom";
import { patchArticleById } from "../api";
import Loading from "./Loading";
import Comments from "./Comments";
import useArticle from "../hooks/useArticle";

const Article = () => {
    const {article_id} = useParams();
    const {articleData, isLoading} = useArticle(article_id);
    const [hasVoted, setHasVoted] = useState(Boolean(localStorage.getItem(`voted${article_id}`)));

    const upvotehandler = () => {
        const vote = {inc_votes: 1};
        articleData.votes += 1;
        localStorage.setItem(`voted${article_id}`, true);
        setHasVoted(Boolean(localStorage.getItem(`voted${article_id}`)));
        patchArticleById(article_id, vote);
    }

    const downvoteHandler = () => {
        const vote = {inc_votes: -1};
        articleData.votes -= 1;
        localStorage.setItem(`voted${article_id}`, true);
        setHasVoted(Boolean(localStorage.getItem(`voted${article_id}`)));
        patchArticleById(article_id, vote);
    }

    return isLoading ? <Loading></Loading> : <section className="article-page">
            <img src={articleData.article_img_url} alt={`${articleData.title} image`}></img>
            <h2>{articleData.title}</h2>
            <p>{articleData.topic}</p>
            <article>{articleData.body}</article>
            <p className="date"> Posted: {Date(articleData.created_at)}</p>
            <div className="article-votes">
                <p style={{color: articleData.votes > 0 ? 'green' : 'red'}}>Votes: {articleData.votes}</p>
                <button onClick={upvotehandler} disabled={hasVoted}>Upvote</button>
                <button onClick={downvoteHandler} disabled={hasVoted}>Downvote</button>
            </div>
            <Comments id={article_id} />
        </section>
}

export default Article;