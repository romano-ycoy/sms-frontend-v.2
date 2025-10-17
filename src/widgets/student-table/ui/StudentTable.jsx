import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { Mail, Phone, SquarePen, Trash } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

export function StudentTable({ students, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (students.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg">
                <p className="text-muted-foreground">No students found</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead className="hidden lg:table-cell">Mobile</TableHead>
                            <TableHead className="hidden xl:table-cell">Registered</TableHead>
                            <TableHead className="hidden xl:table-cell">Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                {/* Name - Always visible */}
                                <TableCell className="font-medium">
                                    <div>
                                        <p className="font-semibold">
                                            {student.prefix && `${student.prefix} `}
                                            {student.firstName} {student.lastName}
                                        </p>
                                        {/* Show email on mobile */}
                                        <p className="text-sm text-muted-foreground md:hidden">
                                            {student.email}
                                        </p>
                                    </div>
                                </TableCell>

                                {/* Email - Hidden on mobile */}
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">{student.email}</span>
                                    </div>
                                </TableCell>

                                {/* Mobile - Hidden on tablet and below */}
                                <TableCell className="hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">{student.mobile}</span>
                                    </div>
                                </TableCell>

                                {/* Registration Date - Hidden on laptop and below */}
                                <TableCell className="hidden xl:table-cell">
                                    <Badge variant="secondary" className="font-normal">
                                        {formatDate(student.registrationDate)}
                                    </Badge>
                                </TableCell>

                                {/* Last Updated - Hidden on laptop and below */}
                                <TableCell className="hidden xl:table-cell">
                                    <Badge variant="outline" className="font-normal">
                                        {formatDate(student.lastUpdated)}
                                    </Badge>
                                </TableCell>

                                {/* Actions - Always visible */}
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(student)}
                                        >
                                            <SquarePen className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(student)}
                                        >
                                            <Trash className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}