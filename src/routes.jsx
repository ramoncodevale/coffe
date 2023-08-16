import Cadastro from "./views/cadastro/Cadastro";
import Login from "./views/login/Login";
import CadastrarRegistro from "./views/registros/CadastrarRegistro";

const routes = [
    {
        path: '/', exact: true,name: 'login', element: Login
    },
    {
        path: '/cadastrar', name: 'cadastro', element: Cadastro
    }, 
    {
        path: '/registro', name: 'registro', element: CadastrarRegistro
    },


]