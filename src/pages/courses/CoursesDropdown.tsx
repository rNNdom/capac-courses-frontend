import React, { useEffect, useState } from "react";
import { CursosEntry } from "../../types";
import axios from "axios";
import { optionSelect } from "../../utils/utils";

function CoursesDropdown({ onSelectCourse }: { onSelectCourse: (courseId: string) => void }) {
  const [courses, setCourses] = useState<CursosEntry[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const URL_BACKEND = "http://200.13.4.231:3000";

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

  const handleButtonClick = () => {
    onSelectCourse(selectedCourse);
  };

  return (
    <div>
      <select className="p-2 text-base w-1/6 rounded-md border border-black" value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Cursos</option>
        {courses.map((option) => optionSelect(option))}
      </select>
      <button className="p-2 bg-blue-500 text-white rounded-md ml-2" onClick={handleButtonClick}>
        Ver detalles
      </button>
    </div>
  );
}

export default CoursesDropdown;
