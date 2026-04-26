"use client";
import { useCvcStore } from '@/store/useCvcStore';
import { useThermodynamics } from '@/hooks/useThermodynamics';
import MollierChart from '@/components/MollierChart';
import { Settings2, Thermometer, Gauge, Zap } from 'lucide-react';

export default function Home() {
  const { params, setParam } = useCvcStore();
  const cycle = useThermodynamics(params);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 p-8 font-mono">
      <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">
          CVC Infinity <span className="text-blue-500">Expert</span>
        </h1>
        <div className="bg-blue-600/20 px-4 py-2 rounded text-blue-400 font-bold text-xs">
          SYSTÈME OPÉRATIONNEL
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Contrôles */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <div className="p-6 bg-slate-900/30 rounded-3xl border border-white/5">
            <h3 className="text-xs font-black uppercase text-slate-500 mb-6 flex items-center gap-2">
              <Settings2 size={14}/> Paramètres Cycle
            </h3>
            <Slider
              label="Basse Pression"
              val={params.bp}
              unit="Bar"
              min={1}
              max={10}
              onChange={(v) => setParam('bp', v)}
            />
            <Slider
              label="Haute Pression"
              val={params.hp}
              unit="Bar"
              min={12}
              max={35}
              onChange={(v) => setParam('hp', v)}
            />
            <Slider
              label="Surchauffe (SH)"
              val={params.sh}
              unit="K"
              min={0}
              max={15}
              onChange={(v) => setParam('sh', v)}
            />
            <Slider
              label="Sous-refroid. (SC)"
              val={params.sc}
              unit="K"
              min={0}
              max={10}
              onChange={(v) => setParam('sc', v)}
            />
          </div>

          <div className="p-8 bg-blue-600 rounded-[2rem] text-white">
            <p className="text-[10px] font-black uppercase opacity-70">Coefficient de Performance</p>
            <p className="text-5xl font-black tracking-tighter">COP {cycle.cop}</p>
          </div>

          <div className="p-6 bg-slate-900/30 rounded-3xl border border-white/5 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-500 mb-4">Points du Cycle</h3>
            {cycle.points.map((pt) => (
              <div key={pt.id} className="flex justify-between text-[11px]">
                <span className="text-slate-500 uppercase font-bold">{pt.id}</span>
                <span className="text-blue-400">{pt.h.toFixed(1)} kJ/kg</span>
                <span className="text-slate-400">{pt.p.toFixed(1)} bar</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Visualisation */}
        <main className="col-span-12 lg:col-span-9 space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <StatsCard
              label="Puissance Frigo"
              val={cycle.coolingCap}
              unit="kJ/kg"
              icon={<Zap size={16} />}
            />
            <StatsCard
              label="Temp. Évaporation"
              val={(params.bp * 2.5).toFixed(1)}
              unit="°C"
              icon={<Thermometer size={16} />}
            />
            <StatsCard
              label="Rapport Comp."
              val={(params.hp / params.bp).toFixed(2)}
              unit="ratio"
              icon={<Gauge size={16} />}
            />
          </div>

          <MollierChart cycle={cycle} />

          <div className="grid grid-cols-2 gap-6">
            <InfoCard title="Travail de compression" val={`${(cycle.points[1].h - cycle.points[0].h).toFixed(1)} kJ/kg`} />
            <InfoCard title="Chaleur condenseur" val={`${(cycle.points[1].h - cycle.points[2].h).toFixed(1)} kJ/kg`} />
          </div>
        </main>
      </div>

      <footer className="mt-12 pt-6 border-t border-white/5 text-center text-[10px] text-slate-600 uppercase tracking-widest">
        CVC Infinity Pro — Moteur Thermodynamique R32 — v1.0.0
      </footer>
    </div>
  );
}

const Slider = ({ label, val, unit, min, max, onChange }) => (
  <div className="mb-6">
    <div className="flex justify-between text-[10px] font-bold mb-2">
      <span className="opacity-50 uppercase">{label}</span>
      <span className="text-blue-500">{val} {unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step="0.1"
      value={val}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
    />
  </div>
);

const StatsCard = ({ label, val, unit, icon }) => (
  <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5">
    <div className="text-slate-500 mb-2">{icon}</div>
    <p className="text-[10px] font-bold text-slate-500 uppercase">{label}</p>
    <p className="text-2xl font-black">{val} <span className="text-xs font-normal opacity-40">{unit}</span></p>
  </div>
);

const InfoCard = ({ title, val }) => (
  <div className="bg-slate-900/20 p-5 rounded-2xl border border-white/5 flex justify-between items-center">
    <p className="text-[10px] font-bold text-slate-500 uppercase">{title}</p>
    <p className="text-lg font-black text-slate-200">{val}</p>
  </div>
);
