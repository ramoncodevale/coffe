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
import axios from 'axios';
import FirstShift from "./components/turnos/FirstShift"
import SecondShift from "./components/turnos/SecondShift"
import ThirdShift from "./components/turnos/ThirdShift"



const App = () => {
  // const [isLoggedIn, setIsLoggedIn] =useState(false);
  return (
     <>
     {/* <Login /> */}
     
     <BrowserRouter>
     <Navbar  />
        <Routes>
          <Route path="/" element={<Login  />}  />
          <Route path="/logout" element={<Logout />}  />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/registro" element={<CadastrarRegistro/>} />
          <Route path='/relatorio' element={<Graficos />} />
          <Route path='/tabela' element={<Tabela />} />
          <Route path='/form' element={<Form />} />
          <Route path='/turno/1' element={<FirstShift />} />
          <Route path='/turno/2' element={<SecondShift />} />
          <Route path='/turno/3' element={<ThirdShift />} />

        </Routes>
        <Footer />
      </BrowserRouter>
     </>
  )
}

export default App