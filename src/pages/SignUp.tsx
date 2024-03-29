import { FormEvent, useContext, useState } from "react";
import { postUser } from "../api";
import { ActiveUserContext } from "../contexts/ActiveUserContext";
import { useNavigate } from "react-router-dom";
import { ApiError, ApiErrorResponse, User } from "../types";
import { Nullable } from "vitest";
import { useQueryClient } from "@tanstack/react-query";

const SignUp = () => {
    const client = useQueryClient();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [newUser, setNewUser] = useState<Nullable<User>>(null);
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);
    const [hasClicked, setHasClicked] = useState(false);
    const { setActiveUser, isLoggedIn, setIsLoggedIn } = useContext(ActiveUserContext)!;
    const navigate = useNavigate();

    const signupHandler = (event: FormEvent) => {
        event.preventDefault();
        setIsError(null);
        setHasClicked(true);

        const userObj: User = {
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
                client.invalidateQueries({
                    queryKey: ['users'],
                    exact: true,
                    refetchType: 'active'
                });
                navigate(`/users/${user.username}`);
            })
            .catch((err: ApiErrorResponse) => {
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