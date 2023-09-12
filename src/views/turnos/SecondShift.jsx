import React, { useEffect, useState } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton } from '@coreui/react';
import axios from 'axios';

const SecondShift = () => {
  const [shift, setShift] = useState([]);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get('https://server-production-9d29.up.railway.app/listar/turno/2');
        setShift(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTime();
  }, []);


  return (
    <section className="secao-tabela">
      <CTable className="mb-0 border border-dark mt-3" hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>1 ° Turno</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Meta por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Perda</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C', color: '#221518' }}>Comentários</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        {/* <CTableBody>
          {shift.producoesRegistro.map(item => (
            <CTableRow key={item.id} className='horarios'>
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C', color: '#221518' }}>
              {item.horario.faixa}
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
                {item.quantidade}
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
                {item.perda}
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
                {item.comentario}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody> */}
      </CTable>
    </section>
  );
}

export default SecondShift;
