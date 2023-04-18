import { useState } from "react";
import useComments from "../hooks/useComments";
import Loading from "./Loading";
import formatDate from "../utils/formatDate";

const Comments = ({id}) => {
    const [limit, setLimit] = useState(null);
    const { commentsData, totalComments, isLoading } = useComments(id, limit);
    const [isHidden, setIsHidden] = useState(false);

    return <section className="article-comments">
            <h3>Comments</h3>
            {isLoading ? <Loading></Loading> : isHidden ? null : totalComments === 0 ? <h4>No Comments Yet!</h4> : <ul className="comments-list">
                {commentsData.map(comment => <li className="comments-item" key={comment.comment_id}>
                    <p className="date">{formatDate(comment.created_at)}</p>
                    <article>{comment.body}</article>
                    <p>{comment.author}</p>
                    <div className="comment-votes">
                        <p style={{color: comment.votes > 0 ? 'green' : 'red'}}>votes: {comment.votes}</p>
                        <button>Upvote</button>
                        <button>Downvote</button>
                    </div>
                </li>)}
            </ul>}
            { limit === 'all' || limit >= totalComments ? null : <button onClick={() => setLimit('all')}>Load More</button>}
            <button onClick={ () => setIsHidden(currIsHidden => !currIsHidden)}>{isHidden ? 'Show': 'Hide'} All</button>
        </section>
}

export default Comments;
