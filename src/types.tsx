export interface CapacitacionesEntry {
  id: number;
  name: string;
  description: string;
  contents: string;
  duration: number;
  cursos: CursosEntry[];
}
export interface CursosEntry {
  id: number;
  name: string;
  contents: string;
  duration: number;
}

export const HEADERS_CAPACITACION = [
  { name: "id", label: "ID", width: 50 },
  { name: "name", label: "Nombre", width: 130 },
  { name: "description", label: "Descripción", width: 130 },
  { name: "contents", label: "Contenido", width: 130 },
  { name: "duration", label: "Duración (meses)", width: 130 },
];

export const buttonStyle = "px-4 py-2 w-auto bg-blue-500 text-white rounded hover:bg-blue-600 ";
