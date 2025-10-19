import { createContext, useContext, useState } from "react";
import { mockStudents } from "@/entities/student";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(mockStudents);

  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentContext);
}
