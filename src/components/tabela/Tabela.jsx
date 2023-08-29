import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, CTableDataCell, CCol} from '@coreui/react'
import './Tabela.css';
import axios from 'axios';
import { format } from 'date-fns';

const Tabela = () => {
  // State for form data
  const [formData, setFormData] = useState({
    operador: '',
    periodo: '',
    maquina: '', // Changed from 'maqunia' to 'maquina'
    ge: '',
    metaPorHora: '',
    planejado: ''
  });

  // State for table data
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://52.67.201.79:8080/api/turno', {
          headers: {
            'Content-Security-Policy': 'upgrade-insecure-requests', // Configuração de política de segurança

          }
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default page reload
    // Validate and send form data to the API here
    // You can use formData to send the data to your API endpoint
  };

  const today = new Date();
  const formattedDate = format(today, 'dd/MM/yyyy');

  const [turnoAberto, setTurnoAberto] = useState(null); // Inicialmente nenhum turno está aberto

  const abrirTurno = (numeroTurno) => {
    setTurnoAberto(numeroTurno);
  };



  return (
    <>
      <form className="input-cadastro" onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Data</label>
          <input
            type="text"
            placeholder="Data"
            name="data"
            value={formattedDate}
            readOnly // Make the date field read-only
          />
        </div>

        <div className='input-container'>
          <label>Operador</label>
          <input
            type="text"
            placeholder="Operador"
            name="operador"
            value={formData.operador}
            onChange={(e) => setFormData({ ...formData, operador: e.target.value })}
          />
        </div>

        <div className='input-container'>
          <label>Período</label>
          <input
            type="text"
            placeholder="Período"
            name="periodo"
            value={formData.periodo}
            onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
          />
        </div>

        <div className='input-container'>
          <label>Máquina</label>
          <input
            type="text"
            placeholder="Máquina" // Corrected placeholder text
            name="maquina"
            value={formData.maquina}
            onChange={(e) => setFormData({ ...formData, maquina: e.target.value })}
          />
        </div>

        <div className='input-container'>
          <label>Ge %</label>
          <input
            type="text"
            placeholder="GE%"
            name="ge"
            value={formData.ge}
            onChange={(e) => setFormData({ ...formData, ge: e.target.value })}
          />
        </div>

        <div className='input-container'>
          <label>Meta por Hora</label>
          <input
            type="text"
            placeholder="Meta por hora"
            name="metaPorHora"
            value={formData.metaPorHora}
            onChange={(e) => setFormData({ ...formData, metaPorHora: e.target.value })}
          />
        </div>

        <div className='input-container'>
          <label>Planejado</label>
          <input
            type="text"
            placeholder="Planejado"
            name="planejado"
            value={formData.planejado}
            onChange={(e) => setFormData({ ...formData, planejado: e.target.value })}
          />
        </div>

        <button type='submit'>Salvar Alteração</button>

        <button type="button" style={{ marginTop: '10px' }} onClick={() => abrirTurno(1)}>
          Abrir Turno 1
        </button>
        <button type="button" style={{ marginTop: '10px' }} onClick={() => abrirTurno(2)}>
          Abrir Turno 2
        </button>
      </form>

      {turnoAberto === 1 && (
        <>
          <h1 className='titulo-tabela'>CHECAR (check)</h1>
          <h1 className='titulo-tabela'>Turno 1 °</h1>
          <div className='tabela-container'>

<CCol>
            <CTable className="custom-table border border-dark" responsive hover>
         <CTableHead className='bg-table'  >
    <CTableRow>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>TURNO</CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>META POR HORA </CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>PRODUZIDO</CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>QUALIDADE</CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>SHE</CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>DESP. EMBALAGEM</CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>DESP. CAFÉ</CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>MÁQUINA</CTableHeaderCell>
      <CTableHeaderCell scope="col"
      style={{ backgroundColor: '#A4663C'}}>OPERADOR</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
              <CTableBody>
                {data.map(item => (
                  <CTableRow key={item.id}>
                    <CTableDataCell className='horario'
                    style={{ backgroundColor: '#A4663C'}}>
                      {item.producoes.map((producao, index) => (
                        <div key={index}>{producao.horario.faixa}</div>
                      ))}
                    </CTableDataCell>
                  
                    <CTableDataCell>{item.maquina.metaHora}</CTableDataCell>
                    <CTableDataCell>{item.produzido}</CTableDataCell>
                    <CTableDataCell>{item.qualidade ? 'OK' : 'NOK'}</CTableDataCell>
                    <CTableDataCell>{item.she ? 'OK' : 'NOK'}</CTableDataCell>
                    <CTableDataCell>{item.desperdicioEmbalagem}</CTableDataCell>
                    <CTableDataCell>{item.desperdicioCafe}</CTableDataCell>
                    <CTableDataCell>{item.maquina.nome}</CTableDataCell>
                    <CTableDataCell>{`${item.operador.nome} ${item.operador.sobreNome}`}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            </CCol>
          </div>
        </>
      )}


      {turnoAberto === 2 && (
        <>
          <h1 className='titulo-tabela'>Turno 2 °</h1>
          <div className="tabela-container " >
          <CCol>
          <CTable className="custom-table  border border-dark" responsive hover>
              
              <CTableHead className='bg-table'  >
         <CTableRow>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>TURNO</CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>META POR HORA </CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>PRODUZIDO</CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>QUALIDADE</CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>SHE</CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>DESP. EMBALAGEM</CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>DESP. CAFÉ</CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>MÁQUINA</CTableHeaderCell>
           <CTableHeaderCell scope="col"
           style={{ backgroundColor: '#A4663C'}}>OPERADOR</CTableHeaderCell>
         </CTableRow>
       </CTableHead>
                   <CTableBody>
                     {data.map(item => (
                       <CTableRow key={item.id}>
                         <CTableDataCell className='horario'
                         style={{ backgroundColor: '#A4663C'}}>
                           {item.producoes.map((producao, index) => (
                             <div key={index}>{producao.horario.faixa}</div>
                           ))}
                         </CTableDataCell>
                       
                         <CTableDataCell>{item.maquina.metaHora}</CTableDataCell>
                         <CTableDataCell>{item.produzido}</CTableDataCell>
                         <CTableDataCell>{item.qualidade ? 'OK' : 'NOK'}</CTableDataCell>
                         <CTableDataCell>{item.she ? 'OK' : 'NOK'}</CTableDataCell>
                         <CTableDataCell>{item.desperdicioEmbalagem}</CTableDataCell>
                         <CTableDataCell>{item.desperdicioCafe}</CTableDataCell>
                         <CTableDataCell>{item.maquina.nome}</CTableDataCell>
                         <CTableDataCell>{`${item.operador.nome} ${item.operador.sobreNome}`}</CTableDataCell>
                       </CTableRow>
                     ))}
                   </CTableBody>
                 </CTable>
             </CCol>
          </div>

        </>
      )}
    </>
  );
}

export default Tabela;
