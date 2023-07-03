import { useContext, useState } from "react";
import { postUser } from "../api";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [newUser, setNewUser] = useState(null);
    const [isError, setIsError] = useState(null);
    const [hasClicked, setHasClicked] = useState(false);
    const {setActiveUser, isLoggedIn, setIsLoggedIn} = useContext(ActiveUserContext);
    const navigate = useNavigate();

    const signupHandler = (event) => {
        event.preventDefault();
        setIsError(null);
        setHasClicked(true);

        const userObj = {
            name,
            username,
            avatar_url: imgUrl
        }
        
        postUser(userObj)
        .then(user => {
            setNewUser(user);
            setActiveUser(user.username);
            localStorage.setItem('activeuser', user.username);
            setIsLoggedIn(true);
            navigate(`/users/${user.username}`);
        })
        .catch(err => {
            setIsError(err.response);
            setHasClicked(false);
        });
    }

    return isLoggedIn ? <h2>Logout To Sign Up With A New User</h2> : <section className="signup-page">
        {newUser ? <ul>
            <li>{newUser.name}</li>
        </ul> : <div className="singup-container">
            <form className="signup-form" onSubmit={signupHandler}>
                <label htmlFor="signup-name">Name</label>
                <input id="signup-name" placeholder="e.g. John Doe" required value={name} onChange={ev => setName(ev.target.value)}></input>
                <label htmlFor="signup-username">Display Name</label>
                <input id="signup-username" placeholder="e.g. User123" required value={username} onChange={ev => setUsername(ev.target.value)}></input>
                <label htmlFor="signup-url">Avatar Image URL</label>
                <input id="signup-url" placeholder="e.g. https://example.com" value={imgUrl} onChange={ev => setImgUrl(ev.target.value)}></input>
                <button disabled={hasClicked}>Sign Up</button>
            </form>
            {hasClicked ? <h3>Creating Profile...</h3> : null}
            {isError ? <h3>That Username Is Already In Use!</h3> : isError === undefined ? <h3>Something Went Wrong!</h3> : null}
        </div>}
    </section>
}

export default SignUp;