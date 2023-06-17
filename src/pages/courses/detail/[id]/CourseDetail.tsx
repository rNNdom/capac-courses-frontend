import axios from "axios";
import React, { useEffect, useState } from "react";
import { CursosEntry, buttonStyle } from "../../../../types";
import { useRouter } from "next/router";

export default function CourseDetail({ id }: { id: number }) {
  const [course, setCourse] = useState<CursosEntry>();
  const [loading, setLoading] = useState(true);
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
  return loading ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">Cargando detalles de curso...</div>
  ) : (
    <div className="flex-auto flex-col items-center m-20 justify-center">
      <div className="flex flex-row gap-2 pb-4">
        <button className={buttonStyle} onClick={() => router.back()}>
          Volver
        </button>
        <h1 className="text-xl p-2 font-semibold">Detalle de curso</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Nombre curso:</h3>
          <p className="bg-slate-200 p-2 rounded-md w-full">{course?.name}</p>
        </label>

        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Contenidos:</h3>
          <p className="bg-slate-200 p-2 rounded-md w-full">{course?.contents}</p>
        </label>
        <label className="flex-row flex gap-4">
          <h3 className="flex items-center">Duración (en meses):</h3>
          <p className="bg-slate-200 p-2 rounded-md w-full">{course?.duration}</p>
        </label>
      </div>
    </div>
  );
}
