import create from "zustand";
import categoriesAPI from "../services/categoriesAPI";

export const useAppStore = create((set) => ({
  categories: [{}],
  fetchCategories: async () => {
    const categories = await categoriesAPI.getAllCategories();
    set(() => ({ categories: categories }));
  },
  activeCategory: {
    _id: "0",
    name: "All",
  },
  changeActiveCategory: ({ _id, name }) =>
    set((state) => ({
      activeCategory: { ...state.activeCategory, _id, name },
    })), // zustand allows to omit ...state but only on first level of depth, nested objects have to be destructed explicitly
}));
