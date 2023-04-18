import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import { articleCardHover, articleCardHoverEnd } from "../scripts/articleCardHover";
import useArticles from "../hooks/useArticles";

const Articles = () => {
    const [searchParams, setSearchparams] = useSearchParams();
    const [page, setPage] = useState(1);
    const { articlesData, totalPages, isLoading } = useArticles(page);
    const navigate = useNavigate();

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

    const goToArticleHandler = (id) => {
        navigate(`/articles/${id}`);
    }

    return isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <ul className="articles-list">
            {articlesData.map(article => {
                return <li className="articles-item" id={`articles-item${article.article_id}`} key={article.article_id} onClick={ () => goToArticleHandler(article.article_id)} onMouseEnter={ () => articleCardHover(article.article_id)} onMouseLeave={() => articleCardHoverEnd(article.article_id)}>
                    <img src={article.article_img_url} alt={`${article.title} image`}></img>
                    <h3>{article.title}</h3>
                    <p>{article.topic}</p>
                    <p className="date">Posted: {Date(article.created_at)}</p>
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
