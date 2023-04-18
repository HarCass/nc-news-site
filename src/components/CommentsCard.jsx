import formatDate from "../utils/formatDate";

const CommentsCard = ({comment}) => {
    return <li className="comments-item" >
    <p className="date">{formatDate(comment.created_at)}</p>
    <article>{comment.body}</article>
    <p>{comment.author}</p>
    <div className="comment-votes">
        <p style={{color: comment.votes > 0 ? 'green' : 'red'}}>votes: {comment.votes}</p>
        <button>Upvote</button>
        <button>Downvote</button>
    </div>
</li>
}

export default CommentsCard;