import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '../../components/sidebar/Sidebar';

const COLORS = ['#93B6EE', '#6366f1', '#ec4899', '#f59e0b', '#10b981'];

const Home = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [perDayData, setPerDayData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // Total Count
        const countRes = await fetch('http://localhost:5000/api/images/count', { headers });
        const countData = await countRes.json();
        setTotalCount(countData.count);

        // Per Day
        const perDayRes = await fetch('http://localhost:5000/api/images/perday', { headers });
        const perDayJson = await perDayRes.json();
        setPerDayData(perDayJson.data);

        // Group By Label
        const labelRes = await fetch('http://localhost:5000/api/images/groupbylabel', { headers });
        const labelJson = await labelRes.json();
        setLabelData(labelJson.data);

      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0D0D0E] text-white items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#0D0D0E] text-white items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0E] text-white font-['Mulish']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#161618] p-6 rounded-2xl border border-white/5">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Images</p>
            <h3 className="text-3xl font-bold mt-2 text-[#93B6EE]">{totalCount}</h3>
          </div>
          <div className="bg-[#161618] p-6 rounded-2xl border border-white/5">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Labels</p>
            <h3 className="text-3xl font-bold mt-2 text-white">{labelData.length}</h3>
          </div>
          <div className="bg-[#161618] p-6 rounded-2xl border border-white/5">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">System Health</p>
            <h3 className="text-3xl font-bold mt-2 text-green-400">Optimal</h3>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Per Day Line Chart */}
          <div className="bg-[#161618] p-6 rounded-3xl border border-white/5">
            <h4 className="font-bold mb-6 text-sm text-gray-400">Upload Activity (Per Day)</h4>
            {perDayData.length === 0 ? (
              <p className="text-gray-600 text-sm text-center mt-16">No data available</p>
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={perDayData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="date" stroke="#555" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#161618', border: 'none', borderRadius: '10px' }} />
                    <Line type="monotone" dataKey="count" stroke="#93B6EE" strokeWidth={3} dot={{ r: 4, fill: '#93B6EE' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

       
          <div className="bg-[#161618] p-6 rounded-3xl border border-white/5">
            <h4 className="font-bold mb-6 text-sm text-gray-400">Distribution by Label</h4>
            {labelData.length === 0 ? (
              <p className="text-gray-600 text-sm text-center mt-16">No data available</p>
            ) : (
              <div className="h-[250px] flex items-center">
                <ResponsiveContainer width="60%" height="100%">
                  <PieChart>
                    <Pie data={labelData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="count" nameKey="label">
                      {labelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="flex flex-col gap-2 ml-4">
                  {labelData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-xs text-gray-400">{entry.label} ({entry.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;