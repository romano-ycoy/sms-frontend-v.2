import { useStudents } from "@/entities/student/model/StudentProvider";
import { Card } from "@/shared/ui/card";
import { Users, Venus, Mars, GraduationCap } from "lucide-react";

export function DashboardPage() {
  const { students } = useStudents();

  // Totals
  const totalStudents = students.length;
  const enrolledStudents = students.length; // all enrolled for demo

  // Gender counts
  const maleCount = students.filter(s => s.prefix === "Mr.").length;
  const femaleCount = students.filter(
    s => s.prefix === "Ms." || s.prefix === "Mrs."
  ).length;

  // Recent registrations (sort by newest)
  const recentRegistrations = [...students]
    .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card className="flex flex-col gap-2 py-4 px-6">
          <div className="flex items-center justify-between">
            <p className="text-l font-normal text-muted-foreground">Total Students</p>
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-5xl font-semibold">{totalStudents}</p>
          <p className="text-xs text-muted-foreground">
            Current total number of students.
          </p>
        </Card>

        {/* Enrolled Students */}
        <Card className="flex flex-col gap-2 py-4 px-6">
          <div className="flex items-center justify-between">
            <p className="text-l font-normal text-muted-foreground">Enrolled Students</p>
            <GraduationCap className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-5xl font-semibold">{enrolledStudents}</p>
          <p className="text-xs text-muted-foreground">
            Current total number of enrolled students.
          </p>
        </Card>

        {/* Male Students */}
        <Card className="flex flex-col gap-2 py-4 px-6">
          <div className="flex items-center justify-between">
            <p className="text-l font-normal text-muted-foreground">Male Students</p>
            <Mars className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-5xl font-semibold">{maleCount}</p>
          <p className="text-xs text-muted-foreground">
            Current total number of male students.
          </p>
        </Card>

        {/* Female Students */}
        <Card className="flex flex-col gap-2 py-4 px-6">
          <div className="flex items-center justify-between">
            <p className="text-l font-normal text-muted-foreground">Female Students</p>
            <Venus className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-5xl font-semibold">{femaleCount}</p>
          <p className="text-xs text-muted-foreground">
            Current total number of female students.
          </p>
        </Card>
      </div>

      {/* Recent registrations */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Recent Registrations</h2>
        <div className="space-y-2">
          {recentRegistrations.map((student) => (
            <Card key={student.id} className="flex justify-between p-3">
              <div>
                <p className="font-semibold">
                  {student.prefix} {student.firstName} {student.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(student.registrationDate).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
