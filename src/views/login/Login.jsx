import './Login.css';
import Vector from '../../assets/vector-coffe.svg';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'; 



const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
  
      try {
        const response = await axios.post("http://52.67.201.79:8080/api/login", {
          email: data.email,
          password: data.password, 
        })
        console.log(response.data)
        localStorage.setItem('token', response.data.token); 
        setIsLoggedIn(true);
    

      } catch (error) {
        console.log(error)
        
      }

      if (isLoggedIn) {
        return <navigate to="/cadastrar-registro" /> ; // Redirecionar para a página após o login
      }
    
     
    }

  

   
  return (
    <>
      <div className='login'>
        <form className="login-form" onSubmit={onSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email:"
          
          />
          
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder='Senha:'
           
          />

         
          <button type="submit">Entrar</button>
          <div className='link-cadastro'>
            <p>Não tem Cadastro ?</p>
            <Link to="/cadastro" className='link'><strong>Criar uma Conta</strong></Link>
          </div>
        </form>
      </div>
      <img className='vector' src={Vector} alt='Vector café' />
    </>
  )
  }

export default Login