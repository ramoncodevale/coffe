import { useState, useEffect } from 'react';
import './Cadastro.css'
import Vector from '../../assets/vector-coffe.svg';
import axios from 'axios';



const Cadastro = () => {
  const [status, setStatus] = useState({
    type: '',
    message: '',

  })
  const [formValues, setFormValues] = useState({
    nome: '',
    sobreNome: '',
    email: '',
    senha: '',
    telefone: '',
  })

  const [formErrors, setFormErrors] = useState({
    nome: '',
    sobreNome: '',
    email: '',
    senha: '',
    telefone: '',
  })


  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    let errors = {}

    if (!formValues.nome) {
      errors.nome = 'o campo nome é obrigatório'
    }

    if (!formValues.sobreNome) {
      errors.sobreNome = 'o campo sobreNome é obrigatório'
    }

    if (!formValues.email) {
      errors.email = 'o campo email é obrigatório'
    }

    if (!formValues.telefone) {
      errors.telefone = 'o campo telefone é obrigatório'
    }

    if (!formValues.senha) {
      errors.senha = 'o campo senha é obrigatório'
    }

    setFormErrors(errors)


    try {
      const response = await axios.post('http://52.67.201.79:8080/api/usuario', formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      setStatus({
        type: 'success',
        message: response.data.message,
      })
    } catch (error) {
      setStatus({
        type: 'erro',
        message: 'erro  ao cadastrar o usuario',
      })
      console.log(error)
    }
  }

  return (
    <>
      <div className='cadastro'>
        <form className='cadastro-form' onSubmit={handleSubmit}>
          <h1 className='titulo-cadastro'>Cadastro</h1>

          <input
            type="text"
            name="nome"
            id="nome"
            placeholder='Nome:'
            value={formValues.nome}
            onChange={handleInputChange}
          />

          {formErrors.nome && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <input
            type="text"
            name="sobreNome"
            id="sobreNome"
            placeholder='Sobrenome:'
            value={formValues.sobreNome}
            onChange={handleInputChange}
          />

          {formErrors.nome && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <input
            type="email"
            name="email"
            id="email"
            placeholder='Email:'
            value={formValues.email}
            onChange={handleInputChange}
          />
          {formErrors.nome && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <input
            type="tel"
            name="telefone"
            id="telefone"
            placeholder='Telefone:'
            value={formValues.telefone}
            onChange={handleInputChange}
          />

          {formErrors.nome && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <input
            type="password"
            name="senha"
            id="senha"
            placeholder='Senha:'
            value={formValues.senha}
            onChange={handleInputChange}
          />

          {formErrors.nome && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <button type='submit'>Criar Cadastro</button>
        </form>
      </div>
      <img className='vector' src={Vector} alt='Vector café' />
    </>
  )
}

export default Cadastro
