import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      
      await axios.post("http://localhost:5000/api/auth/register", formData);
      
  
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0E] font-['Mulish'] text-white antialiased">
      <div className="w-full max-w-[400px] px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Create account</h1>
          <p className="text-sm text-gray-500"> XIS Analytics Test By Afraz Hussain</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username Input */}
          <div className="space-y-1">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="w-full bg-[#161618] px-4 py-3 rounded-lg border border-white/5 focus:border-[#93B6EE]/30 focus:outline-none transition-all placeholder:text-gray-600 text-sm"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full bg-[#161618] px-4 py-3 rounded-lg border border-white/5 focus:border-[#93B6EE]/30 focus:outline-none transition-all placeholder:text-gray-600 text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              className="w-full bg-[#161618] px-4 py-3 rounded-lg border border-white/5 focus:border-[#93B6EE]/30 focus:outline-none transition-all placeholder:text-gray-600 text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <p className="text-xs text-red-400 font-medium px-1 pt-1">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#93B6EE] text-[#0D0D0E] py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity mt-4 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="mt-8 flex flex-col items-center">
            <p className="text-xs text-gray-500">
                Already have an account? <span 
                    onClick={() => navigate("/login")} 
                    className="text-[#93B6EE] cursor-pointer hover:underline underline-offset-4"
                >Sign in</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
