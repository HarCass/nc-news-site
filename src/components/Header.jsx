import { useContext } from 'react';
import { ActiveUserContext } from '../contexts/ActiveUserContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { activeUser, isLoggedIn } = useContext(ActiveUserContext);

    return <header>
        <h1><i class="fa fa-newspaper-o" aria-hidden="true"></i> NC News</h1>
        <nav className="navbar">
            <ul className="nav-list">
                <li className='nav-item'><Link to="/">Home</Link></li>
                <li className='nav-item'><Link to="/articles">Articles</Link></li>
                <li className='nav-item'><Link to="/topics">Topics</Link></li>
            </ul>
        </nav>
        {isLoggedIn ? <div className="active-user-profile">
            <h3>User: {activeUser}</h3>
        </div> : <Link to="/">Login Here!</Link>}
    </header>
}

export default Header;
