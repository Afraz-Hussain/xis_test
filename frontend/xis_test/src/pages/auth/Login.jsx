import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0E] font-['Mulish'] px-4">
      {/* Glow Effect in Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#93B6EE] opacity-[0.05] blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full bg-[#161618] rounded-[2rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#93B6EE] to-transparent opacity-50"></div>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Sign In</h2>
          <p className="text-gray-400 mt-2 text-sm font-light">Welcome To Image Analytics Platform </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#1C1C1E] text-white px-5 py-4 rounded-2xl border border-white/5 focus:border-[#93B6EE]/50 focus:outline-none transition-all duration-300 placeholder:text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <button type="button" className="text-xs text-[#93B6EE] hover:opacity-80 transition-opacity">Forgot?</button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#1C1C1E] text-white px-5 py-4 rounded-2xl border border-white/5 focus:border-[#93B6EE]/50 focus:outline-none transition-all duration-300 placeholder:text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden py-4 rounded-2xl font-bold transition-all duration-300 transform active:scale-[0.98]"
          >
            {/* Gradient Background for Button */}
            <div className="absolute inset-0 bg-[#93B6EE] transition-transform duration-300 group-hover:scale-105"></div>
            
            <span className="relative text-[#0D0D0E] flex items-center justify-center gap-2">
              {loading ? "Authenticating..." : "Access Account"}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            No account yet? <button className="text-white font-bold hover:text-[#93B6EE] transition-colors">Join us</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
