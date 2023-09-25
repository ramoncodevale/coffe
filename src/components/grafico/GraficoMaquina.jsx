import React, { useState, useEffect } from 'react';
import './Grafico.css';
import axios from 'axios';
import { CListGroupItem, CListGroup,  CTooltip, CButton } from '@coreui/react';
import { LiaCalendar } from "react-icons/lia"
import { BsStopwatch } from "react-icons/bs"
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";
import CoffeError from "../../assets/coffe.jpg"

const GraficoMaquina = () => {
  const [data, setData] = useState([]);
  const [producoes, setProducoes] = useState([]);
  const [periodo, setPeriodo] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState("");
  const [selectedFilterDate, setSelectedFilterDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTurno, setSelectedTurno] = useState(1); 

  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  // Estados para armazenar os valores filtrados
  const [filteredData, setFilteredData] = useState([]);
  const initialDate = new Date();
  const [selectedDateFilter, setSelectedDateFilter] = useState(initialDate);
  const [selectedPeriodoFilter, setSelectedPeriodoFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedFilterDate = selectedDateFilter
          ? format(selectedDateFilter, "yyyy-MM-dd")
          : "";

        const response = await axios.get(`
        https://coffe-server-1.onrender.com/listar/turno/${selectedTurno}`, {
          params: {
            date: formattedFilterDate,
          },
          headers: {
            "Content-Type": 'application/json',
          }
        });

        setData(response.data.producoesRegistro);
        setProducoes(response.data.producoes);

        const minDateFromAPI = new Date(response.data.producoes[0].data);
        setMinDate(minDateFromAPI);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedDateFilter, selectedTurno]);

  useEffect(() => {
    const fetchPeriodo = async () => {
      try {
        const response = await axios.get('https://coffe-server-1.onrender.com/listar/periodo');
        setPeriodo(response.data);
        if (response.data.length > 0) {
          setSelectedTurno(response.data[0].turno);
        }
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os periodo:', error);
      }
    };

    fetchPeriodo();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDateFilter(date);
    setShowDatePicker(false);
  };

  // Filtrar as produções com base na data e no período selecionados
  const filteredProducoes = producoes.filter((producao) => {
    return (
      (!selectedDateFilter || format(new Date(producao.data), "yyyy-MM-dd") === format(selectedDateFilter, "yyyy-MM-dd")) &&
      (!selectedPeriodoFilter || producao.periodo.turno === selectedPeriodoFilter)
    );
  });

  const totalProduzidoDoTurno = filteredData.reduce((total, item) => total + item.quantidade, 0);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    setShowApplications(false);
  };

  const today = new Date();

  const toggleApplications = () => {
    setShowApplications(!showApplications);
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

                </CButton>
              </CTooltip>
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
                      setSelectedTurno(e.target.value || null);
                      setShowApplications(false)
                    }}
                  >
                    <option value="">Selecione um Turno</option>
                    {periodo.map((periodo) => (
                      <option key={periodo.id} value={periodo.turno}>
                        {periodo.turno}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </CListGroupItem>
          {filteredProducoes.length === 0 ? (
            <>
                <img src={CoffeError} alt="coffe error" style={{ width: "100%", height: "400px"}} />
                <CListGroupItem className="text-center" style={{ backgroundColor: "#A4663C",color: "#221518", border: "none"}}><strong>Nenhum dado disponível para o filtro selecionado.</strong></CListGroupItem>
                </>
          ) : (
          <>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Data Selecionada<div>
              <strong>
            {selectedDate.toLocaleDateString("pt-BR")}
            </strong>
            </div>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Turno Selecionado<div>
            <strong>
            {selectedTurno}
            </strong>
            </div>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Operador<div>
              <strong>
              {filteredProducoes.map((item) => item.operadore.nome)}
              </strong>
            </div>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Ge %<div>
              <strong>
              {filteredProducoes.map((item) => item.ger)}
              </strong>
            </div>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Máquina<div>
              <strong>
              {filteredProducoes.map((item) => item.maquina.nome)}
              </strong>
            </div>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Planejado<div>
              <strong>
              {filteredProducoes.map((item) => item.planejado)}
              </strong>
            </div>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between align-items-center">
            Total produzido <div>
            <strong>
            {filteredProducoes.map((item) => item.maquina.metaHora)}
            </strong>
            </div>
          </CListGroupItem>
          </>
          )}    
        </CListGroup>
        <div style={{ marginTop: "10px"}}>
        <Link to="/tabela" className="link-registro">
      Criar mais registros
    </Link>
        </div>
      </section>
    </>
  )
}

export default GraficoMaquina;