import { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton } from '@coreui/react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate, Link } from 'react-router-dom';
import "./shift.css"

const ThirdShift = ({  operadorId }) => {
  const [time, setTime] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(''); //
  const [turnoRegistros, setTurnoRegistros] = useState([]);
  const [dadosSalvos, setDadosSalvos] = useState(false);
  const [producoes, setProducoes] = useState([])
  const [turnoAberto, setTurnoAberto] = useState(true);

  const [totalProduzido, setTotalProduzido] = useState(0);



  const [formData, setFormData] = useState({
    quantidade: '',
    perda: '',
    horarioId: '',
    comentario: '',
  });
  const [currentRowIndex, setCurrentRowIndex] = useState(0); // Índice da linha atual

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get('https://coffe-server-1.onrender.com/listar/horario/3');
        setTime(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTime();
  }, []);

  useEffect(() => {
    const fetchLatestTurno = async () => {
      try {
        const response = await axios.get('https://coffe-server-1.onrender.com/listar/turno/3');
        const producoesData = response.data.producoes;
  
        // Verifique se há produções
        if (producoesData.length > 0) {
          // Ordene as produções por data em ordem decrescente
          producoesData.sort((a, b) => new Date(b.data) - new Date(a.data));
  
          // Pegue apenas o último turno
          const ultimoTurno = producoesData[0];
          
          // Defina o estado producoes com o último turno
          setProducoes([ultimoTurno]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchLatestTurno();
  }, []);


  const handleSave = async () => {
    try {
      const currentRow = time[currentRowIndex]; // Obtém a linha atual com base no índice
      const requestData = {
        operadorId: operadorId,
        horarioId: currentRow.id,
        comentario: formData.comentario,
        perda: formData.perda,
        quantidade: formData.quantidade,
      };
  
      // Faça a solicitação POST para salvar os dados
      const response = await axios.post('https://coffe-server-1.onrender.com/cadastrar/turno', requestData);
  
      console.log('Dados do turno enviados com sucesso:', response.data);
  
      // Atualize o índice para preencher a próxima linha
      setCurrentRowIndex((prevIndex) => prevIndex + 1);
  
      // Adicione o registro atual aos registros de turno
      setTurnoRegistros((prevRegistros) => [...prevRegistros, requestData]);
      setDadosSalvos(true);
    
  
      // Limpe o formulário após o envio
      setFormData({
        quantidade: '',
        perda: '',
        comentario: '',
      });

      if (currentRowIndex >= time.length - 1) {
        // Se todas as linhas foram preenchidas, calcule a soma dos valores da coluna "Meta por Hora"
        const somaProduzido = turnoRegistros.reduce((total, registro) => {
          return total + parseFloat(registro.quantidade || 0);
        }, 0);
  
        // Atualize o estado totalProduzido com o valor calculado
        setTotalProduzido(somaProduzido);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar os dados do turno:', error);
    }
   
  };
  
  // Verifique se todas as linhas foram preenchidas
  const allRowsFilled = currentRowIndex >= time.length;

  const fetchTurnoRegistros = async () => {
    try {
      const response = await axios.get(`https://coffe-server-1.onrender.com/listar/turno/${operadorId}`);
      setTurnoRegistros(response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os registros de turno:', error);
    }
  };
  
  const handleFecharTurno = () => {
    // Outras ações para fechar o turno
    
    // Defina turnoAberto como false para ocultar a tabela de registros de turno
    setTurnoAberto(false);
  };

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("turnoAberto", JSON.stringify(turnoAberto));
  });

  useEffect(() => {
    const turnoAbertoLocalStorage = localStorage.getItem("turnoAberto");
    if (turnoAbertoLocalStorage) {
      setTurnoAberto(JSON.parse(turnoAbertoLocalStorage));
    }
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.setItem("turnoAberto", JSON.stringify(turnoAberto));
      });
    };
  }, []);
  
  const navigate = useNavigate();
  
  const handleFecharTurnoERedirecionar = () => {
  
    setTurnoAberto(false);
  
    navigate('/relatorio');
  };


  return (
    <section className='secao-tabela'>
        <CTable style={{ marginTop: '20px'}} hover responsive>
        <CTableHead >
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Data</CTableHeaderCell>
            <CTableHeaderCell className="text-center "style={{ backgroundColor: '#A4663C', color: '#221518'}} >Operador</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>GE %</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Maquinas</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Meta Por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Planejado</CTableHeaderCell>
          
          </CTableRow>
        </CTableHead>
      {producoes.map((item) => (
        <CTableBody key={item.id}>
          <CTableRow>
          <CTableDataCell className="text-center">
          {format(new Date(item.data), 'dd/MM/yyyy')}

          </CTableDataCell>
          <CTableDataCell className="text-center">
            {item.operadore.nome}
          </CTableDataCell>
          <CTableDataCell className="text-center">
            {item.ger}
          </CTableDataCell>
          <CTableDataCell className="text-center">
            {item.maquina.nome}
          </CTableDataCell>
          <CTableDataCell className="text-center">
            {item.maquina.metaHora}
          </CTableDataCell>
          <CTableDataCell className="text-center">
            {item.planejado}
          </CTableDataCell>
          </CTableRow>
        </CTableBody>
      ))}
      </CTable>
      <CTable className="border border-dark" hover responsive>
        {!allRowsFilled && (
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>3 ° Turno</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Meta por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Perda</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Comentários</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Ação</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        )}
        <CTableBody>
                {currentRowIndex < time.length && ( // Renderize somente se ainda houver linhas para preencher
            <CTableRow key={time[currentRowIndex].faixa} className='horarios'>
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C', color: '#221518' }}>
              <select
          name="horario"
          value={selectedHorario}
          onChange={(e) => setSelectedHorario(e.target.value)} // Atualiza o estado com o horário selecionado
          className='input-table'
        >
          <option value="">Selecione um horário</option>
          {time.map((horario) => (
            <option key={horario.faixa} value={horario.faixa}>
              {horario.faixa}
            </option>
          ))}
        </select>
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
                <input
                  type="text"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  className='input-table'
                />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
                <input
                  type="text"
                  name="perda"
                  value={formData.perda}
                  onChange={(e) => setFormData({ ...formData, perda: e.target.value })}
                  className='input-table'
                />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
                <input
                  type="text"
                  name="comentario"
                  value={formData.comentario}
                  onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                  className='input-table'
                />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
                <button type="submit" onClick={handleSave} className='btn-turno' >Salvar</button>
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
 

      <CTable className=" border border-dark " hover responsive>
      {turnoAberto && dadosSalvos && (
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>3 ° Turno</CTableHeaderCell>
          <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Meta por Hora</CTableHeaderCell>
          <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Perda</CTableHeaderCell>
          <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Comentários</CTableHeaderCell>
        </CTableRow>
          
      </CTableHead>
      )}
      <CTableBody>
  {turnoRegistros.map((registro, index) => {
    // Encontre o objeto de horário correspondente com base no id do horário
    const horarioEncontrado = time.find((horario) => horario.id === registro.horarioId);

    return (
      <CTableRow key={index} className='horarios'>
        <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C', color: '#221518' }}>
          {horarioEncontrado ? horarioEncontrado.faixa : ''}
        </CTableDataCell>
        <CTableDataCell className="text-center table-content">
          {registro.quantidade}
        </CTableDataCell>
        <CTableDataCell className="text-center table-content">
          {registro.perda}
        </CTableDataCell>
        <CTableDataCell className="text-center table-content">
          {registro.comentario}
        </CTableDataCell>
      </CTableRow>
    );
  })}
</CTableBody>
<CTableDataCell className="text-center" style={{backgroundColor: "#A4663C", }}>

  </CTableDataCell>
  <CTableDataCell style={{backgroundColor: "#A4663C"}}></CTableDataCell>
  <CTableDataCell style={{backgroundColor: "#A4663C"}}></CTableDataCell>
  {allRowsFilled && (
    <CTableDataCell className='text-center' style={{backgroundColor: "#A4663C"}}>
    <CButton onClick={handleFecharTurnoERedirecionar} className='btn-turno-fechar' style={{backgroundColor: "#221518", border: "none"}}>
  Fechar Turno 
</CButton>

    </CTableDataCell>
  )}

    </CTable>
 
   
    </section>
  );
};

export default ThirdShift;
