import { Link } from 'react-router-dom';


let Navbar = () => {

    return (
        <>
            <nav>
                <div className="navbar-container">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/forecast">Forecast</Link></li>
                        <li><Link to="/quick-location">Quick Location</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}


export default Navbar;