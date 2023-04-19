import { useState } from "react";
import formatDate from "../utils/formatDate";
import { patchCommentById } from "../api";

const CommentsCard = ({comment}) => {
    const [hasVoted, setHasVoted] = useState(Boolean(localStorage.getItem(`votedcomment${comment.comment_id}`)));
    const [error, setError] = useState(null);

    const voteHandler = (vote) => {
        const voteObj = {inc_votes: vote};
        comment.votes += vote;
        localStorage.setItem(`votedcomment${comment.comment_id}`, true);
        setHasVoted(Boolean(localStorage.getItem(`votedcomment${comment.comment_id}`)));
        patchCommentById(comment.comment_id, voteObj)
        .then(() => setError(null))
        .catch(err => {
            setError(err);
            localStorage.removeItem(`votedcomment${comment.comment_id}`, true);
            setHasVoted(Boolean(localStorage.getItem(`votedcomment${comment.comment_id}`)));
            comment.votes -= vote;
        });
    }

    return <li className="comments-item" >
    <p className="date">{formatDate(comment.created_at)}</p>
    <article>{comment.body}</article>
    <p>{comment.author}</p>
    <div className="comment-votes">
        <p style={{color: comment.votes > 0 ? 'green' : 'red'}}>votes: {comment.votes}</p>
        <button onClick={() => voteHandler(1)} disabled={hasVoted}>Upvote</button>
        <button onClick={() => voteHandler(-1)} disabled={hasVoted}>Downvote</button>
        {error ? <h4 style={{color: 'black'}}>Something Went Wrong With Your Vote!</h4> : null}
    </div>
</li>
}

export default CommentsCard;