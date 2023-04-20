import { useState } from "react";
import { patchCommentById } from "../api";

const CommentVote = ({comment}) => {
    const upvoteStorage = `upvotedcomment${comment.comment_id}`;
    const downvoteStorage = `downvotedcomment${comment.comment_id}`;
    const [hasUpvoted, setHasUpvoted] = useState(Boolean(localStorage.getItem(upvoteStorage)));
    const [hasDownvoted, setHasDownvoted] = useState(Boolean(localStorage.getItem(downvoteStorage)))
    const [isError, setIsError] = useState(null);

    const voteHandler = (vote) => {
        if(hasUpvoted || hasDownvoted) vote *= 2;
        const voteObj = {inc_votes: vote};
        comment.votes += vote;
        if (vote < 0) {
            localStorage.setItem(downvoteStorage, true);
            localStorage.removeItem(upvoteStorage);
            setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
            setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
            patchCommentById(comment.comment_id, voteObj)
            .then(() => setIsError(null))
            .catch(err => {
                setError(err);
                localStorage.removeItem(downvoteStorage, true);
                setHasVoted(Boolean(localStorage.getItem(downvoteStorage)));
                comment.votes -= vote;
            });
        } else {
            localStorage.setItem(upvoteStorage, true);
            localStorage.removeItem(downvoteStorage);
            setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
            setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
            patchCommentById(comment.comment_id, voteObj)
            .then(() => setIsError(null))
            .catch(err => {
                setError(err);
                localStorage.removeItem(upvoteStorage, true);
                setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
                comment.votes -= vote;
            });
        }
    }

    return <div className="comment-votes">
        <p style={{color: comment.votes > 0 ? 'green' : 'red'}}>votes: {comment.votes}</p>
        <button onClick={() => voteHandler(1)} disabled={hasUpvoted}>Upvote</button>
        <button onClick={() => voteHandler(-1)} disabled={hasDownvoted}>Downvote</button>
        {isError ? <h4>Something Went Wrong With Your Vote!</h4> : null}
    </div>
}

export default CommentVote;