import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";

const Article = () => {
    const [articleData, setArticleData] = useState({});
    const {article_id} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id)
        .then(data => setArticleData(data))
        .then(() => setIsLoading(false));
    }, [])

    return isLoading ? <h3>Loading...</h3> : <section className="article-page">
            <img src={articleData.article_img_url} alt={`${articleData.title} image`}></img>
            <h2>{articleData.title}</h2>
            <article>{articleData.body}</article>
            <div className="article-votes">
                <p style={{color: articleData.votes > 0 ? 'green' : 'red'}}>Votes: {articleData.votes}</p>
                <button>Upvote</button>
                <button>Downvote</button>
            </div>
        </section>
}

export default Article;