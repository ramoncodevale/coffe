import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './views/login/Login';
import Cadastro from './views/cadastro/Cadastro';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import CadastrarRegistro from './views/registros/CadastrarRegistro';
import Graficos from './views/graficos/Graficos';
import Form from './components/form/Form';
import Tabela from './components/tabela/Tabela';
import Logout from './components/logout/Logout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] =useState(false);
  return (
     <>
     {/* <Login /> */}
     <BrowserRouter>
     <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
        <Routes>
          <Route path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}  />
          <Route path="/logout" element={<Logout />}  />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/registro" element={<CadastrarRegistro/>} />
          <Route path='/graficos' element={<Graficos />} />
          <Route path='/tabela' element={<Tabela />} />
          <Route path='/form' element={<Form />} />
        </Routes>
        <Footer />
      </BrowserRouter>
     </>
  )
}

export default App