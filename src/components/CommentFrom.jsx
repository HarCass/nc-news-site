import { useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { postCommentToArticleById } from "../api";

const CommentForm = ({id, setCommentsData}) => {
    const {activeUser, isLoggedIn} = useContext(ActiveUserContext);
    const [body, setBody] = useState('');
    const [hasPosted, setHasPosted] = useState(false);

    const postCommentHandler = (event) => {
        event.preventDefault()
        const commentObj = {
            "username": activeUser,
            "body": body
        }
        setBody('');
        setHasPosted(true);
        postCommentToArticleById(id, commentObj)
        .then(comment => setCommentsData(currComments => {
            return [comment, ...currComments];
        }));
    }

    return hasPosted ? <div><h4>Comment Posted!</h4><button onClick={() => setHasPosted(false)}>Post Another Comment</button></div> : <form className="comment-form" onSubmit={postCommentHandler}>
        <textarea required placeholder={'Write your comment here...'} value={body} onChange={event => setBody(event.target.value)}></textarea>
        <button disabled={!isLoggedIn}>{isLoggedIn ? 'Submit' : 'Login To Post'}</button>
    </form>
}

export default CommentForm;