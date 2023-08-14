import Table from 'react-bootstrap/Table';

import "./Tabela.css"

import 'bootstrap/dist/css/bootstrap.min.css';

function Tabela() {
  return (
    <>
      <h1>Tabela de Registros</h1>
    <div className='tabela'>
      <Table responsive="xs" >
        <thead>
          <tr >
            <th style={{ backgroundColor: "#A4663C"}}>DATA
            </th>
            <th style={{ backgroundColor: "#A4663C"}}>OPERADOR</th>
            <th style={{ backgroundColor: "#A4663C"}}>GE% TURNO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>23/07/2023</td>
            <td>Ramon</td>
            <td>89%</td>
         
          </tr>
        </tbody>

        <thead>
          <tr >
            <th style={{ backgroundColor: "#A4663C"}}>1° TURNO
            </th>
            <th style={{ backgroundColor: "#A4663C"}}>META POR HORA</th>
            <th style={{ backgroundColor: "#A4663C"}}>Perda (min)</th>
            <th style={{ backgroundColor: "#A4663C"}}>COMENTÁRIOS</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td >05:31 - 06:00</td>
            <td>Ramon</td>
            <td>89%</td>
            <td>89%</td>
         
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td style={{ backgroundColor: "#A4663C"}}>06:01 - 07:00</td>
            <td>Ramon</td>
            <td>89%</td>
            <td>89%</td>
         
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td style={{ backgroundColor: "#A4663C"}}>07:01 - 08:00</td>
            <td></td>
            <td></td>
            <td></td>
         
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td style={{ backgroundColor: "#A4663C"}}>08:01 - 09:00</td>
            <td>Ramon</td>
            <td>89%</td>
            <td>89%</td>
         
          </tr>
        </tbody>
      </Table>
    </div>
    </>
  );
}

export default Tabela;