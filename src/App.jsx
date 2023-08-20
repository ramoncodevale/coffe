import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './views/login/Login';
import Cadastro from './views/cadastro/Cadastro';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import CadastrarRegistro from './views/registros/CadastrarRegistro';
import Graficos from './views/graficos/Graficos';
import Form from './components/form/Form';
import Tabela from './components/tabela/Tabela';

const App = () => {
  return (
     <>
     {/* <Login /> */}
     <BrowserRouter>
     <Navbar />
        <Routes>
          <Route path="/" element={<Login/>} />
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