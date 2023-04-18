import useTopics from "../hooks/useTopics";
import Loading from "./Loading";
import TopicsCard from "./TopicsCard";

const Topics = () => {
    const {topicsData, isLoading} = useTopics();

    return <section className="topics-page">
            <h2>Topics</h2>
            {isLoading ? <Loading></Loading> : <ul className="topics-list">
                {topicsData.map(topic => <TopicsCard topic={topic} key={topic.slug}></TopicsCard>)}
                </ul>}
        </section>
}

export default Topics;