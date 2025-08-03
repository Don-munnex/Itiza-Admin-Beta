import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendOtpToEmail = async (email: string, otp: string) => {
    try {
      const res = await fetch(`https://itiza-admin.vercel.app/api/sendOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      return data;
    } catch (err: any) {
      setError(`Failed to send OTP: ${err.message}`);
      throw err;
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!email.trim()) return setError("Please enter your email address.");
    if (password1.length < 6) return setError("Password must be at least 6 characters long.");
    if (password1 !== password2) return setError("Passwords do not match.");

    setLoading(true);

    try {
      const otp = generateOTP();
      setServerOtp(otp);
      await sendOtpToEmail(email, otp);
      setOtpSent(true);
    } catch (_) {
      // error already handled
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (otpInput !== serverOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://itiza-admin.vercel.app/api/signUP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password: password1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful! 🎉");
        navigate("/login");
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (error: any) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetToSignup = () => {
    setOtpSent(false);
    setOtpInput("");
    setServerOtp("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Create an Account 💝
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {!otpSent ? (
          <form className="space-y-4" onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP 📧"}
            </button>
          </form>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleOtpVerification();
            }}
          >
            <div className="text-center">
              <p className="text-gray-700 mb-2">We sent a 6-digit OTP to</p>
              <p className="font-semibold text-pink-600">{email}</p>
            </div>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg text-center text-xl font-mono tracking-wider focus:ring-2 focus:ring-green-500"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
              required
            />

            <button
              type="submit"
              disabled={loading || otpInput.length !== 6}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Sign Up ✅"}
            </button>

            <button
              type="button"
              onClick={resetToSignup}
              className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm underline"
            >
              ← Back to Sign Up
            </button>
          </form>
        )}

        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-500 font-medium hover:underline"
          >
            Log in
          </button>
        </p>

     
      </div>
    </div>
  );
};

export default SignUpPage;
