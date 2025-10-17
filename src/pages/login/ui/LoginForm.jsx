import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Mail, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Temporary frontend-only simulation
        setTimeout(() => {
            console.log("Form submitted:", { email, password, rememberMe });

            // Redirect to dashboard
            navigate("/app/dashboard");

            setLoading(false);
        }, 1000);
    };

    return (
        <Card className="w-[400px] p-4 shadow-lg border bg-card">
            <CardHeader>
                <CardTitle className="text-xl font-bold">
                    Welcome back!
                </CardTitle>
                <CardDescription>Enter you credentials to access your account.</CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pr-10"
                                required
                            />
                            <Mail
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full mt-2" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
