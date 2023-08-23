import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

import {
    format
} from 'date-fns'

const Form = () => {
    const [formData, setFormData] = useState({
        operador: '',
        periodo: '',
        ge: '',
        metaPorHora: '',
        planejado: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://52.67.201.79:8080/api/turno', formData);
                console.log('Resposta da API:', response.data); // Para ver a resposta da API no console
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        // Verificar se todos os campos obrigatórios estão preenchidos antes de enviar os dados
        if (formData.operador && formData.periodo && formData.data) {
            fetchData(); // Chamar a função fetchData para enviar os dados para a API
        }
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar o comportamento padrão de recarregar a página
        // Você pode adicionar mais validações aqui se necessário
        // Antes de enviar os dados, o useEffect será responsável por verificar e enviar
    };

    const today = new Date()

    const formateDate = format(today, 'dd/MM/yyyy')



    return (
        <form className="input-cadastro">
             <div className='input-container'>
                <label>Data</label>
                <input
                    type="text"
                    placeholder="Data"
                    name="data"
                    value={formateDate}
                />
            </div>

            <div className='input-container'>
                <label>Operador</label>
                <input
                    type="text"
                    placeholder="Operador"
                    name="operador"
                    value={formData.operador}
                    onChange={(e) => setFormData({ ...formData, operador: e.target.value })}
                />
            </div>

            <div className='input-container'>
                <label>Período</label>
                <input
                    type="text"
                    placeholder="Período"
                    name="periodo"
                    value={formData.periodo}
                    onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                />
            </div>

            <div className='input-container'>
                <label>Máquina</label>
                <input
                    type="text"
                    placeholder="Maquína"
                    name="maquina"
                    value={formData.maquina}
                    onChange={(e) => setFormData({ ...formData, maqunia: e.target.value })}
                />
            </div>


            <div className='input-container'>
                <label>Ge %</label>
                <input
                    type="text"
                    placeholder="GE%"
                    name="ge"
                    value={formData.ge}
                    onChange={(e) => setFormData({ ...formData, ge: e.target.value })}
                />
               </div>    


            <div className='input-container'>
            <label>Meta por Hora</label>
                <input
                    type="text"
                    placeholder="Meta por hora"
                    name="metaPorHora"
                    value={formData.metaPorHora}
                    onChange={(e) => setFormData({ ...formData, metaPorHora: e.target.value })}
                />
              </div>

              <div className='input-container'>
            <label>Planejado</label>
                <input
                    type="text"
                    placeholder="Planejado"
                    name="planejado"
                    value={formData.planejado}
                    onChange={(e) => setFormData({ ...formData, planejado: e.target.value })}
                />
              </div>

                <button onClick={handleSubmit}>Abrir Turno</button>
                
               
        </form>
    );
};

export default Form;