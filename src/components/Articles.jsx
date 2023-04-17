import { useEffect, useState } from "react";
import { getArticles } from "../api";
import Loading from "./Loading";

const Articles = () => {
    const [articlesData, setArticlesData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const nextPageHandler = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setPage(currPage => currPage + 1);
    }

    const prevPageHandler = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setPage(currPage => currPage - 1);
    }

    useEffect(() => {
        setIsLoading(true);
        getArticles(page)
        .then(({articles, total_count}) => {
            setArticlesData(articles)
            setTotalPages(Math.ceil(total_count / 10));
        })
        .then(() => setIsLoading(false));
    }, [page]);

    return isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <ul className="articles-list">
            {articlesData.map(article => {
                return <li className="articles-item" key={article.article_id}>
                    <img src={article.article_img_url} alt={`${article.title} image`}></img>
                    <h3>{article.title}</h3>
                    <p>Posted: {Date(article.created_at)}</p>
                </li>
            })}
        </ul>
        <div className="page-buttons">
            {page > 1 ? <button onClick={prevPageHandler}>Prev Page</button> : <p></p>}
            {page === totalPages ? <p></p> : <button onClick={nextPageHandler}>Next Page</button>}
        </div>
    </section>
}

export default Articles;
