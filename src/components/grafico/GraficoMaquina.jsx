import React, { useState, useEffect } from 'react';
import './Grafico.css';
import axios from 'axios';
import { CListGroupItem, CListGroup,  CTooltip, CButton, CSpinner } from '@coreui/react';
import { LiaCalendar } from "react-icons/lia"
import { BsStopwatch } from "react-icons/bs"
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";
import CoffeError from "../../assets/coffe.jpg"

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"

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
  const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(false)

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

  const formatted = filteredProducoes
  .map((job) => ({
    ...job,
    operadore: job.operadore.nome,
    data: format(new Date(job.data), "dd/MM/yyyy"),
    planejado: parseInt(job.planejado),
    ger: parseInt(job.ger),
    metaHora: parseInt(job.maquina.metaHora),
  }))
 


  const options = {
    chart: {
      backgroundColor: "transparent",
      height: 400,
      type: "column",
      plotBorderWidth: 0 ,
    },
    title: "jobs",
    tooltip: {
      formatter: function () {
        const category = formatted[this.point.index];
        const dataType = this.series.name === "Planejado" ? "Planejado" : "Produzido";
        return `<strong>${dataType}:</strong> ${this.y.toLocaleString()} <br></br> <strong>Operador:</strong> ${category.operadore} <br></br> 
        <strong>GE%:</strong> ${category.ger}
        `;
      },
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      style: {
        color: '#dedede', // Cor do texto do tooltip
      },
    },
    xAxis: {
      categories: formatted.map((job) => job.data),
      labels: {
        style: {
          color: "#212121",
        },
      },
      min: 0,
    },
    yAxis: {
      title: {
        text: "Valores planejados",
      color: "#000" // Altere o título do eixo y conforme necessário
      },
      labels: {
        fontWeight: "normal",
        style: {
          color: "#000",
        },
      },
    },
    
    legend: {
      verticalAlign: "top",
      itemCheckboxStyle: {
        marginBottom: "-20px",
      },
      itemHiddenStyle: {
        color: "#ccc",
      },
      itemStyle: {
        fontWeight: "normal",
        color: "#000",
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1000,
            },
            chartOptions: {
              legend: {
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
              },
            },
          },
        ],
      },
    },
    series: [
      // {
      //   type: "line",
      //   name: "Ge %",
      //   color: "darkgreen",
      //   data: formatted.map((job) => job.ger),
      //   connectNulls: true,
      // },
    
      {
        type: "column",
        name: "Planejado",
        data: formatted.map((job) => job.planejado),
        color: "#D7263D",
        connectNulls: true,
      },
      {
        type: "column",
        name: "Produzido",
        data: formatted.map((job) => job.metaHora),
        color: "#20FC8F",
        connectNulls: true,
      },
    ],
    accessibility: {
      enabled: false
    }
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
          </CListGroup>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
            <CSpinner color="white" />
          </div>
          ) : filteredProducoes.length === 0 ? (
            <>
                <img src={CoffeError} alt="coffe error" style={{ width: "100%", height: "400px"}} />
                <CListGroupItem className="text-center" style={{ backgroundColor: "#A4663C",color: "#221518", border: "none"}}><strong>Nenhum dado disponível para o filtro selecionado.</strong></CListGroupItem>
                </>
          ) : (
          <>
               <div
              className="box-chart"
              style={{ height: "400px" }}
            >
              <HighchartsReact
                className="hightcharts"
                highcharts={Highcharts}
                options={options}
              />
            </div>
          </>
          )}
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