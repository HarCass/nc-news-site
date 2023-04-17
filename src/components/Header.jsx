import { Link } from 'react-router-dom';

const Header = () => {
    return <header>
        <h1>NC News</h1>
        <nav className="navbar">
            <ul className="nav-list">
                <li className='nav-item'><Link to="/"><button>Home</button></Link></li>
                <li className='nav-item'><Link to="/articles"><button>Articles</button></Link></li>
            </ul>
        </nav>
    </header>
}

export default Header;
