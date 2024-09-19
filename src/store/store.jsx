import { create } from 'zustand'

export const useStore = create((set) => ({
  root: null,
  people: null,
  planets: null,
  films: null,
  species: null,
  vehicles: null,
  starships: null,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

  updateRoot: (newRoot) => set({ root: newRoot }),
  updateCategory: (category, newValue) => set({ [category]: newValue }),
}))
