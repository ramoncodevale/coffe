import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, CTableDataCell, CCol, CButton} from '@coreui/react'

const SecondShift = ({handleFecharTurno}) => {
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
            15:01 - 16:00
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
            16:01 - 17:00
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
            17:01 - 18:00
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
            18:01 - 19:00
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
            19:01 - 20:00
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
            20:01 - 21:00
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
            21:01 - 22:00
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

export default SecondShift