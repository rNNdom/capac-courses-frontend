import React from "react";
import { useRouter } from "next/router";
import { buttonStyle } from "../../types";
import CoursesDropdown from "./CoursesDropdown";

function Index() {
  const router = useRouter();
  const onSelectCourse = (courseId: string) => {
    router.push(`/courses/detail/${courseId}`);
  };

  return (
    <div className="flex-auto m-20 mx-48 p-10">
      <div className="flex space-x-10 flex-col items-center px-10 pb-5 mb-5 sm:flex-row border-b-2">
        <div className="flex items-center">
          <button onClick={() => router.push(`/`)} className={buttonStyle}>
            Volver a Inicio
          </button>
        </div>
        <div className="text-2xl font-semibold ">
          <h1>Cursos</h1>
        </div>
        <div className="flex items-center">
          <button onClick={() => router.push(`/courses/new`)} className={buttonStyle}>
            Agregar curso
          </button>
        </div>
      </div>
      <div className=" px-10 flex flex-col">
        <CoursesDropdown onSelectCourse={onSelectCourse} />
      </div>
    </div>
  );
}

export default Index;
