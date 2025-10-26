import { Link, useLocation } from "react-router-dom";
import { CircleGauge, Users, Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/shared/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Step 1: Clear stored user session data (if any)
        localStorage.removeItem("user"); // or "token" later when backend is connected
        sessionStorage.clear();

        // Step 2: Redirect to login page
        navigate("/login");

        // (Optional) Show a toast or console message
        console.log("User logged out.");
    };

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const links = [
        { name: "Dashboard", path: "/app/dashboard", icon: CircleGauge },
        { name: "Students", path: "/app/students", icon: Users },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-card border"
            >
                {isMobileOpen ? <X /> : <Menu />}
            </button>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-40
                    w-64 bg-card border-r
                    flex flex-col
                    transform transition-transform duration-200 ease-in-out
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-center space-x-2">
                    <GraduationCap className="text-emerald-500 h-8 w-8" />
                    <h1 className="text-xl font-bold">EduTrack</h1>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg
                                    transition-colors
                                    ${isActive
                                        ? 'bg-emerald-500 text-primary-foreground'
                                        : 'hover:bg-accent'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Profile Section */}
                <div className="mt-auto border-t border-border p-4 flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="focus:outline-none">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start" className="w-48">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-red-500 cursor-pointer"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
