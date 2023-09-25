import { useState } from 'react';
import './Login.css';
import Vector from '../../assets/vector-coffe.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState(null);

  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://coffe-server-1.onrender.com/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data; 

      localStorage.setItem('jwtToken', token); // Armazenar o token no localStorage

      setLoginStatus('sucesso');
      console.log(response);

      navigate('/tabela');

    } catch (error) {
      setLoginStatus('falha');
      console.log(error);
    }
  };

  const handleLogout = () => {
    setLoginStatus(null);
    localStorage.removeItem('jwtToken'); // Remover o token JWT ao fazer logout
    navigate('/login');
  };

  return (
    <>
      <div className='login'>

        <form className="login-form" onSubmit={onSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email:"
            value={email}
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder='Senha:'
            value={password}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Entrar</button>
          {props.isLoggedIn ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {loginStatus === 'sucesso' && <p>Login bem-sucedido!</p>}
              {loginStatus === 'falha' && <p>Falha no login. Verifique suas credenciais.</p>}
            </>
          )}
          <div className='link-cadastro'>
            <p>Não tem Cadastro ?</p>
            <Link to="/cadastro" className='link'><strong>Criar uma Conta</strong></Link>
          </div>

        </form>
      </div>
      <img className='vector' src={Vector} alt='Vector café' />
    </>
  );
}

export default Login;
