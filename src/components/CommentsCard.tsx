import { FC, useState } from "react";
import formatDate from "../utils/formatDate";
import DeleteComment from "./DeleteComment";
import CommentVote from "./CommentVote";
import { CommentCardProps } from "../types";

const CommentsCard: FC<CommentCardProps> = ({ comment }) => {
    const [isDeleted, setIsDeleted] = useState(false);

    return <div className="comments-item" > {isDeleted ? <h3>Comment Deleted</h3> :
        <div className="comment-info">
            <p>{comment.author}</p>
            <article>{comment.body}</article>
            <p className="date">{formatDate(comment.created_at)}</p>
            <CommentVote comment={comment}></CommentVote>
            <DeleteComment author={comment.author} commentId={comment.comment_id} setIsDeleted={setIsDeleted}></DeleteComment>
        </div>}
    </div>
}

export default CommentsCard;