import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { EditStudentForm } from "@/features/edit-student";
import { toast } from "sonner";

export function EditStudentDialog({
  open = false,
  onClose = () => {},
  student = null,
  onUpdateStudent = () => {},
}) {


  // Prevent rendering if no student is selected
  if (!student) return null;

  const handleSubmit = (updatedData) => {
    const updatedStudent = {
      ...student,
      ...updatedData,
      lastUpdated: new Date().toISOString(), // track edit time
    };

    onUpdateStudent(updatedStudent);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
        aria-label="Edit Student Details"
      >
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Modify the student’s details. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <EditStudentForm
          student={student}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
