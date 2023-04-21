import { useState } from "react";
import useTopics from "../hooks/useTopics";
import Loading from "./Loading";
import TopicsCard from "./TopicsCard";
import AddTopic from "./AddTopic";

const Topics = () => {
    const {topicsData, setTopicsData, isLoading} = useTopics();
    const [ isHidden, setIsHidden ] = useState(true);

    return <section className="topics-page">
            <h2>Topics</h2>
            <button onClick={() => setIsHidden(!isHidden)}>{isHidden ? 'Add New Topic' : 'Close Topic Form'}</button>
            {isHidden ? null : <AddTopic setTopicsData={setTopicsData}></AddTopic>}
            {isLoading ? <Loading></Loading> : <ul className="topics-list">
                {topicsData.map(topic => <TopicsCard topic={topic} key={topic.slug}></TopicsCard>)}
                </ul>}
        </section>
}

export default Topics;