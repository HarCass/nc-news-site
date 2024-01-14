import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import Loading from "../components/Loading";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { useContext } from "react";

const User = () => {
    const { activeUser } = useContext(ActiveUserContext)!;
    const { username } = useParams();
    const { userData, isLoading, isError } = useUser(username!);

    return isError ? <h2>{`${isError.status}: ${isError.data.msg}`}</h2> : isLoading ? <Loading></Loading> : <section className="user-page">
            <h2>{`${userData!.username}'s Profile`}</h2>
            <img src={userData!.avatar_url} alt={`${userData!.username} avatar`}></img>
            <h3>{userData!.name}</h3>
            <Link to={`/users/${username}/articles`}>Articles</Link>
            <Link to={`/users/${username}/comments`}>Comments</Link>
            {username === activeUser ? <Link to={`/users/${username}/edit`}>Edit Profile</Link> : null}
    </section>
}

export default User;