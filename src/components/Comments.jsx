import { useState } from "react";
import useComments from "../hooks/useComments";
import Loading from "./Loading";
import CommentsCard from "./CommentsCard";
import CommentForm from "./CommentFrom";

const Comments = ({id}) => {
    const [limit, setLimit] = useState(null);
    const { commentsData, setCommentsData, totalComments, isLoading } = useComments(id, limit);
    const [isHidden, setIsHidden] = useState(false);

    return <section className="article-comments">
            <h3>Comments</h3>
            <CommentForm id={id} setCommentsData={setCommentsData} ></CommentForm>
            {isLoading ? <Loading></Loading> : isHidden ? null : totalComments === 0 ? <h4>No Comments Yet!</h4> : <ul className="comments-list">
                {commentsData.map(comment => <CommentsCard key={comment.comment_id} comment={comment} ></CommentsCard>)}
            </ul>}
            { limit === 'all' || limit >= totalComments ? null : <button onClick={() => setLimit('all')}>Load More</button>}
            <button onClick={ () => setIsHidden(currIsHidden => !currIsHidden)}>{isHidden ? 'Show': 'Hide'} All</button>
        </section>
}

export default Comments;
