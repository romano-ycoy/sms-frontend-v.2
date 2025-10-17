import { useState, useMemo } from "react";
import { mockStudents } from "@/entities/student";
import { StudentTable, Pagination } from "@/widgets/student-table";
import { SearchInput } from "@/features/search-students";
import { FilterDropdown } from "@/features/filter-students";
import { AddStudentButton } from "@/features/add-student";

export function StudentsPage() {
    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ email: "All" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter and search logic
    const filteredStudents = useMemo(() => {
        return mockStudents.filter((student) => {
            // Search filter
            const matchesSearch = 
                searchQuery === "" ||
                student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.mobile.includes(searchQuery);

            // Email filter
            const matchesEmail = 
                filters.email === "All" ||
                student.email.toLowerCase().includes(filters.email.toLowerCase());

            return matchesSearch && matchesEmail;
        });
    }, [searchQuery, filters]);

    // Pagination logic
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

    // Handlers
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = (student) => {
        console.log("Edit student:", student);
        // TODO: Implement edit functionality
    };

    const handleDelete = (student) => {
        console.log("Delete student:", student);
        // TODO: Implement delete functionality
    };

    const handleAddStudent = () => {
        console.log("Add new student");
        // TODO: Implement add student modal
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex-shrink-0 p-4 lg:p-6 space-y-4">
                {/* Title */}
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Students</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your student records
                    </p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <SearchInput
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className="flex gap-2">
                        <FilterDropdown
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onResetFilters={handleResetFilters}
                        />
                        <AddStudentButton onClick={handleAddStudent} />
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
        </div>
    );
}