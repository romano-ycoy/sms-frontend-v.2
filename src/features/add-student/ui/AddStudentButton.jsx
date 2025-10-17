import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function AddStudentButton({ onClick }) {
    return (
        <Button 
        onClick={onClick}
        className="bg-emerald-500"
        >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
        </Button>
    );
}