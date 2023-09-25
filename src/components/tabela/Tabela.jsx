import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton} from '@coreui/react'
import './Tabela.css';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns"
import axios from 'axios';
import FirstShift from '../../components/turnos/FirstShift'
import SecondShift from '../../components/turnos/SecondShift'
import ThirdShift from '../turnos/ThirdShift'


const Tabela = () => {
  const [operadores, setOperadores] = useState([]);
  const [periodo, setPeriodo] = useState([])
  const [maquinas, setMaquinas] = useState([])
  const [metaPorHoraSelecionada, setMetaPorHoraSelecionada] = useState(0);


  const [isFirstShiftVisible, setIsFirstShiftVisible] = useState(false);
const [isSecondShiftVisible, setIsSecondShiftVisible] = useState(false);
const [isThirdShiftVisible, setIsThirdShiftVisible] = useState(false);
const [isTurnoAberto, setIsTurnoAberto] = useState(false);



const today = new Date();

const formattedDate = format(today, 'dd/MM/yyyy');

const navigate = useNavigate()


  const [formData, setFormData] = useState({
    operadorId: '',
    data: formattedDate,
    periodoId: '',
    quantidade: '',
    comentario: '',
    perda:'',
    ger: '',
    maquinaId: '',
    planejado: '',
    horario: '',
});


const enviarDadosDoTurno = async (requestData) => {
  try {
    const response = await axios.post('https://coffe-server-1.onrender.com/cadastrar/producao', requestData);
    console.log('Dados do turno enviados com sucesso:', response.data);
  } catch (error) {
    console.error('Ocorreu um erro ao enviar os dados do turno:', error);
  }
};


const handleAbrirTurno = () => {
  if (formData.periodoId === "1") {
   navigate("/turno/1")
  } else if (formData.periodoId === "2") {
   navigate("/turno/2")
  } else if (formData.periodoId === "3") {
   navigate("/turno/3")
  }
  setIsTurnoAberto(true);

  const requestData = {
    operadorId: formData.operadorId,
    data: format(today, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone: 'UTC' }),
    periodoId: formData.periodoId,
    ger: formData.ger,
    maquinaId: formData.maquinaId,
    planejado: formData.planejado,
  };
  console.log(requestData.data);

  enviarDadosDoTurno(requestData);
};



useEffect(() => {
  const fetchOperadores = async () => {
    try {
      const response = await axios.get('https://coffe-server-1.onrender.com/listar/operador');
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
      const response = await axios.get('https://coffe-server-1.onrender.com/listar/periodo');
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
      const response = await axios.get('https://coffe-server-1.onrender.com/listar/maquina');
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



  return (
    <>
    <section className='secao-tabela'>
     <CTable className="mb-0 border border-dark  mt-3 tabela" hover responsive>
     <CTableHead >
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Data</CTableHeaderCell>
            <CTableHeaderCell className="text-center "style={{ backgroundColor: '#A4663C', color: '#221518'}} >Operador</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>GE %</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Periodo</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Maquinas</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Meta Por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Planejado</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>
              Ação
        </CTableHeaderCell>
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
            className="input"
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
            className='input'
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
    className='input'

    readOnly // Certifique-se de que este campo seja apenas leitura
  />
            </CTableDataCell>
            <CTableDataCell  className="text-center">
            <input
            className='input'
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

{/* 
      {isFirstShiftVisible && <FirstShift handleFecharTurno={handleFecharTurno} 
      operadorId  formData={formData} setFormData={setFormData} />}
{isSecondShiftVisible && <SecondShift handleFecharTurno={handleFecharTurno}  />}
{isThirdShiftVisible && <ThirdShift handleFecharTurno={handleFecharTurno}  />} */}

     
    </section>
    </>
  );
}

export default Tabela;
