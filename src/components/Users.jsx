import useUsers from "../hooks/useUsers";
import Loading from "./Loading";
import { cardHover, cardHoverEnd } from "../scripts/cardHover";

const Users = () => {
    const {usersData, isLoading} = useUsers();

    return <section className="users-page">
            <h2>Users</h2>
            {isLoading ? <Loading></Loading> : <ul className="users-list">
                {usersData.map(user => <li className="users-item" id={`users-item${user.username}`} key={user.username} tabIndex="0" onMouseEnter={ () => cardHover(`#users-item${user.username}`)} onMouseLeave={() => cardHoverEnd(`#users-item${user.username}`)} >
                    <img src={user.avatar_url} alt={`${user.username} avatar`}></img>
                    <h3>{user.name} aka {user.username}</h3>
                </li>)}    
            </ul>}
        </section>
}

export default Users;