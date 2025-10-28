import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/shared/api/axiosInstance";

export function useLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // The main login function
    const handleLogin = async (email, password, rememberMe) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post("/auth/login", {
                email,
                password,
                rememberMe,
            });

            // Successful login
            if (response.data?.success) {
                const { accessToken, user } = response.data.data;

                // Store access token in memory (for now)
                sessionStorage.setItem("accessToken", accessToken);

                // Log info for debugging
                console.log("Login successfully:", parse(user));
                console.log("Access Token:", accessToken);

                // Redirect to dashboard
                navigate("/app/dashboard");
            } else {
                setError("Unexpected response format from server.");
            }
        } catch (err) {
            // Handle known server errors
            if (err.response) {
                const { statusCode, message } = err.response.data || {};
                if (statusCode === 400 || statusCode === 401) {
                    setError("Invalid email or password.");
                } else if (statusCode === 429) {
                    setError("Too many attempts. Please try again later.");
                } else {
                    setError(message || "Login failed. Please try again.");
                }
            } else {
                // Handle network or unknown errors
                setError("Network error. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
}
