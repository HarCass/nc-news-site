import { useParams, useSearchParams } from "react-router-dom";
import useTopic from "../hooks/useTopic";
import ArticlesCard from "./ArticlesCard";
import Loading from "./Loading";
import PageButtons from "./PageButtons";

const Topic = () => {
    const { topic_name } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('p');
    const { articlesData, totalPages, isLoading } = useTopic(page, topic_name);

    return <section className="topic-page">
            <h2>{topic_name[0].toUpperCase() + topic_name.slice(1)}</h2>
            {isLoading ? <Loading></Loading> : <ul className="articles-list">
            {articlesData.map(article => {
                return <ArticlesCard article={article} key={article.article_id} ></ArticlesCard>
            })}
            </ul>}
            <PageButtons page={page} totalPages={totalPages} searchParams={searchParams} setSearchParams={setSearchParams}></PageButtons>
        </section>
}

export default Topic;