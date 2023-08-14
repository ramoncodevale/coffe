import './Navbar.css'
import Logo from '../../assets/logo-jde1.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav> 
     <img src={Logo} alt="jde logo" />
     <Link className='link-login' to='/'>Login</Link>
    </nav>
  )
}

export default Navbar