import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton} from '@coreui/react'
import './Tabela.css';
import axios from 'axios';
import { format } from 'date-fns';
import FirstShift from '../../components/turnos/FirstShift'
import SecondShift from '../../components/turnos/SecondShift'
import ThirdShift from '../../components/turnos/ThirdShift'

const Tabela = () => {
  const [operadores, setOperadores] = useState([]);
  const [periodo, setPeriodo] = useState([])
  const [maquinas, setMaquinas] = useState([])
  const [metaPorHoraSelecionada, setMetaPorHoraSelecionada] = useState(0);

  const [isFirstShiftVisible, setIsFirstShiftVisible] = useState(false);
const [isSecondShiftVisible, setIsSecondShiftVisible] = useState(false);
const [isThirdShiftVisible, setIsThirdShiftVisible] = useState(false);


  const [formData, setFormData] = useState({
    operadorId: '',
    periodoId: '',
    ger: '',
    maquinaId: '',
    planejado: ''
});

const [formTable, setFormTable] = useState({
  operadorId: '',
  perda: '',
  comentario: '',
  quantidade: '',
  metaHora: '',
})

const handleAbrirTurno = async () => {
  try {
    const response = await axios.post('https://server-production-9d29.up.railway.app/cadastrar/producao', formData);
   
    console.log('Dados enviados com sucesso:', response.data);
    if (formData.periodoId === "1") {
      setIsFirstShiftVisible(true);
      setIsSecondShiftVisible(false);
      setIsThirdShiftVisible(false);
    } else if (formData.periodoId === "2") {
      setIsFirstShiftVisible(false);
      setIsSecondShiftVisible(true);
      setIsThirdShiftVisible(false);
    } else if (formData.periodoId === "3") {
      setIsFirstShiftVisible(false);
      setIsSecondShiftVisible(false);
      setIsThirdShiftVisible(true);
    } else {
      // Caso nenhum período seja selecionado, esconda todas as tabelas
      setIsFirstShiftVisible(false);
      setIsSecondShiftVisible(false);
      setIsThirdShiftVisible(false);
    }

  } catch (error) {
    console.error('Ocorreu um erro ao enviar os dados:', error);
  }
};

const handleSaveTabela = async () => {
  try {
    const response = await axios.post('https://server-production-9d29.up.railway.app/cadastrar/tabela', formTable);
   
    console.log('Dados enviados com sucesso:', response.data);
    

  } catch (error) {
    console.error('Ocorreu um erro ao enviar os dados:', error);
  }
};


useEffect(() => {
  const fetchOperadores = async () => {
    try {
      const response = await axios.get('https://server-production-9d29.up.railway.app/listar/operador');
      setOperadores(response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os operadores:', error);
    }
  };

  fetchOperadores();
}, []);

useEffect(() => {
  const fetchPeriodo = async () => {
    try {
      const response = await axios.get('https://server-production-9d29.up.railway.app/listar/periodo');
      setPeriodo(response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os periodo:', error);
    }
  };

  fetchPeriodo();
}, []);

useEffect(() => {
  const fetchMaquinas = async () => {
    try {
      const response = await axios.get('https://server-production-9d29.up.railway.app/listar/maquina');
      setMaquinas(response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar as maquinas:', error);
    }
  };

  fetchMaquinas();
}, []);


const handleFecharTurno = () => {
  setIsFirstShiftVisible(false);
  setIsSecondShiftVisible(false);
  setIsThirdShiftVisible(false);
};


  const today = new Date();
  const formattedDate = format(today, 'dd/MM/yyyy');


  return (
    <>
    <section className='secao-tabela'>
     <CTable className="mb-0 border border-dark  mt-3 tabela" hover responsive>
     <CTableHead >
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Data</CTableHeaderCell>
            <CTableHeaderCell className="text-center " style={{ backgroundColor: '#A4663C'}} >Operador</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>GE %</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Periodo</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Maquinas</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Meta Por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Planejado</CTableHeaderCell>
            <CTableDataCell className="text-center" style={{ backgroundColor: '#A4663C'}}>
              Ação
          
        </CTableDataCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell className="text-center">
            <input
            type="text"
            placeholder="Data"
            name="data"
            value={formattedDate}
            readOnly // Make the date field read-only
          />
            </CTableDataCell>
            <CTableDataCell className="text-center">
  <select
    name="operador"
    id="operador"
    value={formData.operadorId} // Altere para formData.operadorId
    onChange={(e) => setFormData({ ...formData, operadorId: e.target.value })} // Altere para operadorId
  >
    <option value="">Selecione um operador</option>
    {operadores.map((operador) => (
      <option key={operador.id} value={operador.id}>
        {operador.nome}
      </option>
    ))}
  </select>
</CTableDataCell>
            <CTableDataCell  className="text-center">
            <input
            type="text"
            placeholder="GE%"
            name="ger"
            value={formData.ger}
            onChange={(e) => setFormData({ ...formData, ger: e.target.value })}
          />
            </CTableDataCell>

            <CTableDataCell className="text-center">
  <select
    name="periodo"
    id="periodo"
    value={formData.periodoId} // Altere para formData.periodoId
    onChange={(e) => setFormData({ ...formData, periodoId: e.target.value })} // Altere para periodoId
  >
    <option value="">Selecione um Turno</option>
    {periodo.map((periodo) => (
      <option key={periodo.id} value={periodo.id}>
        {periodo.turno}
      </option>
    ))}
  </select>
</CTableDataCell>
<CTableDataCell className="text-center">
  <select
    name="maquinas"
    id="maquinas"
    value={formData.maquinaId} // Altere para formData.maquinaId
    onChange={(e) => {
      const selectedMachineId = e.target.value;
      setFormData({ ...formData, maquinaId: selectedMachineId }); // Altere para maquinaId
      // Encontre a máquina selecionada com base no ID
      const selectedMachine = maquinas.find((machine) => machine.id === parseInt(selectedMachineId));
      if (selectedMachine) {
        setMetaPorHoraSelecionada(selectedMachine.metaHora);
      } else {
        setMetaPorHoraSelecionada(0); // Padrão para 0 se nenhuma máquina for selecionada
      }
    }}
  >
    <option value="">Selecione uma Máquina</option>
    {maquinas.map((maquina) => (
      <option key={maquina.id} value={maquina.id}>
        {maquina.nome}
      </option>
    ))}
  </select>
</CTableDataCell>

            <CTableDataCell  className="text-center">
            <input
    type="text"
    placeholder="Meta por hora"
    name="metaPorHora"
    value={metaPorHoraSelecionada}
    readOnly // Certifique-se de que este campo seja apenas leitura
  />
            </CTableDataCell>
            <CTableDataCell  className="text-center">
            <input
            type="text"
            placeholder="Planejado"
            name="planejado"
            value={formData.planejado}
            onChange={(e) => setFormData({ ...formData, planejado: e.target.value })}
          />
            </CTableDataCell>
            <CTableDataCell>
            <CButton style={{ backgroundColor: "#221518", border: 'none' }} onClick={handleAbrirTurno}>
          Abrir Turno
        </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>


      {isFirstShiftVisible && <FirstShift handleFecharTurno={handleFecharTurno} handleSaveTabela={handleSaveTabela} formTable={formTable} setFormTable={setFormTable} />}
{isSecondShiftVisible && <SecondShift handleFecharTurno={handleFecharTurno} handleSaveTabela={handleSaveTabela} />}
{isThirdShiftVisible && <ThirdShift handleFecharTurno={handleFecharTurno} handleSaveTabela={handleSaveTabela} />}

     
    </section>
    </>
  );
}

export default Tabela;
