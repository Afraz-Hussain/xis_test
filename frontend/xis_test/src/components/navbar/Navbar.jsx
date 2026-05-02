import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ real user fetch
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "User";

  return (
    <nav className="h-20 bg-[#0D0D0E]/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-50">
      
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate('/dashboard')}
      >
        <div className="w-9 h-9 bg-gradient-to-br from-[#93B6EE] to-[#6366f1] rounded-xl flex items-center justify-center">
          <span className="text-[#0D0D0E] font-black text-xl italic">X</span>
        </div>
        <span className="text-white font-extrabold text-xl hidden sm:block">
          XIS <span className="text-[#93B6EE] font-light">TEST</span>
        </span>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-3 bg-[#161618] px-3 py-1.5 rounded-full border border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{userName}</p>
            </div>
            <UserCircle size={32} className="text-[#93B6EE]" />
          </div>
        ) : (
          <Link 
            to="/login"
            className="bg-[#93B6EE] text-[#0D0D0E] px-6 py-2.5 rounded-xl font-bold text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;