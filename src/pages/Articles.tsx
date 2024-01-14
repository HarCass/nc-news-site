import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import ArticlesCard from "../components/ArticlesCard";
import PageButtons from "../components/PageButtons";
import ArticlesSort from "../components/ArticlesSort";
import { useContext } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import useArticles from "../hooks/useArticles";

const Articles = () => {
    const navigate = useNavigate();
    const {activeUser, isLoggedIn} = useContext(ActiveUserContext)!;
    const [searchParams, setSearchParams] = useSearchParams();
    const { topic_name } = useParams();
    const topic = topic_name || searchParams.get('topic');
    const sortBy = searchParams.get('sort_by');
    const order = searchParams.get('order');
    const page = searchParams.get('p');
    const {data:{articles = [], total_count = 1} = {}, isLoading, isError, error} = useArticles({page, topic, sortBy, order});

    return isError ? <h2>{`${error.name}: ${error.message}`}</h2> : isLoading ? <Loading/> : <section className="articles-page">
        <h2>Articles</h2>
        <button className="articles-contribute" disabled={!isLoggedIn} onClick={() => navigate(`/users/${activeUser}/contribute`)}>{isLoggedIn ? 'Contribute' : 'Login to Contribute'}</button>
        <ArticlesSort topic={topic} sortBy={sortBy} order={order} searchParams={searchParams} setSearchParams={setSearchParams}></ArticlesSort>
        <ul className="articles-list">
            {articles.map(article => {
                return <ArticlesCard article={article} key={article.article_id} ></ArticlesCard>
            })}
        </ul>
        <PageButtons page={page!} totalPages={Math.ceil(total_count/10)} searchParams={searchParams} setSearchParams={setSearchParams}></PageButtons>
    </section>
}

export default Articles;
