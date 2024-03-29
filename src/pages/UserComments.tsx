import { Link, useParams } from "react-router-dom";
import useUserComments from "../hooks/useUserComments";
import CommentsCard from "../components/CommentsCard";
import Loading from "../components/Loading";

const UserComments = () => {
    const { username } = useParams();
    const { data: commentsData = [], isLoading, isError, error } = useUserComments(username!);

    return isLoading ? <Loading></Loading> : <section className="user-comments-page">
        <h2>{username}'s Comments</h2>
        {isError ? <h2>{`${error.name}: ${error.message}`}</h2> : <ul className="user-comments-list">
            {commentsData.map(comment => <li key={comment.comment_id} className="user-comments-item">
                <Link to={`/articles/${comment.article_id}`}>View Article</Link>
                <CommentsCard comment={comment}></CommentsCard>
            </li>)}
        </ul>}
    </section>;
}

export default UserComments;