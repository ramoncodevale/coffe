import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './views/login/Login';
import Cadastro from './views/cadastro/Cadastro';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Tabela from './views/tabela/Tabela';
import CadastrarRegistro from './views/registros/CadastrarRegistro';

const App = () => {
  return (
     <>
     {/* <Login /> */}
     <BrowserRouter>
     <Navbar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/cadastrar-registro" element={<CadastrarRegistro/>} />
          <Route path='/tabela-cadastro' element={<Tabela />} />
        </Routes>
        <Footer />
      </BrowserRouter>
     </>
  )
}

export default App