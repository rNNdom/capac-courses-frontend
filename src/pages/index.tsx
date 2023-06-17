import { useRouter } from "next/router";
import React from "react";
import { buttonStyle } from "../types";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">CRUD Capacitaciones y Cursos</h1>
      <div className="flex flex-row gap-2">
        <button className={buttonStyle} onClick={() => router.push("trainings")}>
          Capacitaciones
        </button>
        <button className={buttonStyle} onClick={() => router.push("courses")}>
          Cursos
        </button>
      </div>
    </div>
  );
};

export default HomePage;
