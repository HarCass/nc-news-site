import { FC, FormEvent, useState } from "react";
import { postTopic } from "../api";
import { AddTopicProps, Topic } from "../types";
import { Nullable } from "vitest";
import { ApiErrorResponse, ApiError } from "../types";

const AddTopic: FC<AddTopicProps> = ({setTopicsData}) => {
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [hasPosted, setHasPosted] = useState(false);
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);

    const postTopicHandler = (event: FormEvent) => {
        event.preventDefault();
        const topicObj: Topic = {
            slug: slug.toLowerCase(),
            description
        }
        setHasPosted(true);
        postTopic(topicObj)
        .then(topic => {
            setTopicsData(currTopics => [topic, ...currTopics]);
            setSlug('');
            setDescription('');
            setIsError(null);
        })
        .catch((err: ApiErrorResponse) => setIsError(err.response))
        .finally(() => setHasPosted(false));
    }

    return <section className="add-topic" onSubmit={postTopicHandler}>
            <h3>Add A Topic</h3>
            <form className="add-topic-form">
                <label htmlFor="topic-slug">Name</label>
                <input id="topic-slug" value={slug} placeholder="e.g. Coding" onChange={ev => setSlug(ev.target.value)} required></input>
                <label htmlFor="topic-description">Description</label>
                <textarea id="topic-description" value={description} placeholder="Write a description of the new topic here..." onChange={ev => setDescription(ev.target.value)}></textarea>
                <button disabled={hasPosted}>Submit Topic</button>
            </form>
            {isError ? <h3>That Topic Already Exists!</h3> : isError === undefined ? <h3>Something Went Wrong!</h3> : null}

        </section>
}

export default AddTopic;