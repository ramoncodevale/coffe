import React, { useState, useEffect } from 'react';
import './Grafico.css';
import axios from 'axios';
import { CListGroupItem, CListGroup, CBadge, CTooltip, CButton } from '@coreui/react';
import { LiaCalendar } from "react-icons/lia"
import { BsStopwatch } from "react-icons/bs"
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

const GraficoMaquina = () => {
  const [data, setData] = useState([]);
  const [producoes, setProducoes] = useState([]);
  const [periodo, setPeriodo] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState("");
  const [selectedFilterDate, setSelectedFilterDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTurno, setSelectedTurno] = useState(1); 
  const [filteredDataByTurno, setFilteredDataByTurno] = useState([]);


  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedFilterDate = format(selectedFilterDate, "dd/MM/yyyy");
        const response = await axios.get(`https://server-production-9d29.up.railway.app/listar/turno/${selectedTurno}`, {
          params: {
            date: formattedFilterDate,
            periodoId: selectedTurno || null, // Use selectedTurno ou null
          },
          headers: {
            "Content-Type": 'application/json',
          }
        });
    
        setData(response.data.producoesRegistro);
        setProducoes(response.data.producoes);
      
      } catch (error) {
        console.log(error);
      }
    };
    

    fetchData();
  }, [selectedFilterDate, selectedTurno]); // Atualize quando a data ou o turno selecionado mudar

  const totalProduzidoDoTurno = data.reduce((total, item) => total + item.quantidade, 0);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    setShowApplications(false);
  };

  const today = new Date();

  const toggleApplications = () => {
    setShowApplications(!showApplications);
    setShowDatePicker(false);
  };

  useEffect(() => {
    const fetchPeriodo = async () => {
      try {
        const response = await axios.get('https://server-production-9d29.up.railway.app/listar/periodo');
        setPeriodo(response.data);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os periodo:', error);
      }
    };

    fetchPeriodo();
  }, []);


  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.data);
    return itemDate.toDateString() === selectedFilterDate.toDateString();
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedFilterDate(date);
    setShowDatePicker(false);
  };

  return (
    <>
      <section className="relatorio">
        <h1>Relatórios de produções</h1>

        <CListGroup className="list">
          <CListGroupItem className="d-flex justify-content-around align-items-center text-black"
            style={{ backgroundColor: "#A4663C", border: "none" }}>
            Turnos
            <div className="icons-section" >
              <CTooltip
                content="Período"
                placement="top"
              >
                <CButton style={{ backgroundColor: "#A4663C", border: "none" }} onClick={toggleDatePicker}>
                  <LiaCalendar fontSize={25} color="#000" />

                  {showDatePicker && (
                    <div className="date-picker-wrapper">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={minDate}
                        maxDate={today}
                        inline
                        locale={ptBR}
                      />
                    </div>
                  )}
                </CButton>
              </CTooltip>

              <CTooltip
                content="Turnos"
                placement="top"
              >
                <CButton onClick={toggleApplications} style={{ backgroundColor: "#A4663C", border: "none" }}>
                  <BsStopwatch fontSize={20} color="#000" style={{ marginLeft: "10px" }} />
                </CButton>
              </CTooltip>
              {showApplications && (
                <div className="section-select">
                  <select
  name="turno"
  id="turno"
  className="select"
  value={selectedTurno || ""}
  onChange={(e) => {
    setSelectedTurno(e.target.value || null); // Defina como null se o valor for vazio
    setData([]); // Limpe os dados antigos quando um novo turno for selecionado
    setProducoes([]);
  }}
>
  <option value="">Selecione um Turno</option>
  {periodo.map((periodo) => (
    <option key={periodo.id} value={periodo.id}>
      {periodo.turno}
    </option>
  ))}
</select>

                </div>
              )}
            </div>
          </CListGroupItem>
          {/* Mostrar os resultados filtrados */}
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Operador<CBadge color="primary" shape="rounded-pill">
              {producoes.map((item) => item.operadore.nome)}
            </CBadge>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Ge %<CBadge color="primary" shape="rounded-pill">
              {producoes.map((item) => item.ger)}
            </CBadge>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Máquina<CBadge color="primary" shape="rounded-pill">
              {producoes.map((item) => item.maquina.nome)}
            </CBadge>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Planejado<CBadge color="primary" shape="rounded-pill">
              {producoes.map((item) => item.planejado)}
            </CBadge>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Total produzido <CBadge color="primary" shape="rounded-pill">
              {totalProduzidoDoTurno}
            </CBadge>
          </CListGroupItem>
  
        </CListGroup>
      </section>
    </>
  )
}

export default GraficoMaquina;
