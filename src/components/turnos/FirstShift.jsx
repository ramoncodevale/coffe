import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton} from '@coreui/react'


const FirstShift = ({handleFecharTurno, formTable, setFormTable, handleSaveTabela}) => {
  return (
    <>
     <CTable className="mb-0 border border-dark  mt-3" hover responsive>
        <CTableHead >
          <CTableRow>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>1 ° Turno</CTableHeaderCell>
            <CTableHeaderCell className="text-center " style={{ backgroundColor: '#A4663C'}} >Meta por Hora</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Perda</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Comentários</CTableHeaderCell>
            <CTableHeaderCell className="text-center" style={{ backgroundColor: '#A4663C'}}>Ação</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
           
            <CTableRow className='horarios' >
              <CTableDataCell className="text-center  table-content" style={{ backgroundColor: '#A4663C'}}>
                05:31 - 06:00
              </CTableDataCell>
              <CTableDataCell className="text-center  table-content">
                <input 
                type="text" 
                name="metaHora" 
                id="metaHora"         
                value={formTable.metaHora}
                onChange={(e) => setFormTable({ ...formTable, metaHora: e.target.value })}
                className='input-table' />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input 
                type="text" 
                name="perda" 
                id="perda"         
                value={formTable.perda}
                onChange={(e) => setFormTable({ ...formTable, perda: e.target.value })}
                className='input-table' />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input 
                type="text" 
                name="perda" 
                id="perda"         
                value={formTable.comentario}
                onChange={(e) => setFormTable({ ...formTable, comentario: e.target.value })}
                className='input-table' />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <button type="submit" className='btn-turno' onClick={handleSaveTabela}>Salvar</button>
              </CTableDataCell>
            </CTableRow>

            <CTableRow >
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C'}}>
                06:01 - 07:00
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <button type="submit" className='btn-turno'>Salvar</button>
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C'}}>
                07:01 - 08:00
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <button type="submit" className='btn-turno'>Salvar</button>
              </CTableDataCell>
            </CTableRow>


            <CTableRow>
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C'}}>
                09:01 - 10:00
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <button type="submit" className='btn-turno'>Salvar</button>
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C'}}>
                11:01 - 12:00
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <button type="submit" className='btn-turno'>Salvar</button>
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C'}}>
                12:01 - 13:00
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <button type="submit" className='btn-turno'>Salvar</button>
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C'}}>
                13:01 - 14:00
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <input type="text" name="" id="" />
                
              </CTableDataCell>
              <CTableDataCell className="text-center table-content">
              <button type="submit" className='btn-turno'>Salvar</button>
              </CTableDataCell>
            </CTableRow>
    
      
            <CTableRow>
          <CTableDataCell style={{ backgroundColor: '#A4663C'}}></CTableDataCell>
          <CTableDataCell style={{ backgroundColor: '#A4663C'}}></CTableDataCell>
          <CTableDataCell style={{ backgroundColor: '#A4663C'}}></CTableDataCell>
          <CTableDataCell style={{ backgroundColor: '#A4663C'}}></CTableDataCell>
        <CTableDataCell className='text-center' style={{ backgroundColor: '#A4663C'}}>
        <CButton onClick={handleFecharTurno} style={{ backgroundColor: '#221518', border: 'none'}}>Fechar Turno</CButton>
        </CTableDataCell>
        </CTableRow>
        </CTableBody>

      </CTable>
    </>
  )
}

export default FirstShift