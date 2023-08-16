import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const CadastrarRegistro = () => {
  const {
    register,
    trigger,
    formState: { errors }
  } = useForm();

  const onSubmit = async (e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  const COLORS = [
    "yellow",
    "#0F084B",
    "#DE1A1A",
    "pink"
    // ... (add more colors if needed)
  ];

  const contentChart = [
    {
      nome: 'Ramon',
      turno: 'noite',
      perda: 1200,
    },
    {
      nome: 'Roger',
      turno: 'manhã',
      perda: 1000,
    },
    {
      nome: 'Fernando',
      turno: 'tarde',
      perda: 3000,
    },
    {
      nome: 'Maria',
      turno: 'Manhã',
      perda: 6000,
    },
  ];

  const data = contentChart.map((item, index) => ({
    name: item.nome,
    y: item.perda,
    turno: item.turno,
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
        return `<b>${this.key}</b>: perda:${this.y.toLocaleString()}`;
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
        data: data,
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

      <div className='cadastro'>
        <form className='cadastro-form' onSubmit={onSubmit}>
          <h1 className='titulo-cadastro'>Cadastrar Registro</h1>
          <input type="number" name="date" id="date" placeholder='Data:'
            {...register("date", {
              required: true,
            })}
          />
          {errors.date && (
            <p>
              {errors.date.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}

<input type="number" name="turno" id="turno" placeholder='Turno:'
            {...register("turno", {
              required: true,
            })}
          />
          {errors.turno && (
            <p>
              {errors.turno.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}

          <input type="text" name="operador" id="operador" placeholder='Operador:'
            {...register("operador", {
              required: true,
            })}
          />
          {errors.operador && (
            <p>
              {errors.operador.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}

          <input type="number" name="ge" id="ge" placeholder='Ge % Turno:'
            {...register("ge", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })} />
          {errors.ge && (
            <p>
              {errors.ge.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}

          <input type="number" name="meta" id="meta" placeholder='Meta Por Hora:'
            {...register("meta", {
              required: true,
            })}
          />

          {errors.meta && (
            <p>
              {errors.meta.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}

          <input type="number" name="perda" id="perda" placeholder='Perda (min):'
            {...register("perda", {
              required: true,
            })}
          />

          {errors.perda && (
            <p>
              {errors.perda.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}


          <textarea type="text" name="comentarios" id="comentarios" placeholder='Comentários:'
            {...register("comentários", {
              required: true,
            })}
          />

          {errors.comentarios && (
            <p>
              {errors.comentarios.type === "required" &&
                "Por favor preencher esse campo"}
            </p>
          )}


          <button type='submit'>Criar Cadastro</button>
        </form>
      </div>

      <div className="radial" style={{ width: "100%", height: "400px", marginTop:'20px'}}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    </>
  );
};

export default CadastrarRegistro;
