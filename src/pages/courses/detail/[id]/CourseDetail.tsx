import axios from "axios";
import React, { useEffect, useState } from "react";
import { CursosEntry, buttonStyle } from "../../../../types";
import { useRouter } from "next/router";

export default function CourseDetail({ id }: { id: number }) {
  const [course, setCourse] = useState<CursosEntry>();
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  const URL_BACKEND = "http://localhost:3000";
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${URL_BACKEND}/api/cursos/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching data or whatever");
      }
    };
    fetchCourse();
  }, [id]);
  const router = useRouter();

  const handleDeleteCourse = async () => {
    try {
      await axios.delete(`${URL_BACKEND}/api/cursos/${id}`);
      router.push("/courses");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${URL_BACKEND}/api/cursos/${id}`, course);
      setIsEditable(false); // Exit the edit mode
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = () => {
    setIsEditable(true);
  };

  return loading ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">Cargando detalles de curso...</div>
  ) : (
    <div className="flex-auto flex-col items-center m-20 justify-center">
      <div className="flex flex-row gap-2 pb-4">
        <button className={buttonStyle} onClick={() => router.back()}>
          Volver
        </button>
        <h1 className="text-xl p-2 font-semibold">Detalle de curso</h1>
        <button className={buttonStyle + " items-end justify-end flex-none bg-red-600"} onClick={() => handleDeleteCourse()}>
          Eliminar
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Nombre curso:</h3>
          {isEditable ? (
            <input className="bg-slate-200 p-2 rounded-md w-full border border-black" value={course?.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">{course?.name}</p>
          )}
        </label>

        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Contenidos:</h3>
          {isEditable ? (
            <input className="bg-slate-200 p-2 rounded-md w-full border border-black" value={course?.contents} onChange={(e) => setCourse({ ...course, contents: e.target.value })} />
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">{course?.contents}</p>
          )}
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Duración (en meses):</h3>
          {isEditable ? (
            <input className="bg-slate-200 p-2 rounded-md w-full border border-black" value={course?.duration} onChange={(e) => setCourse({ ...course, duration: e.target.value })} />
          ) : (
            <p className="bg-slate-200 p-2 rounded-md w-full">{course?.duration}</p>
          )}
        </label>
        <div>
          {isEditable ? (
            <button className={buttonStyle} onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            <button className={buttonStyle} onClick={handleEditClick}>
              Editar capacitación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
