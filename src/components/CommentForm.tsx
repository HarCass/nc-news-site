import { FC, FormEventHandler, useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { postCommentToArticleById } from "../api";
import { ApiError, CommentFormProps, ApiErrorResponse, NewComment } from "../types";
import { Nullable } from "vitest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CommentForm: FC<CommentFormProps> = ({ articleId }) => {
    const client = useQueryClient();
    const { activeUser, isLoggedIn } = useContext(ActiveUserContext)!;
    const [body, setBody] = useState('');
    const [hasPosted, setHasPosted] = useState(false);
    const [error, setError] = useState<Nullable<ApiError>>(null);

    const addComment = useMutation({
        mutationFn: ({ id, newComment }: { id: number, newComment: NewComment }) => postCommentToArticleById(id, newComment),
        onMutate: async () => {
            setHasPosted(true);
            await client.cancelQueries({ queryKey: ['comments'] });
            const prevComments = client.getQueryData<Comment[]>(['comments']);
            return { prevComments }
        },
        onError: (err: ApiErrorResponse) => {
            setError(err.response);
        },
        onSuccess: async () => {
            setBody('');
            client.invalidateQueries({
                queryKey: ['comments']
            });
        },
        onSettled: () => {
            setHasPosted(false);
        }
    })

    const postCommentHandler: FormEventHandler = (event) => {
        event.preventDefault();

        const commentObj: NewComment = {
            "username": activeUser!,
            "body": body
        };

        addComment.mutate({id: articleId, newComment: commentObj});
    }

    return hasPosted ? <div>
        {error ? <h4>Something Went Wrong!</h4> : <h4>Comment Posted!</h4>}<button onClick={() => {
            setHasPosted(false)
            setError(null);
        }}>Post Another Comment</button>
    </div> : <form className="comment-form" onSubmit={postCommentHandler}>
        <textarea required placeholder={'Write your comment here...'} value={body} onChange={event => setBody(event.target.value)}></textarea>
        <button disabled={!isLoggedIn}>{isLoggedIn ? 'Submit' : 'Login To Post'}</button>
    </form>
}

export default CommentForm;