import { useState } from "react";
import formatDate from "../utils/formatDate";
import { patchCommentById } from "../api";
import DeleteComment from "../components/DeleteComment";

const CommentsCard = ({comment}) => {
    const [hasVoted, setHasVoted] = useState(Boolean(localStorage.getItem(`votedcomment${comment.comment_id}`)));
    const [isError, setIsError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);

    const voteHandler = (vote) => {
        const voteObj = {inc_votes: vote};
        comment.votes += vote;
        localStorage.setItem(`votedcomment${comment.comment_id}`, true);
        setHasVoted(Boolean(localStorage.getItem(`votedcomment${comment.comment_id}`)));
        patchCommentById(comment.comment_id, voteObj)
        .then(() => setIsError(null))
        .catch(err => {
            setError(err);
            localStorage.removeItem(`votedcomment${comment.comment_id}`, true);
            setHasVoted(Boolean(localStorage.getItem(`votedcomment${comment.comment_id}`)));
            comment.votes -= vote;
        });
    }

    return <li className="comments-item" > {isDeleted ? <h3>Comment Deleted</h3> : <div className="comment-info">
            <p className="date">{formatDate(comment.created_at)}</p>
            <article>{comment.body}</article>
            <p>{comment.author}</p>
            <div className="comment-votes">
                <p style={{color: comment.votes > 0 ? 'green' : 'red'}}>votes: {comment.votes}</p>
                <button onClick={() => voteHandler(1)} disabled={hasVoted}>Upvote</button>
                <button onClick={() => voteHandler(-1)} disabled={hasVoted}>Downvote</button>
                {isError ? <h4 style={{color: 'black'}}>Something Went Wrong With Your Vote!</h4> : null}
            </div>
            <DeleteComment author={comment.author} commentId={comment.comment_id} setIsDeleted={setIsDeleted}></DeleteComment>
        </div>}
</li>
}

export default CommentsCard;