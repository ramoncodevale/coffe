import { useState, useEffect } from 'react';
import './Cadastro.css'
import Vector from '../../assets/vector-coffe.svg';
import axios from 'axios';

import { useNavigate  } from 'react-router-dom';

const Cadastro = () => {
  const [status, setStatus] = useState({
    type: '',
    message: '',

  })
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    telephone: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    telephone: '',
  })

  const navigate = useNavigate()


  const { name, surname, email, password, telephone } = formValues;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    let errors = {}

    if (!formValues.name) {
      errors.name = 'o campo nome é obrigatório'
    }

    if (!formValues.surname) {
      errors.surname = 'o campo sobreNome é obrigatório'
    }

    if (!formValues.email) {
      errors.email = 'o campo email é obrigatório'
    }

    if (!formValues.telephone) {
      errors.telefhone = 'o campo telefone é obrigatório'
    }

    if (!formValues.password) {
      errors.password = 'o campo senha é obrigatório'
    }

    setFormErrors(errors)


    try {
      const response = await axios.post('https://coffe-server-1.onrender.com/cadastrar-usuario',{
        name: formValues.name,
        surname: formValues.surname,
        email: formValues.email,
        password: formValues.password,
        telephone: formValues.telephone
      ,});

      setStatus({
        type: 'success',
        message: response.data.message,
      })

      navigate('/')
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
            name="name"
            id="name"
            placeholder='Nome:'
            value={formValues.name}
            onChange={handleInputChange}
          />

          {formErrors.name && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <input
            type="text"
            name="surname"
            id="surname"
            placeholder='Sobrenome:'
            value={formValues.surname}
            onChange={handleInputChange}
          />

          {formErrors.surname && (
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
          {formErrors.email && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <input
            type="tel"
            name="telephone"
            id="telephone"
            placeholder='Telefone:'
            value={formValues.telephone}
            onChange={handleInputChange}
          />

          {formErrors.telephone && (
            <div>
              <p>{formErrors}</p>
            </div>
          )}

          <input
            type="password"
            name="password"
            id="password"
            placeholder='Senha:'
            value={formValues.password}
            onChange={handleInputChange}
          />

          {formErrors.password && (
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
