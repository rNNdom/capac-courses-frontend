import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { CapacitacionesEntry, HEADERS_CAPACITACION } from "../../types";
import { useRouter } from "next/router";

const TrainingsTable = () => {
  const [capacitacion, setCapacitacion] = useState<CapacitacionesEntry[]>();
  const URL_BACKEND = "http://localhost:3000";

  useEffect(() => {
    const fetchCapacitacion = async () => {
      try {
        const response = await axios.get(`${URL_BACKEND}/api/capacitaciones`);
        setCapacitacion(response.data);
      } catch (error) {
        console.error("error fetching data or whatever");
      }
    };

    fetchCapacitacion();
  }, []);
  const router = useRouter();
  if (!capacitacion) {
    return <div className="flex justify-center">Cargando detalles de capacitación...</div>;
  }

  const handleRowClick = (id: number) => {
    router.push(`/trainings/detail/${id}`);
  };

  return (
    <div>
      <Table headers={HEADERS_CAPACITACION}>
        {capacitacion.map((capacitacion) => (
          <tr key={capacitacion.id} onClick={() => handleRowClick(capacitacion.id)} className="odd:bg-slate-200 hover:bg-slate-300 w-full border rounded-md border-black">
            <td className="px-6 py-4">{capacitacion.id}</td>
            <td className="px-6 py-4">{capacitacion.name}</td>
            <td className="px-6 py-4">{capacitacion.description}</td>
            <td className="px-6 py-4">{capacitacion.contents}</td>
            <td className="px-6 py-4">{capacitacion.duration} meses</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default TrainingsTable;