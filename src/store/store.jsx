import { create } from 'zustand';
import { httpFetchCategory, httpFetchRoot } from '../utils/swapi';

export const useStore = create((set) => ({
  loading: false,
  error: null,
  root: null,
  categories: null,
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
      set({ categories: Object.keys(root)})
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

export const selectors = {
  loading: store => store.loading,
  error: store => store.error,
  root: store => store.root,
  categories: store => store.categories,
  category: category => store => store[category],
  categoryItemByName: (category, name) => store => store[category]?.find(item => item.name === name || item.title === name),
  fetchRoot: store => store.fetchRoot,
  fetchCategory: store => store.fetchCategory,
}