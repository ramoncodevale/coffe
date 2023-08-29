import { useState } from 'react';
import './Login.css';
import Vector from '../../assets/vector-coffe.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  

  const [loginStatus, setLoginStatus] = useState(null);

  const { email, senha } = formData;

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
      const response = await axios.get("https://52.67.201.79:8080/api/login", {
        email: formData.email,
        senha: formData.senha,
      }, {
        headers: {
            'Content-Security-Policy': 'upgrade-insecure-requests', // Configuração de política de segurança
          
        },
      });

      setLoginStatus('sucesso');

      console.log(response)

    } catch (error) {
      setLoginStatus('falha');
      console.log(error);
    }
  }

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
            name="senha" 
            placeholder='Senha:'
            value={senha}
            onChange={handleInputChange}
          />

          <button type="submit">Entrar</button>
          {loginStatus === 'sucesso' && <p>Login bem-sucedido!</p>}
          {loginStatus === 'falha' && <p>Falha no login. Verifique suas credenciais.</p>}
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