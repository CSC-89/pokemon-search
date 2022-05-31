module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'bg-fire',
    'bg-water',
    'bg-grass',
    'bg-electric',
    'bg-ice',
    'bg-normal',
    'bg-flying',
    'bg-bug',
    'bg-poison',
    'bg-fighting',
    'bg-fairy',
    'bg-psychic',
    'bg-dark',
    'bg-rock',
    'bg-steel',
    'bg-ground',
    'bg-ghost',
    'bg-dragon'
  ],
  theme: {
    extend: {
      colors: {
        fire: "#fb7185",
        water: "#22d3ee",
        grass: "#4ade80",
        electric: "#fef08a",
        ice: "#e0f2fe",
        normal: "#e2e8f0",
        flying: "#cffafe",
        bug : "#bef264",
        poison: "#c4b5fd",
        fighting: "#facc15",
        fairy: "#f9a8d4", 
        psychic: "#e879f9",
        dark: "#64748b",
        rock: "#d6d3d1",
        steel: "#d1d5db",
        ground: "#ca8a04",
        ghost: "#c7d2fe",
        dragon: "#fb923c"
      }
    }
  },
  plugins: [],
}
