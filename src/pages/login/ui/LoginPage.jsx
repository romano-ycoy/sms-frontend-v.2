import loginImg from "@/shared/assets/students-studying.jpg";
import logoImg from "../../../../public/graduation-cap.svg";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center lg:flex-row h-screen">
            {/* Left side (image placeholder) */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full">
                <img
                    src={loginImg}
                    alt="student studying"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right side (form) */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center bg-background relative">
                    <img
                        src={logoImg}
                        alt="EduTrack logo"
                        className="hidden md:block absolute top-5 right-5 h-10 w-10"
                    />
                <LoginForm />
            </div>
        </div>
    );
}
