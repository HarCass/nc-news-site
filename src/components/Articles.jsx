import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import Loading from "./Loading";
import ArticlesCard from "./ArticlesCard";
import PageButtons from "./PageButtons";
import ArticlesSort from "./ArticlesSort";
import { useContext } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";

const Articles = () => {
    const navigate = useNavigate();
    const {activeUser, isLoggedIn} = useContext(ActiveUserContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const { topic_name } = useParams();
    const topic = topic_name || searchParams.get('topic');
    const sortBy = searchParams.get('sort_by');
    const order = searchParams.get('order');
    const page = searchParams.get('p');
    const { articlesData, totalPages, isLoading, isError } = useArticles(page, topic, sortBy, order);

    return isError ? <h2>{`${isError.status}: ${isError.data.msg}`}</h2> : isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <button className="articles-contribute" disabled={!isLoggedIn} onClick={() => navigate(`/users/${activeUser}/contribute`)}>{isLoggedIn ? 'Contribute' : 'Login to Contribute'}</button>
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
