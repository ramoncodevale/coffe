import './Navbar.css'
import Logo from '../../assets/logo-jde1.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav> 
     <img src={Logo} alt="jde logo" />
     <div className='links'>
     <Link className='link-login' to='/'>Login</Link>
     <Link className='link-registro' to='/registro'>Registro</Link>
     </div>

    </nav>
  )
}

export default Navbar