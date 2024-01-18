import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import useUsers from "../hooks/useUsers";
import { Link } from "react-router-dom";
import LatestArticles from "../components/LatestArticles";

const Home = () => {
    const { activeUser, setActiveUser, isLoggedIn, setIsLoggedIn } = useContext(ActiveUserContext)!;
    const [chosenUser, setChosenUser] = useState<string>('');
    const { data: usersData = [] } = useUsers();

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        if (usersData.find(({ username }) => username === chosenUser)) {
            setActiveUser(chosenUser);
            localStorage.setItem('activeUser', chosenUser);
            setIsLoggedIn(true);
        }
    }

    const logoutHandler = () => {
        setActiveUser(null);
        localStorage.removeItem('activeUser');
        setIsLoggedIn(false);
        localStorage.clear();
    }

    const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const newUser = event.target.value;
        setChosenUser(newUser);
    }

    return <section className="home">
        <h2>Welcome to NC News</h2>
        <p>For the purposes of this site login by selecting one of the users below, thank you!</p>
        <form onSubmit={loginHandler}>
            <label htmlFor="user-selector">Username</label>
            <select id="user-selector" required onChange={selectChangeHandler}>
                <option>Select User...</option>
                {usersData.map(({ username }) => <option key={username} value={username}>{username}</option>)}
            </select>
            <button disabled={isLoggedIn}>Login</button>
        </form>
        <button disabled={!isLoggedIn} onClick={logoutHandler}>Logout</button>
        {isLoggedIn ? <h3>Welcome {activeUser}!</h3> : null}
        {isLoggedIn ? null : <Link to="/signup">Or Sign Up Here!</Link>}
        <h3>Latest Articles</h3>
        <LatestArticles></LatestArticles>
    </section>
}

export default Home;
