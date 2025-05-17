import React, { useState } from "react";
import Axiosinstance from "../Pages/Axiosinstance";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const api = Axiosinstance();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); 
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmitEmail = async () => {
        try {
            await api.post("/auth/sendotp/", { email });
            alert("OTP sent to your email!");
            setStep(2); 
        } catch (error) {
          console.log(error)
            alert("Error: Unable to send OTP");
        }
    };

    const handleSubmitOtp = async () => {
        try {
            await api.post("/auth/verifyotp/", { email, otp });
            setStep(3); 
        } catch (error) {
          console.log(error)
            alert("Invalid OTP. Please try again.");
        }
    };

    const handleResetPassword = async () => {
        try {
            await api.post("/auth/resetpass/", { email, password: newPassword });
            alert("Password reset successfully!");
            navigate("/login"); 
        } catch (error) {
          console.log(error)
            alert("Error: Unable to reset password");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100">
            {step === 1 && (
                <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Forget Password</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 w-full border-2 border-teal-500 rounded-lg mb-4"
                    />
                    <button
                        onClick={handleSubmitEmail}
                        className="w-full p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    >
                        Send OTP
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="p-2 w-full border-2 border-teal-500 rounded-lg mb-4"
                    />
                    <button
                        onClick={handleSubmitOtp}
                        className="w-full p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    >
                        Verify OTP
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 w-full border-2 border-teal-500 rounded-lg mb-4"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="w-full p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    >
                        Reset Password
                    </button>
                </div>
            )}
        </div>
    );
}
