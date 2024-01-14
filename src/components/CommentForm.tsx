import { FC, FormEventHandler, useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { postCommentToArticleById } from "../api";
import { ApiError, CommentFormProps, ApiErrorResponse, NewComment } from "../types";
import { Nullable } from "vitest";

const CommentForm: FC<CommentFormProps> = ({articleId, setCommentsData}) => {
    const {activeUser, isLoggedIn} = useContext(ActiveUserContext)!;
    const [body, setBody] = useState('');
    const [hasPosted, setHasPosted] = useState(false);
    const [error, setError] = useState<Nullable<ApiError>>(null);

    const postCommentHandler: FormEventHandler = (event) => {
        event.preventDefault()
        const commentObj: NewComment = {
            "username": activeUser!,
            "body": body
        }
        setBody('');
        setHasPosted(true);
        postCommentToArticleById(articleId, commentObj)
        .then(comment => setCommentsData(currComments => {
             return [comment, ...currComments];
        }))
        .catch((err: ApiErrorResponse) => {
            setError(err.response);
        });
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