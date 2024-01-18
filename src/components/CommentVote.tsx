import { FC, useState } from "react";
import { patchCommentById } from "../api";
import { ApiError, ApiErrorResponse, CommentVoteProps } from "../types";
import { Nullable } from "vitest";
import { useQueryClient } from "@tanstack/react-query";

const CommentVote: FC<CommentVoteProps> = ({ comment }) => {
    const client = useQueryClient();
    const upvoteStorage = `upvotedcomment${comment.comment_id}`;
    const downvoteStorage = `downvotedcomment${comment.comment_id}`;
    const [hasUpvoted, setHasUpvoted] = useState(Boolean(localStorage.getItem(upvoteStorage)));
    const [hasDownvoted, setHasDownvoted] = useState(Boolean(localStorage.getItem(downvoteStorage)))
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);

    const voteHandler = (vote: number) => {
        if (hasUpvoted || hasDownvoted) vote *= 2;
        const voteObj = { inc_votes: vote };
        comment.votes += vote;
        if (vote < 0) {
            localStorage.setItem(downvoteStorage, 'true');
            localStorage.removeItem(upvoteStorage);
            setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
            setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
            patchCommentById(comment.comment_id, voteObj)
                .then(() => {
                    setIsError(null)
                    client.invalidateQueries({
                        queryKey: ['comments'],
                        refetchType: 'inactive'
                    })
                })
                .catch((err: ApiErrorResponse) => {
                    setIsError(err.response);
                    localStorage.removeItem(downvoteStorage);
                    setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
                    comment.votes -= vote;
                });
        } else {
            localStorage.setItem(upvoteStorage, 'true');
            localStorage.removeItem(downvoteStorage);
            setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
            setHasDownvoted(Boolean(localStorage.getItem(downvoteStorage)));
            patchCommentById(comment.comment_id, voteObj)
                .then(() => {
                    setIsError(null)
                    client.invalidateQueries({
                        queryKey: ['comments'],
                        refetchType: 'inactive'
                    })
                })
                .catch((err: ApiErrorResponse) => {
                    setIsError(err.response);
                    localStorage.removeItem(upvoteStorage);
                    setHasUpvoted(Boolean(localStorage.getItem(upvoteStorage)));
                    comment.votes -= vote;
                });
        }
    }

    return <div className="comment-votes">
        <p style={{ color: comment.votes > -1 ? 'green' : 'red' }}>{comment.votes} {comment.votes > -1 ? <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> : <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>}</p>
        <button className="upvote" onClick={() => voteHandler(1)} disabled={hasUpvoted}>Upvote</button>
        <button className="downvote" onClick={() => voteHandler(-1)} disabled={hasDownvoted}>Downvote</button>
        {isError ? <h4>Something Went Wrong With Your Vote!</h4> : null}
    </div>
}

export default CommentVote;