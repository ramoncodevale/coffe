import { useForm } from "react-hook-form";

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

   

    </>
  );
};

export default CadastrarRegistro;
