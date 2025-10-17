import { DashboardChart } from "@/widgets/dashboard-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { mockStudents } from "@/entities/student/model/mockStudents";
import { Users, User, UserPlus } from "lucide-react";

export function DashboardPage() {
    const totalStudents = mockStudents.length;
    const totalMales = mockStudents.filter((s) => s.gender === "Male").length;
    const totalFemales = mockStudents.filter((s) => s.gender === "Female").length;

    return (
        <div className="p-6 space-y-6">
            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

            <DashboardChart />

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Students */}
                <Card className="flex items-center gap-4 p-4 shadow-sm">
                    <Users className="text-blue-500 w-8 h-8" />
                    <div>
                        <CardTitle>Total Students</CardTitle>
                        <CardContent className="text-2xl font-semibold mt-1">
                            {totalStudents}
                        </CardContent>
                    </div>
                </Card>

                {/* Male Students */}
                <Card className="flex items-center gap-4 p-4 shadow-sm">
                    <User className="text-green-500 w-8 h-8" />
                    <div>
                        <CardTitle>Male Students</CardTitle>
                        <CardContent className="text-2xl font-semibold mt-1">
                            {totalMales}
                        </CardContent>
                    </div>
                </Card>

                {/* Female Students */}
                <Card className="flex items-center gap-4 p-4 shadow-sm">
                    <UserPlus className="text-pink-500 w-8 h-8" />
                    <div>
                        <CardTitle>Female Students</CardTitle>
                        <CardContent className="text-2xl font-semibold mt-1">
                            {totalFemales}
                        </CardContent>
                    </div>
                </Card>
            </div>

            {/* Recent Enrollments */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Recently Enrolled</h2>
                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Gender</th>
                                <th className="p-3">Date Enrolled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockStudents.slice(-5).map((student) => (
                                <tr key={student.id} className="border-t hover:bg-accent">
                                    <td className="p-3">
                                        {student.prefix} {student.firstName} {student.lastName}
                                    </td>
                                    <td className="p-3">{student.gender}</td>
                                    <td className="p-3">{student.dateEnrolled}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
