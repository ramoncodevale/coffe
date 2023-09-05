import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton} from '@coreui/react'

const ThirdShift = ({handleFecharTurno}) => {
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
            22:01 - 23:00
          </CTableDataCell>
          <CTableDataCell className="text-center  table-content">
            <input type="text" name="" id="" className='input-table' />
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

        <CTableRow >
          <CTableDataCell className="text-center table-content" style={{ backgroundColor: '#A4663C'}}>
            23:01 - 00:00
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
            00:01 - 01:00
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
            01:01 - 02:00
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
            02:01 - 03:00
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
            03:01 - 04:00
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
            04:01 - 05:00
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

export default ThirdShift