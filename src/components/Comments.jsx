import useComments from "../hooks/useComments";
import Loading from "./Loading";

const Comments = ({id}) => {
    const { commentsData, isLoading } = useComments(id); 

    return <section className="article-comments">
            <h3>Comments</h3>
            {isLoading ? <Loading></Loading> : <ul className="comments-list">
                {commentsData.map(comment => <li className="comments-item" key={comment.comment_id}>
                    <p className="date">{Date(comment.created_at)}</p>
                    <article>{comment.body}</article>
                    <p>{comment.author}</p>
                    <div className="comment-votes">
                        <p style={{color: comment.votes > 0 ? 'green' : 'red'}}>votes: {comment.votes}</p>
                        <button>Upvote</button>
                        <button>Downvote</button>
                    </div>
                </li>)}
            </ul>}
        </section>
}

export default Comments;
