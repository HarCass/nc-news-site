import { useParams } from "react-router-dom";
import Articles from "./Articles";

const Topic = () => {
    const { topic_name } = useParams();

    return <section className="topic-page">
        <h2>{topic_name[0].toUpperCase() + topic_name.slice(1)}</h2>
        <Articles></Articles>
    </section>
}

export default Topic;