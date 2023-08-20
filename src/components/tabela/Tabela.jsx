import React, { useState, useEffect } from 'react';
import Form from '../form/Form'
import './Tabela.css'
import axios from 'axios';

const Tabela = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://52.67.201.79:8080/api/turno', {
          headers: {
            "Content-Type": 'application/json',
          }
        })
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Form />
      <h1 className='titulo-tabela'>CHECAR (check)</h1>
      <div className='tabela-container'>
        <table className="custom-table">
          <thead>
            <tr>
              <th>TURNO</th>
              <th>META POR HORA</th>
              <th>PRODUZIDO</th>
              <th>QUALIDADE</th>
              <th>SHE</th>
              <th>DESP. EMBALAGEM</th>
              <th>DESP. CAFÉ</th>
              <th>MÁQUINA</th>
              <th>OPERADOR</th>
            </tr>
          </thead>
          <tbody>
          {data.map(item => (
  <tr key={item.id}>
    <td className='horario'>
      {item.producoes.map((producao, index) => (
        <div key={index}>{producao.horario.faixa}</div>
      ))}
    </td>
    {/* Restante das colunas */}
    <td>{item.maquina.metaHora}</td>
    <td>{item.produzido}</td>
    <td>{item.qualidade ? 'OK' : 'NOK'}</td>
    <td>{item.she ? 'OK' : 'NOK'}</td>
    <td>{item.desperdicioEmbalagem}</td>
    <td>{item.desperdicioCafe}</td>
    <td>{item.maquina.nome}</td>
    <td>{`${item.operador.nome} ${item.operador.sobreNome}`}</td>
  </tr>
))}

          </tbody>
        </table>
     </div> 
    </>
  )
}

export default Tabela;
