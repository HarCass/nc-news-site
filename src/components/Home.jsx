import { useContext, useEffect, useState } from "react";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { getUsers } from "../api";

const Home = () => {
    const [chosenUser, setChosenUser] = useState('');
    const [usersData, setUsersData] = useState([]);
    const {activeUser, setActiveUser, isLoggedIn , setIsLoggedIn} = useContext(ActiveUserContext);

    const loginHandler = (event) => {
        event.preventDefault();
        if (usersData.find(({username}) => username ===  chosenUser)) {
            setActiveUser(chosenUser);
            setIsLoggedIn(true);
        }
    }

    const selectChangeHandler = (event) => {
        const newUser = event.target.value;
        setChosenUser(newUser);
    }

    useEffect(() => {
        getUsers()
        .then(data => setUsersData(data));
    });

    return <section className="home">
        <h2>Welcome to NC News</h2>
        <p>For the purposes of this site login by slecting one of the users below, thank you!</p>
        <form onSubmit={loginHandler}>
            <label htmlFor="user-selector">Username</label>
            <select id="user-selector" required onChange={selectChangeHandler}>
                <option>Select User...</option>
                {usersData.map(({username}) => <option key={username} value={username}>{username}</option>)}
            </select>
            <button disabled={isLoggedIn}>Login</button>
        </form>
        {isLoggedIn ? <h3>Welcome {activeUser}!</h3> : null}
    </section>
}

export default Home;