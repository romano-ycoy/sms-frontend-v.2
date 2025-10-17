import loginImg from "@/shared/assets/student-at-library.jpg";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
    return (
        <div className="flex h-screen">
            {/* Left side (image placeholder) */}
            <div className="hidden lg:flex w-1/2 bg-muted items-center justify-center">
            <img 
            src={loginImg} 
            alt="student at the library"
            className="w-full h-full object-cover" 
            />
            </div>

            {/* Right side (form) */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
                <LoginForm />
            </div>
        </div>
    );
}
