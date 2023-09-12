import { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton } from '@coreui/react';
import axios from 'axios';

const FirstShift = ({ handleFecharTurno }) => {
  const [time, setTime] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(''); //
  const [turnoRegistros, setTurnoRegistros] = useState([]);
  const [dadosSalvos, setDadosSalvos] = useState(false);


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
        const response = await axios.get('https://server-production-9d29.up.railway.app/listar/horario/3');
        setTime(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTime();
  }, []);

  const handleSave = async () => {
    try {
      const currentRow = time[currentRowIndex]; // Obtém a linha atual com base no índice
      const requestData = {
        horarioId: currentRow.id,
        comentario: formData.comentario,
        perda: formData.perda,
        quantidade: formData.quantidade,
      };
  
      // Faça a solicitação POST para salvar os dados
      const response = await axios.post('https://server-production-9d29.up.railway.app/cadastrar/turno', requestData);
  
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
    } catch (error) {
      console.error('Ocorreu um erro ao enviar os dados do turno:', error);
    }
  };
  
  // Verifique se todas as linhas foram preenchidas
  const allRowsFilled = currentRowIndex >= time.length;

  const fetchTurnoRegistros = async () => {
    try {
      const response = await axios.get('https://server-production-9d29.up.railway.app/listar/turno/2');
      setTurnoRegistros(response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os registros de turno:', error);
    }
  };


  return (
    <section className='secao-tabela'>
      <CTable className="mb-0 border border-dark mt-3" hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>3 ° Turno</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Meta por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Perda</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Comentários</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Ação</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

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
      {allRowsFilled && ( 
        <CButton onClick={handleFecharTurno} style={{ backgroundColor: '#221518', border: 'none', color: '#fff' }}>Fechar Turno</CButton>
      )}

      <CTable className="mb-0 border border-dark mt-3" hover responsive>
     {dadosSalvos && (

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

    </CTable>
    </section>
  );
};

export default FirstShift;
