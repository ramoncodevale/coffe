import { useState } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton } from '@coreui/react';
import axios from 'axios';
import { useEffect } from 'react';

const ThirdShift = ({ handleFecharTurno, handleSalvarTurno }) => {
 

  const [ time , setTime]= useState([])

  useEffect(() => {
      const fetchTime = async () => {
      try {
        const response = await axios.get('https://server-production-9d29.up.railway.app/listar/horario/3')
        setTime(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTime()
}, [])
 
  
  return (
    <section className='secao-tabela'>
      <CTable className="mb-0 border border-dark mt-3" hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>3 ° Turno</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Meta por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Perda</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Comentários</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518'}}>Ação</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
    

<CTableBody>
  {time.map((item) => (
    <CTableRow key={item.faixa} className='horarios'>
      <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C', color: '#221518'}}>
        {item.faixa}
      </CTableDataCell>
      <CTableDataCell className="text-center table-content">
        <input
          type="text"
          name="quantidade"
          // value={data.quantidade}
          className='input-table'
        />
      </CTableDataCell>
      <CTableDataCell className="text-center table-content">
        <input
          type="text"
          name="perda"
          // value={data.perda}
          className='input-table'
        />
      </CTableDataCell>
      <CTableDataCell className="text-center table-content">
        <input
          type="text"
          name="comentario"
          // value={data.comentario}
          className='input-table'
        />
      </CTableDataCell>
      <CTableDataCell className="text-center table-content">
        <button type="submit" className='btn-turno' onClick={() => handleSalvarTurno()}>Salvar</button>
      </CTableDataCell>
    </CTableRow>
  ))}
     
        <CTableDataCell className='text-center' style={{ backgroundColor: '#A4663C', color: '#221518'}}>
        </CTableDataCell>
        <CTableDataCell className='text-center' style={{ backgroundColor: '#A4663C', color: '#221518'}}>
        </CTableDataCell>
        <CTableDataCell className='text-center' style={{ backgroundColor: '#A4663C', color: '#221518'}}>
        </CTableDataCell>
        <CTableDataCell className='text-center' style={{ backgroundColor: '#A4663C', color: '#221518'}}>
        </CTableDataCell>
        <CTableDataCell className='text-center' style={{ backgroundColor: '#A4663C'}}>
        <CButton onClick={handleFecharTurno} style={{ backgroundColor: '#221518', border: 'none',color: '#fff'}}>Fechar Turno</CButton>
        </CTableDataCell>

</CTableBody>


      </CTable>
    </section>
  )
}

export default ThirdShift;
