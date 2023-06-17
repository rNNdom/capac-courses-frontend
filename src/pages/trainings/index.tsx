import React from "react";
import { useRouter } from "next/router";
import TrainingsTable from "./TrainingsTable";
import { buttonStyle } from "../../types";

function Index() {
  const router = useRouter();
  return (
    <div className="flex-auto m-20 mx-48 p-10">
      <div className="flex space-x-10 flex-col items-center p-10 sm:flex-row">
        <div className="text-2xl font-semibold ">
          <h1>Capacitaciones</h1>
        </div>
        <div className="flex items-center">
          <button onClick={() => router.push(`/trainings/new`)} className={buttonStyle}>
            Nueva Capacitación
          </button>
        </div>
      </div>

      <div>
        <TrainingsTable />
      </div>
    </div>
  );
}

export default Index;
