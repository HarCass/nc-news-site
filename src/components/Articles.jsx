import { useSearchParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import Loading from "./Loading";
import ArticlesCard from "./ArticlesCard";
import PageButtons from "./PageButtons";

const Articles = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('p');
    const { articlesData, totalPages, isLoading } = useArticles(page);

    return isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <ul className="articles-list">
            {articlesData.map(article => {
                return <ArticlesCard article={article} key={article.article_id} ></ArticlesCard>
            })}
        </ul>
        <PageButtons page={page} totalPages={totalPages} searchParams={searchParams} setSearchParams={setSearchParams}></PageButtons>
    </section>
}

export default Articles;
