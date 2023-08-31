import { useState } from 'react';
import './Login.css';
import Vector from '../../assets/vector-coffe.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate()
  

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
      const response = await axios.post("https://server-production-9d29.up.railway.app/login", {
        email: formData.email,
        password: formData.password,
      });

      setLoginStatus('sucesso');

      console.log(response)

      navigate('/tabela')

    } catch (error) {
      setLoginStatus('falha');
      console.log(error);
    }
  }

  
  const handleLogout = () => {
    // Limpar os dados de autenticação (por exemplo, definir loginStatus como null)
    setLoginStatus(null);
    // Redirecionar para a página de login (ou página inicial)
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
          />
          
          <input
            type="password"
            name="password" 
            placeholder='Senha:'
            value={password}
            onChange={handleInputChange}
          />

          <button type="submit">Entrar</button>
          {loginStatus === 'sucesso' && <p>Login bem-sucedido!</p>}
          {loginStatus === 'falha' && <p>Falha no login. Verifique suas credenciais.</p>}
          {loginStatus === 'sucesso' && <button onClick={handleLogout}>Logout</button>}
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