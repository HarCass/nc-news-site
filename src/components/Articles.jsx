import { useEffect, useState } from "react";
import { getArticles } from "../api";
import Loading from "./Loading";

const Articles = () => {
    const [articlesData, setArticlesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticles()
        .then(data => setArticlesData(data))
        .then(() => setIsLoading(false));
    }, []);

    return isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <ul className="articles-list">
            {articlesData.map(article => {
                return <li className="articles-item" key={article.article_id}>
                    <img src={article.article_img_url} alt={`${article.title} image`}></img>
                    <h3>{article.title}</h3>
                </li>
            })}
        </ul>
    </section>
}

export default Articles;
