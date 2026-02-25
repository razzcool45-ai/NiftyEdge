import React, { useState } from 'react';
import { TrendingUp, LayoutDashboard, Filter, Search, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_DATA = [
  { name: 'Jan', rs: 100 }, { name: 'Feb', rs: 105 }, { name: 'Mar', rs: 115 },
  { name: 'Apr', rs: 120 }, { name: 'May', rs: 135 }, { name: 'Jun', rs: 150 },
];

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const stocks = [
    { symbol: "HAL", price: 3245, rs: 94, pattern: "VCP" },
    { symbol: "BEL", price: 188, rs: 91, pattern: "Basing" },
    { symbol: "MAZDOCK", price: 2150, rs: 98, pattern: "VCP" },
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-200 font-sans">
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#16191F] border-r border-white/5 p-6">
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp className="text-emerald-500 w-8 h-8" />
          <h1 className="font-bold text-xl text-white">NiftyEdge.pro</h1>
        </div>
        <nav className="space-y-2">
          <button onClick={() => setTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-xl ${tab === 'dashboard' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400'}`}>Dashboard</button>
          <button onClick={() => setTab('screener')} className={`w-full text-left px-4 py-3 rounded-xl ${tab === 'screener' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400'}`}>Screener</button>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white">{tab === 'dashboard' ? "Market Overview" : "CAN SLIM Screener"}</h2>
        </header>

        {tab === 'dashboard' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#16191F] p-6 rounded-2xl border border-white/5"><p className="text-slate-500 text-xs font-bold uppercase">Nifty 500</p><h4 className="text-2xl font-bold">23,456.20</h4></div>
              <div className="bg-[#16191F] p-6 rounded-2xl border border-white/5"><p className="text-slate-500 text-xs font-bold uppercase">Market Stage</p><h4 className="text-2xl font-bold text-emerald-500">Stage 2</h4></div>
            </div>
            <div className="bg-[#16191F] rounded-2xl border border-white/5 p-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA}><Area type="monotone" dataKey="rs" stroke="#10b981" fill="#10b98120" /></AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="bg-[#16191F] rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-500 text-xs uppercase">
                <tr><th className="px-6 py-4">Stock</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">RS Rating</th><th className="px-6 py-4">Pattern</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stocks.map(s => (
                  <tr key={s.symbol} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-bold text-white">{s.symbol}</td>
                    <td className="px-6 py-4">₹{s.price}</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold">{s.rs}</td>
                    <td className="px-6 py-4 text-slate-400">{s.pattern}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}