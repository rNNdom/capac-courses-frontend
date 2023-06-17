import axios from "axios";
import React, { useEffect, useState } from "react";
import { CapacitacionesEntry, buttonStyle } from "../../../../types";
import { useRouter } from "next/router";

export default function TrainingDetail({ id }: { id: number }) {
  const [capacitacion, setCapacitacion] = useState<CapacitacionesEntry>();
  const [loading, setLoading] = useState(true);
  const URL_BACKEND = "http://localhost:3000";
  useEffect(() => {
    const fetchCapacitacion = async () => {
      try {
        const response = await axios.get(`${URL_BACKEND}/api/capacitaciones/${id}`);
        setCapacitacion(response.data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching data or whatever");
      }
    };
    fetchCapacitacion();
  }, [id]);
  const router = useRouter();
  return loading ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">Cargando detalles de capacitación...</div>
  ) : (
    <div className="flex-auto flex-col items-center m-20 justify-center">
      <div className="flex flex-row gap-2 pb-4">
        <button className={buttonStyle} onClick={() => router.back()}>
          Volver
        </button>
        <h1 className="text-xl p-2 font-semibold">Detalle de capacitación</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Nombre capacitación:</h3>
          <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.name}</p>
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Descripción:</h3>
          <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.description}</p>
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Contenidos:</h3>
          <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.contents}</p>
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Duración (en meses):</h3>
          <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.duration}</p>
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Cursos:</h3>
          {capacitacion?.cursos.length ? (
            capacitacion.cursos.map((cursos, index: number) => (
              <ul key={index} className="bg-slate-200 p-2 w-full border rounded-md border-black">
                <li className="px-6 py-4">{cursos.id}</li>
                <li className="px-6 py-4">{cursos.name}</li>
                <li className="px-6 py-4">{cursos.contents}</li>
                <li className="px-6 py-4">{cursos.duration} meses</li>
              </ul>
            ))
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">No tiene ningún curso asociado</p>
          )}
        </label>
      </div>
    </div>
  );
}
