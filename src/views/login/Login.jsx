import './Login.css';
import Vector from '../../assets/vector-coffe.svg';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


const Login = () => {
  const {
    register,
    trigger,
    formState: { errors }
  } = useForm();

  const onSubmit = async (e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className='login'>
        <form className="login-form" onSubmit={onSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email:"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })}
          />
          {errors.email && (
            <p>
              {errors.email.type === "required" &&
                "Por favor preencher esse campo"}
              {errors.email.type === "pattern" && "Email inexistente"}
            </p>
          )}
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder='Senha:'
            {...register('password', {
              required: true,
            })}

          />

          {errors.password && (
            <p>
              {errors.password.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}
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