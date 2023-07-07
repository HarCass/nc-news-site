import { Link, useNavigate, useParams } from "react-router-dom";
import useUserComments from "../hooks/useUserComments";
import CommentsCard from "../components/CommentsCard";
import Loading from "../components/Loading";

const UserComments = () => {
    const { username } = useParams();
    const { commentsData, isLoading, isError } = useUserComments(username);
    const navigate = useNavigate();

    const goToArticle = (articleId) => {
        navigate(`/articles/${articleId}`);
    }

    return isLoading ? <Loading></Loading> : <section className="user-comments-page">
        <h2>{username}'s Comments</h2>
        {isError ? <h2>{`${isError.status}: ${isError.data.msg}`}</h2> : <ul className="user-comments-list">
            {commentsData.map(comment => <li key={comment.comment_id} className="user-comments-item">
                <Link to={`/articles/${comment.article_id}`}>View Article</Link>
                <CommentsCard comment={comment}></CommentsCard>
                </li>)}
            </ul>}
    </section>;
}

export default UserComments;