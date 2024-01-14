import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import Loading from "../components/Loading";

const User = () => {
    const { username } = useParams();
    const { userData, isLoading, isError } = useUser(username!);

    return isError ? <h2>{`${isError.status}: ${isError.data.msg}`}</h2> : isLoading ? <Loading></Loading> : <section className="user-page">
            <h2>{`${userData!.username}'s Profile`}</h2>
            <img src={userData!.avatar_url} alt={`${userData!.username} avatar`}></img>
            <h3>{userData!.name}</h3>
            <Link to={`/users/${username}/articles`}>Articles</Link>
            <Link to={`/users/${username}/comments`}>Comments</Link>
            <Link to={`/users/${username}/edit`}>Edit Profile</Link>
    </section>
}

export default User;