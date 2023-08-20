import React, { useState, useEffect } from 'react';
import './Grafico.css';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from 'axios';


const GraficoMaquina = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://52.67.201.79:8080/api/maquina', {
          headers: {
            "Content-Type": 'application/json',
          }
        })
        setData(response.data)
        console.log(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])





  const COLORS = [
    "yellow",
    "#0F084B",
    "#DE1A1A",
    "pink"
    // ... (add more colors if needed)
  ];


  const chartData = data.map((item, index) => ({
    ...item,
    id: item.id,
    name: item.nome,
    y: item.metaHora,
    color: COLORS[index % COLORS.length],
  }));

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
        return `<b>${this.key}</b>: meta por hora:${this.y.toLocaleString()}`;
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
    <div className="card-grafico">
      <div className="radial" style={{ width: "100%", height: "400px", marginTop: '20px' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}

export default GraficoMaquina