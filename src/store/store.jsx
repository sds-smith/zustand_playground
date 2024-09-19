import { create } from 'zustand';
import { httpFetchCategory, httpFetchRoot } from '../utils/swapi';

export const useStore = create((set) => ({
  loading: false,
  error: null,
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

  fetchRoot: async () => {
    set({ loading: true, error: null });
    try {
      const root = await httpFetchRoot();
      set({ root })
    } catch(err) {
      set({ error: err.message})
    } finally {
      set({ loading: false })
    }
  },

  fetchCategory: async (categoryName) => {
    set({ loading: true, error: null });
    try {
      const categoryData = await httpFetchCategory(categoryName);
      set({ [categoryName]: categoryData})
    } catch(err) {
      set({ error: err.message})
    } finally {
      set({ loading: false })
    }
  },
}))
