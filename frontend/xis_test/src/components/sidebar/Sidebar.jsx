import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, Users, LogOut, Settings, X, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Popup Components ───────────────────────────────────────────

const LibraryPopup = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/images/filterimgs?startDate=2000-01-01&endDate=2099-12-31', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setImages(data.images || []);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { fetchImages(); }, []);

  return (
    <PopupWrapper title="Image Library" onClose={onClose}>
      {loading ? (
        <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-gray-500 text-sm">No images found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {images.map((img) => (
            <div key={img._id} className="bg-[#0D0D0E] rounded-xl overflow-hidden border border-white/5">
              <img
                src={`http://localhost:5000${img.url}`}
                alt={img.label}
                className="w-full h-28 object-cover"
              />
              <div className="p-2">
                <p className="text-xs text-white font-medium truncate">{img.label}</p>
                <p className="text-xs text-gray-500">{(img.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </PopupWrapper>
  );
};

const UploadPopup = ({ onClose }) => {
  const [label, setLabel] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const token = localStorage.getItem('token');

  const handleUpload = async () => {
    if (!file || !label) return setStatus('Please select a file and enter a label.');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('label', label);
    try {
      const res = await fetch('http://localhost:5000/api/images/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setStatus(data.message || 'Uploaded!');
      setFile(null);
      setLabel('');
    } catch {
      setStatus('Upload failed.');
    }
  };

  return (
    <PopupWrapper title="Upload Image" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. hotel, nature"
            className="w-full bg-[#0D0D0E] border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-[#93B6EE]"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#93B6EE]/10 file:text-[#93B6EE] file:text-xs"
          />
        </div>
        {status && <p className="text-xs text-green-400">{status}</p>}
        <button
          onClick={handleUpload}
          className="w-full bg-[#93B6EE] text-black font-bold py-2 rounded-xl text-sm hover:bg-[#7aa8e8] transition"
        >
          Upload
        </button>
      </div>
    </PopupWrapper>
  );
};

const TeamPopup = ({ onClose }) => (
  <PopupWrapper title="Team" onClose={onClose}>
    <div className="space-y-3">
      {['Ali Raza', 'Sara Khan', 'Ahmed Malik'].map((name, i) => (
        <div key={i} className="flex items-center gap-3 bg-[#0D0D0E] p-3 rounded-xl border border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#93B6EE]/20 flex items-center justify-center text-[#93B6EE] text-xs font-bold">
            {name[0]}
          </div>
          <div>
            <p className="text-sm text-white font-medium">{name}</p>
            <p className="text-xs text-gray-500">Member</p>
          </div>
        </div>
      ))}
    </div>
  </PopupWrapper>
);

const SettingsPopup = ({ onClose }) => (
  <PopupWrapper title="Settings" onClose={onClose}>
    <div className="space-y-4">
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Display Name</label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full bg-[#0D0D0E] border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-[#93B6EE]"
        />
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Theme</label>
        <select className="w-full bg-[#0D0D0E] border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none">
          <option>Dark</option>
          <option>Light</option>
        </select>
      </div>
      <button className="w-full bg-[#93B6EE] text-black font-bold py-2 rounded-xl text-sm hover:bg-[#7aa8e8] transition">
        Save Changes
      </button>
    </div>
  </PopupWrapper>
);

// ─── Reusable Popup Wrapper ──────────────────────────────────────

const PopupWrapper = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-[#161618] border border-white/10 rounded-2xl p-6 w-[420px] shadow-2xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-base">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition">
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

// ─── Sidebar ────────────────────────────────────────────────────

const Sidebar = () => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const openPopup = (name) => setActivePopup(name);
  const closePopup = () => setActivePopup(null);

  return (
    <>
      <aside className="w-64 bg-[#161618] border-r border-white/5 p-6 flex flex-col h-screen sticky top-0">
        {/* Brand */}
        <div className="text-[#93B6EE] font-bold text-xl mb-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#93B6EE] rounded-lg"></div>
          <span className="tracking-tight">XIS Analytics</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<Upload size={20} />}     label="Upload"   onClick={() => openPopup('upload')} />
          <NavItem icon={<ImageIcon size={20} />}  label="Library"  onClick={() => openPopup('library')} />
          <NavItem icon={<Users size={20} />}      label="Team"     onClick={() => openPopup('team')} />
          <NavItem icon={<Settings size={20} />}   label="Settings" onClick={() => openPopup('settings')} />
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-500 p-3 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200 mt-auto"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>

      {/* Popups */}
      {activePopup === 'upload'   && <UploadPopup  onClose={closePopup} />}
      {activePopup === 'library'  && <LibraryPopup onClose={closePopup} />}
      {activePopup === 'team'     && <TeamPopup    onClose={closePopup} />}
      {activePopup === 'settings' && <SettingsPopup onClose={closePopup} />}
    </>
  );
};

// ─── Nav Item ───────────────────────────────────────────────────

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      active ? 'text-[#93B6EE] bg-[#93B6EE]/10' : 'text-gray-500 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Sidebar;