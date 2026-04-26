export const useThermodynamics = (params) => {
  const { bp, hp, sh, sc } = params;

  // Calcul des points du cycle (Enthalpie h en kJ/kg)
  const h1 = 400 + (bp * 2.1) + (sh * 1.6); // Aspiration
  const h2is = h1 * Math.pow(hp / bp, 0.285);
  const h2 = h1 + (h2is - h1) / 0.85;       // Refoulement (eff 85%)
  const h3 = 250 + (hp * 0.75) - (sc * 1.1); // Condensation
  const h4 = h3;                             // Détente isenthalpique

  return {
    points: [
      { h: h1, p: bp, id: 'asp' },
      { h: h2, p: hp, id: 'ref' },
      { h: h3, p: hp, id: 'liq' },
      { h: h4, p: bp, id: 'inj' }
    ],
    cop: ((h1 - h4) / (h2 - h1)).toFixed(2),
    coolingCap: (h1 - h4).toFixed(1)
  };
};
