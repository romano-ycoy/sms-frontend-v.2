import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Mail, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Error messages
  const [errors, setErrors] = useState({ email: "", password: "" });

  // 🔍 Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if invalid

    setLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", { email, password, rememberMe });

      navigate("/app/dashboard"); // Redirect to dashboard
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="rounded-none shadow-none flex justify-center h-full w-full p-4 bg-card">
      <CardHeader>
        <CardTitle className="text-xl lg:text-3xl font-bold">Welcome back!</CardTitle>
        <CardDescription className="text-sm lg:text-md">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm lg:text-md">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pr-10 lg:h-10 ${
                  errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm lg:text-md">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pr-10 lg:h-10 ${
                  errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-emerald-600"
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          {/* Submit Button */}
          <Button
            className={`w-full bg-emerald-500 hover:bg-emerald-700 mt-2 lg:text-md ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
