import './Navbar.css'
import Logo from '../../assets/logo-jde1.png';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav> 
     <img src={Logo} alt="jde logo" />
     <div className='links'>
     {props.isLoggedIn ? (
       <Link className='link-login' onClick={() => props.setIsLoggedIn(false)} to="/logout">Logout</Link>
     ) : (
       <Link className='link-login' to='/'>Login</Link>
     )}
     </div>

    </nav>
  )
}

export default Navbar