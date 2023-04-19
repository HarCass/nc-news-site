import { useParams, useSearchParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import Loading from "./Loading";
import ArticlesCard from "./ArticlesCard";
import PageButtons from "./PageButtons";
import ArticlesSort from "./ArticlesSort";

const Articles = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { topic_name } = useParams();
    const topic = topic_name || searchParams.get('topic');
    const sortBy = searchParams.get('sort_by');
    const order = searchParams.get('order');
    const page = searchParams.get('p');
    const { articlesData, totalPages, isLoading } = useArticles(page, topic, sortBy, order);

    return isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <ArticlesSort topic={topic} sortBy={sortBy} order={order} searchParams={searchParams} setSearchParams={setSearchParams}></ArticlesSort>
        <ul className="articles-list">
            {articlesData.map(article => {
                return <ArticlesCard article={article} key={article.article_id} ></ArticlesCard>
            })}
        </ul>
        <PageButtons page={page} totalPages={totalPages} searchParams={searchParams} setSearchParams={setSearchParams}></PageButtons>
    </section>
}

export default Articles;
