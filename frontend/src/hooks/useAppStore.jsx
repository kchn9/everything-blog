import create from "zustand";
import categoriesAPI from "../services/categoriesAPI";
import postsAPI from "../services/postsAPI";

export const useAppStore = create((set, get) => ({
  categories: [{}],
  fetchCategories: async () => {
    try {
      const categories = await categoriesAPI.getAllCategories();
      set(() => ({ categories: categories }));
    } catch (e) {
      console.log("Unable to fetch categories", e);
    }
  },
  activeCategory: {
    _id: "0",
    name: "All",
  },
  setActiveCategory: ({ _id, name }) =>
    set(() => ({
      activeCategory: { _id, name },
    })), // zustand allows to omit general state destructing but only on first level of depth, nested objects have to be destructed explicitly
  postEditor: {
    state: false,
    mode: "add",
    data: {
      post: {},
    },
  },
  setPostEditor: ({ state, mode, data }) => {
    set(() => ({
      postEditor: {
        state,
        mode,
        data,
      },
    }));
  },
  posts: [],
  fetchPosts: async () => {
    const activeCategory = get().activeCategory;
    try {
      const posts =
        activeCategory.name === "All"
          ? await postsAPI.getAllPosts()
          : await categoriesAPI.getPostsByCategoryId(activeCategory._id);
      set(() => ({
        posts,
      }));
    } catch (e) {
      console.log("Unable to fetch posts", e);
    }
  },
  addPost: (post) => {
    set((state) => ({
      posts: [...state.posts, post],
    }));
  },
  updatePost: (post) => {
    set((state) => ({
      posts: [...state.posts.filter((p) => p._id !== post._id), post],
    }));
  },
  deletePost: (post) => {
    set((state) => ({
      posts: state.posts.filter((p) => p._id !== post._id),
    }));
  },
}));
