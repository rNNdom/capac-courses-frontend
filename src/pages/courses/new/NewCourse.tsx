import axios from "axios";
import { CursosEntry, buttonStyle } from "../../../types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function NewCourse() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CursosEntry>();
  const URL_BACKEND = "http://localhost:3000";
  const router = useRouter();
  const onSubmit = async (data: CursosEntry) => {
    try {
      const dispatchData = {
        name: data.name,
        contents: data.contents,
        duration: Number(data.duration),
      };

      await axios.post(`${URL_BACKEND}/api/cursos`, dispatchData);
    } catch (error) {
      console.error(error);
    }
    reset();
    router.back();
  };

  return (
    <div className="flex-col items-center m-20">
      <div className="flex flex-row gap-2 pb-4">
        <button className={buttonStyle} onClick={() => router.back()}>
          Volver
        </button>
        <h1 className="text-xl p-2 font-semibold">Ingreso de nuevo curso</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex flex-col gap-2 w-full">
          <label className="flex flex-row gap-2 w-full">
            <h3 className="items-center flex">Nombre:</h3>
            <input className="p-2 rounded-md w-full border border-black" {...register("name", { required: true })} placeholder="Nombre de curso" />
            {errors.name && <span className="text-red text-sm items-center">Campo requerido</span>}
          </label>

          <label className="flex flex-row gap-2 w-full">
            <h3 className="items-center flex">Contenidos:</h3>
            <input className="p-2 rounded-md w-full border border-black" {...register("contents", { required: true })} placeholder="Contenidos del curso" />
            {errors.contents && <span className="text-red text-sm items-center">Campo requerido</span>}
          </label>

          <label className="flex flex-row gap-2 w-full">
            <h3 className="items-center flex">Duración (en meses):</h3>
            <input className="p-2 rounded-md w-full border border-black" {...register("duration", { required: true })} placeholder="Duración del curso" />
            {errors.duration && <span className="text-red text-sm items-center">Campo requerido</span>}
          </label>

          <div className="flex justify-center">
            <button className={buttonStyle}>Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewCourse;
