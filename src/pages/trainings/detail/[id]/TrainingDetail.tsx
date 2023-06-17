import axios from "axios";
import React, { useEffect, useState } from "react";
import { CapacitacionesEntry, CursosEntry, buttonStyle } from "../../../../types";
import { useRouter } from "next/router";
import { optionSelect } from "../../../../utils/utils";

export default function TrainingDetail({ id }: { id: number }) {
  const [capacitacion, setCapacitacion] = useState<CapacitacionesEntry>();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CursosEntry[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [isEditable, setIsEditable] = useState(false);

  const router = useRouter();
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
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(`${URL_BACKEND}/api/cursos`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCursos();
  }, []);
  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
  };
  const handleDeleteTraining = async () => {
    try {
      await axios.delete(`${URL_BACKEND}/api/capacitaciones/${id}`);
      router.push("/trainings");
    } catch (error) {
      console.error(error);
    }
  };
  const handleButtonClick = async () => {
    try {
      await axios.put(`${URL_BACKEND}/api/capacitaciones/${id}/${selectedCourse}`);
      console.log("capacitacionID: ", id, "cursoID: ", selectedCourse);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${URL_BACKEND}/api/capacitaciones/${id}`, capacitacion);
      setIsEditable(false); // Exit the edit mode
    } catch (error) {
      console.error(error);
    }
  };
  return loading ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">Cargando detalles de capacitación...</div>
  ) : (
    <div className="flex-auto flex-col items-center m-20 justify-center">
      <div className="flex flex-row gap-2 pb-4">
        <button className={buttonStyle + ""} onClick={() => router.back()}>
          Volver
        </button>
        <h1 className="text-xl p-2 font-semibold">Detalle de capacitación</h1>
        <button className={buttonStyle + " items-end justify-end flex-none bg-red-600"} onClick={() => handleDeleteTraining()}>
          Eliminar
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Nombre capacitación:</h3>
          {isEditable ? (
            <input className="bg-slate-200 p-2 rounded-md w-full border border-black" value={capacitacion?.name} onChange={(e) => setCapacitacion({ ...capacitacion, name: e.target.value })} />
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.name}</p>
          )}
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Descripción:</h3>
          {isEditable ? (
            <input
              className="bg-slate-200 p-2 rounded-md w-full border border-black"
              value={capacitacion?.description}
              onChange={(e) => setCapacitacion({ ...capacitacion, description: e.target.value })}
            />
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.description}</p>
          )}
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Contenidos:</h3>
          {isEditable ? (
            <input className="bg-slate-200 p-2 rounded-md w-full border border-black" value={capacitacion?.contents} onChange={(e) => setCapacitacion({ ...capacitacion, contents: e.target.value })} />
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.contents}</p>
          )}
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Duración (en meses):</h3>
          {isEditable ? (
            <input
              className="bg-slate-200 p-2 rounded-md w-full border border-black"
              value={capacitacion?.duration}
              onChange={(e) => setCapacitacion({ ...capacitacion, duration: Number(e.target.value) })}
            />
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">{capacitacion?.duration}</p>
          )}
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Cursos:</h3>
          {capacitacion?.cursos.length ? (
            capacitacion.cursos.map((cursos, index: number) => (
              <ul key={index} className="bg-slate-200 p-2 w-full rounded-md flex-row flex gap-4">
                <li>Nombre: {cursos.name}</li>
                <li>Contenidos: {cursos.contents}</li>
                <li>Duración en meses: {cursos.duration} meses</li>
              </ul>
            ))
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">No tiene ningún curso asociado</p>
          )}
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Agregar curso:</h3>

          <select className="p-2 text-base w-1/6 rounded-md border border-black" onChange={handleCourseChange}>
            <option value="">Cursos</option>
            {courses.map((option) => optionSelect(option))}
          </select>
          <button className={buttonStyle} onClick={handleButtonClick}>
            Agregar Curso
          </button>
          {isEditable ? (
            <button className="p-2 bg-blue-500 text-white rounded-md ml-2" onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            <button className="p-2 bg-blue-500 text-white rounded-md ml-2" onClick={handleEditClick}>
              Editar capacitación
            </button>
          )}
        </label>
      </div>
    </div>
  );
}
