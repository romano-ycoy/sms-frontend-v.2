import { useState, useMemo } from "react";
import { useStudents } from "@/entities/student/model/StudentProvider";
import { StudentTable, Pagination } from "@/widgets/student-table";
import { SearchInput } from "@/features/search-students";
import { FilterDropdown } from "@/features/filter-students";
import { AddStudentDialog } from "@/features/add-student";
import { EditStudentDialog } from "@/features/edit-student";
import { DeleteStudentDialog } from "@/features/delete-student";
import { toast } from "sonner";

export function StudentsPage() {
  // ✅ Global student context (shared with Dashboard)
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  // 🔍 Local UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ email: "All" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // 🧩 Dialog states
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null);

  // 🧠 Filter and search logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        searchQuery === "" ||
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.mobile.includes(searchQuery);

      const matchesEmail =
        filters.email === "All" ||
        student.email.toLowerCase().includes(filters.email.toLowerCase());

      return matchesSearch && matchesEmail;
    });
  }, [students, searchQuery, filters]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ⚙️ Handlers
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ email: "All" });
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleEdit = (student) => setStudentToEdit(student);

  const handleDelete = (student) => setStudentToDelete(student);

  const handleConfirmDelete = (student) => {
    deleteStudent(student.id);
    toast.success("Student Deleted", {
      description: `${student.prefix} ${student.firstName} ${student.lastName} has been removed.`,
    });
    setStudentToDelete(null);
  };

  const handleAddStudent = (newStudent) => {
    const id = Date.now();
    const registrationDate = new Date().toISOString();
    addStudent({ id, ...newStudent, registrationDate });

    toast.success("Student Added", {
      description: `${newStudent.firstName} ${newStudent.lastName} has been successfully added.`,
    });
  };

  const handleUpdateStudent = (updatedStudent) => {
    updateStudent(updatedStudent);
    toast.success("Student Updated", {
      description: `${updatedStudent.prefix} ${updatedStudent.firstName} ${updatedStudent.lastName} has been updated.`,
    });

    setStudentToEdit(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 lg:p-6 space-y-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Students</h1>
          <p className="text-sm text-muted-foreground">
            Manage your student records
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
          <div className="flex gap-2">
            <FilterDropdown
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
            <AddStudentDialog onAddStudent={handleAddStudent} />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing {paginatedStudents.length} of {filteredStudents.length} students
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 px-4 lg:px-6">
        <StudentTable
          students={paginatedStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex-shrink-0 p-4 lg:p-6 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Delete Dialog */}
      <DeleteStudentDialog
        open={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
      />

      {/* Edit Dialog */}
      <EditStudentDialog
        open={!!studentToEdit}
        onClose={() => setStudentToEdit(null)}
        student={studentToEdit}
        onUpdateStudent={handleUpdateStudent}
      />
    </div>
  );
}
