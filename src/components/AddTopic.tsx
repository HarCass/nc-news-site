import { FormEvent, useState } from "react";
import { postTopic } from "../api";
import { Topic } from "../types";
import { Nullable } from "vitest";
import { ApiErrorResponse, ApiError } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const AddTopic = () => {
    const client = useQueryClient();
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [hasPosted, setHasPosted] = useState(false);
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);

    const addTopic = useMutation({
        mutationFn: (newTopic: Topic) => postTopic(newTopic),
        onMutate: async (newtopic: Topic) => {
            setIsError(null);
            setHasPosted(true);
            await client.cancelQueries({ queryKey: ['topics'] });
            const prevTopics = client.getQueryData<Topic[]>(['topics']);
            if (prevTopics && !prevTopics.some(topic => newtopic.slug === topic.slug)) {
                client.setQueryData<Topic[]>(['topics'], [
                    ...prevTopics,
                    newtopic
                ])
            }
            return { prevTopics };
        },
        onError: (err: ApiErrorResponse, _variables, context) => {
            if (context?.prevTopics) {
                client.setQueryData<Topic[]>(['topics'], context.prevTopics)
            }
            setIsError(err.response);
        },
        onSuccess: () => {
            setDescription('');
            setSlug('');
            client.invalidateQueries({
                queryKey: ['topics'],
                refetchType: 'inactive'
            });
        },
        onSettled: () => {
            setHasPosted(false);
        }
    })

    const postTopicHandler = (event: FormEvent) => {
        event.preventDefault();
        const topicObj: Topic = {
            slug: slug.toLowerCase(),
            description
        }
        addTopic.mutate(topicObj);
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
        {isError?.status === 400 ? <h3>That Topic Already Exists!</h3> : isError === undefined ? <h3>Something Went Wrong!</h3> : null}
    </section>
}

export default AddTopic;