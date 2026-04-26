import React from 'react';

export default function MollierChart({ cycle }) {
  const scaleH = (h) => (h - 200) * 1.5;
  const scaleP = (p) => 300 - (Math.log10(p) * 150);

  const pointsPath = cycle.points
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scaleH(pt.h)} ${scaleP(pt.p)}`)
    .join(' ') + ' Z';

  return (
    <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 w-full h-[400px]">
      <p className="text-[10px] font-black text-blue-500 uppercase mb-4 tracking-widest">Diagramme Enthalpique Dynamique</p>
      <svg viewBox="0 0 600 350" className="w-full h-full overflow-visible">
        {/* Grille Log P */}
        {[1, 5, 10, 20, 40].map(p => (
          <line key={p} x1="0" y1={scaleP(p)} x2="600" y2={scaleP(p)} stroke="#ffffff10" strokeWidth="1" />
        ))}
        {/* Labels axe P */}
        {[1, 5, 10, 20, 40].map(p => (
          <text key={`label-${p}`} x="5" y={scaleP(p) - 3} fill="#ffffff40" fontSize="8">{p} bar</text>
        ))}
        {/* Grille verticale H */}
        {[250, 300, 350, 400, 450, 500].map(h => (
          <line key={h} x1={scaleH(h)} y1="0" x2={scaleH(h)} y2="300" stroke="#ffffff08" strokeWidth="1" />
        ))}
        {/* Labels axe H */}
        {[250, 300, 350, 400, 450, 500].map(h => (
          <text key={`hlabel-${h}`} x={scaleH(h)} y="315" fill="#ffffff40" fontSize="8" textAnchor="middle">{h}</text>
        ))}
        {/* Cycle */}
        <path d={pointsPath} fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
        {/* Points du cycle */}
        {cycle.points.map((pt, i) => (
          <g key={i}>
            <circle cx={scaleH(pt.h)} cy={scaleP(pt.p)} r="5" fill="#3b82f6" />
            <text x={scaleH(pt.h) + 8} y={scaleP(pt.p) - 6} fill="#93c5fd" fontSize="9" fontWeight="bold">
              {pt.id.toUpperCase()}
            </text>
          </g>
        ))}
        {/* Axes labels */}
        <text x="300" y="340" fill="#ffffff30" fontSize="9" textAnchor="middle">Enthalpie h (kJ/kg)</text>
        <text x="-150" y="10" fill="#ffffff30" fontSize="9" textAnchor="middle" transform="rotate(-90)">log P (bar)</text>
      </svg>
    </div>
  );
}
