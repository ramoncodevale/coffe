import './Footer.css'

import Logo from '../../assets/logo-jde1.png';

const Footer = () => {
    const date = new Date();
    let year = date.getFullYear();
  return (
    <>
    <footer>
    <div className='titulo-footer'>
    <img src={Logo} alt="logo jde" />
    </div>
    </footer>
    </>
  )
}

export default Footer