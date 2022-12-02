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
    })),
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
  searchQuery: "",
  setSearchQuery: (query) => set(() => ({ searchQuery: query })),
  handlePostsSearch: async () => {
    if (get().searchQuery.length > 0) {
      try {
        const posts = await postsAPI.searchPosts(get().searchQuery);
        set(() => ({
          activeCategory: {
            _id: "-1",
            name: `Result of search query: ${get().searchQuery}`,
          },
          posts: posts,
        }));
      } catch (e) {
        console.log("Unable to search", e);
      }
    }
  },
}));
