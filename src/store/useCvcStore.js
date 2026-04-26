import { create } from 'zustand';

export const useCvcStore = create((set) => ({
  params: {
    bp: 4.5,   // Bar (Basse Pression)
    hp: 18.2,  // Bar (Haute Pression)
    sh: 5,     // K (Surchauffe)
    sc: 3      // K (Sous-refroidissement)
  },
  setParam: (key, val) => set((state) => ({
    params: { ...state.params, [key]: val }
  }))
}));
