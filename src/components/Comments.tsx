import { FC, useState } from "react";
import useComments from "../hooks/useComments";
import Loading from "./Loading";
import CommentsCard from "./CommentsCard";
import CommentForm from "./CommentForm";
import { CommentProps } from "../types";
import { Nullable } from "vitest";

const Comments: FC<CommentProps> = ({ articleId }) => {
    const [limit, setLimit] = useState<Nullable<number | 'all'>>(null);
    const { data: { comments = [] } = {}, isLoading } = useComments(articleId, limit);
    const [isHidden, setIsHidden] = useState(false);

    return <section className="article-comments">
        <h3>Comments</h3>
        <CommentForm articleId={articleId} setCommentsData={() => { }} ></CommentForm>
        {isLoading ? <Loading></Loading> : isHidden ? null : comments.length === 0 ? <h4>No Comments Yet!</h4> : <ul className="comments-list">
            {comments.map(comment => <li key={comment.comment_id}>
                <CommentsCard comment={comment} ></CommentsCard>
            </li>)}
        </ul>}
        {isHidden ? null : limit === 'all' || comments.length < 10 ? null : <button onClick={() => setLimit('all')}>Load More</button>}
        <button className="hide-comments" onClick={() => setIsHidden(currIsHidden => !currIsHidden)}>{isHidden ? 'Show' : 'Hide'} All</button>
    </section>
}

export default Comments;
