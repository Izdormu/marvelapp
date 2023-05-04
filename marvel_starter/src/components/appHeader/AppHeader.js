import './appHeader.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AppHeader = () => {
    const location = useLocation();

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Characters</Link>
                    </li>
                    /
                    <li>
                        <Link to="/comics" className={location.pathname === '/comics' ? 'active-link' : ''}>Comics</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;