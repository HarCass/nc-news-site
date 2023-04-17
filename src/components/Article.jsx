import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticleById } from "../api";
import Loading from "./Loading";
import Comments from "./Comments";

const Article = () => {
    const [articleData, setArticleData] = useState({});
    const {article_id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasVoted, setHasVoted] = useState(false);

    const upvotehandler = () => {
        const vote = {inc_votes: 1};
        setHasVoted(true);
        setArticleData(currData => {
            const dataCopy = {...currData};
            dataCopy.votes += 1;
            return dataCopy;
        });
        patchArticleById(article_id, vote);
    }

    const downvoteHandler = () => {
        const vote = {inc_votes: -1};
        setHasVoted(true);
        setArticleData(currData => {
            const dataCopy = {...currData};
            dataCopy.votes -= 1;
            return dataCopy;
        });
        patchArticleById(article_id, vote);
    }

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id)
        .then(data => setArticleData(data))
        .then(() => setIsLoading(false));
    }, [])

    return isLoading ? <Loading></Loading> : <section className="article-page">
            <img src={articleData.article_img_url} alt={`${articleData.title} image`}></img>
            <h2>{articleData.title}</h2>
            <p className="date"> Posted: {Date(articleData.created_at)}</p>
            <article>{articleData.body}</article>
            <div className="article-votes">
                <p style={{color: articleData.votes > 0 ? 'green' : 'red'}}>Votes: {articleData.votes}</p>
                <button onClick={upvotehandler} disabled={hasVoted}>Upvote</button>
                <button onClick={downvoteHandler} disabled={hasVoted}>Downvote</button>
            </div>
            <Comments id={article_id} />
        </section>
}

export default Article;