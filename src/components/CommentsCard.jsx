import { useState } from "react";
import formatDate from "../utils/formatDate";
import DeleteComment from "../components/DeleteComment";
import CommentVote from "./CommentVote";

const CommentsCard = ({comment}) => {
    const [isDeleted, setIsDeleted] = useState(false);

    return <li className="comments-item" > {isDeleted ? <h3>Comment Deleted</h3> : <div className="comment-info">
            <p className="date">{formatDate(comment.created_at)}</p>
            <article>{comment.body}</article>
            <p>{comment.author}</p>
            <CommentVote comment={comment}></CommentVote>
            <DeleteComment author={comment.author} commentId={comment.comment_id} setIsDeleted={setIsDeleted}></DeleteComment>
        </div>}
</li>
}

export default CommentsCard;