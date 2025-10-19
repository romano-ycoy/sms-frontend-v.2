import { Moon, Sun, GraduationCap } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useTheme } from "@/app/providers/ThemeProvider";

export function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="h-16 bg-card border-b flex items-center justify-between px-4 lg:px-6">
            <div className="ml-12 lg:ml-0 flex space-x-2 items-center">
                <GraduationCap className="text-emerald-500 h-6 w-6" />
                <h2 className="text-xl font-bold">EduTrack</h2>
            </div>

            {/* Dark Mode Toggle */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                ) : (
                    <Moon className="w-5 h-5" />
                )}
            </Button>
        </header>
    );
}