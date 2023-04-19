import { useState } from "react";
import { useParams } from "react-router-dom";
import { patchArticleById } from "../api";
import Loading from "./Loading";
import Comments from "./Comments";
import useArticle from "../hooks/useArticle";
import formatDate from "../utils/formatDate";

const Article = () => {
    const {article_id} = useParams();
    const {articleData, isLoading} = useArticle(article_id);
    const [hasVoted, setHasVoted] = useState(Boolean(localStorage.getItem(`voted${article_id}`)));
    const [error, setError] = useState(null);

    const voteHandler = (vote) => {
        const voteObj = {inc_votes: vote};
        articleData.votes += vote;
        localStorage.setItem(`voted${article_id}`, true);
        setHasVoted(Boolean(localStorage.getItem(`voted${article_id}`)));
        patchArticleById(article_id, voteObj)
        .then(() => setError(null))
        .catch(err => {
            setError(err);
            localStorage.removeItem(`voted${article_id}`, true);
            setHasVoted(Boolean(localStorage.getItem(`voted${article_id}`)));
            articleData.votes -= vote;
        });
    }

    return isLoading ? <Loading></Loading> : <section className="article-page">
            <img src={articleData.article_img_url} alt={`${articleData.title} image`}></img>
            <h2>{articleData.title}</h2>
            <p>{articleData.topic}</p>
            <article>{articleData.body}</article>
            <p className="date"> Posted: {formatDate(articleData.created_at)}</p>
            <div className="article-votes">
                <p style={{color: articleData.votes > 0 ? 'green' : 'red'}}>Votes: {articleData.votes}</p>
                <button onClick={() => voteHandler(1)} disabled={hasVoted}>Upvote</button>
                <button onClick={() => voteHandler(-1)} disabled={hasVoted}>Downvote</button>
                {error ? <h4 style={{color: 'black'}}>Something Went Wrong With Your Vote!</h4> : null}
            </div>
            <Comments id={article_id} />
        </section>
}

export default Article;