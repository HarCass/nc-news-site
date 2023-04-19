import { useSearchParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import Loading from "./Loading";
import ArticlesCard from "./ArticlesCard";
import ArticlesSort from "./ArticlesSort";

const Articles = () => {
    const [searchParams, setSearchparams] = useSearchParams();
    const page = searchParams.get('p');
    const { articlesData, totalPages, isLoading } = useArticles(page);

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

    return isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <ArticlesSort></ArticlesSort>
        <ul className="articles-list">
            {articlesData.map(article => {
                return <ArticlesCard article={article} key={article.article_id} ></ArticlesCard>
            })}
        </ul>
        <div className="page-buttons">
            <button onClick={prevPageHandler} disabled={page <= 1}>Prev Page</button>
            <button onClick={nextPageHandler} disabled={page == totalPages}>Next Page</button>
        </div>
    </section>
}

export default Articles;
