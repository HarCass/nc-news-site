import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import { articleCardHover, articleCardHoverEnd } from "../scripts/articleCardHover";
import useArticles from "../hooks/useArticles";

const Articles = () => {
    const [searchParams, setSearchparams] = useSearchParams();
    const page = searchParams.get('p');
    const { articlesData, totalPages, isLoading } = useArticles(page);
    const navigate = useNavigate();

    const nextPageHandler = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        const newParams = new URLSearchParams(searchParams);
        const newPage = page ? Number(page) + 1 : 2;
        newParams.set('p', newPage);
        setSearchparams(newParams);
    }

    const prevPageHandler = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        const newParams = new URLSearchParams(searchParams);
        newParams.set('p', Number(page) - 1);
        setSearchparams(newParams);
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
            <button onClick={prevPageHandler} disabled={page <= 1}>Prev Page</button>
            <button onClick={nextPageHandler} disabled={page == totalPages}>Next Page</button>
        </div>
    </section>
}

export default Articles;
