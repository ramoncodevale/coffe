import React, { useState, useEffect } from 'react';
import './Grafico.css';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from 'axios';


const GraficoMaquina = () => {
  const [data, setData] = useState([])
  const [producoes, setProducoes] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://server-production-9d29.up.railway.app/listar/turno/1', {
          headers: {
            "Content-Type": 'application/json',
          }
        })
        setData(response.data.producoesRegistro)
        console.log(response.data.producoesRegistro)

        
        setProducoes(response.producoes.producoes)
        console.log(response.producoes.producoes)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])


  const COLORS = ['green', 'red'];

  // Calculate the sum of quantities
  const somaQuantidade = data.reduce((total, item) => total + item.quantidade, 0);

  // Create chart data with only the sum
  const chartData = [
    {
      name: somaQuantidade,
      y: somaQuantidade,
      color: COLORS[0], // You can set the color as needed
    },
  ];

  const options = {
    chart: {
      type: "pie",
      height: 400,
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    tooltip: {
      formatter: function () {
        return `<b>meta por hora:</b>: ${this.y.toLocaleString()}`;
      },
    },
    plotOptions: {
      pie: {
        innerSize: "60%",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "operador",
        data: chartData,
        showInLegend: true,
      },
    ],
    accessibility: {
      enabled: false,
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
      itemWidth: 150,
      itemMarginBottom: 10,
      itemStyle: {
        fontWeight: "normal",
        color: "#fff",
      },
    },
  };

  return (
    <>
      <h1>Relatórios de produções</h1>
    <div className="card-grafico">
      <div className="radial" style={{ width: "100%", height: "400px", marginTop: '20px' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
    </>
  )
}

export default GraficoMaquina