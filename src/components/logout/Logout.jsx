import { Link } from "react-router-dom"

const Logout = () => {
  return (
    <form className="login-form" style={{marginTop: "50px", height: '200px'}}>
      <p>Você tem certeza que deseja sair ?</p>
      <Link to="/">
      <button style={{width: '190px'}}>Logout</button>
      </Link>
    </form>
  )
}

export default Logout