import { useContext } from 'react';
import { ActiveUserContext } from '../contexts/ActiveUserContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { activeUser, isLoggedIn } = useContext(ActiveUserContext);

    return <header>
        <h1>NC News</h1>
        {isLoggedIn ? <div className="active-user-profile">
            <h3>User: {activeUser}</h3>
        </div> : <Link to="/"><h3>Login Here!</h3></Link>}
        <nav className="navbar">
            <ul className="nav-list">
                <li className='nav-item'><Link to="/"><button>Home</button></Link></li>
                <li className='nav-item'><Link to="/articles"><button>Articles</button></Link></li>
                <li className='nav-item'><Link to="/topics"><button>Topics</button></Link></li>
            </ul>
        </nav>
    </header>
}

export default Header;
