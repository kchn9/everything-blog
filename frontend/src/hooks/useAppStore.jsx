import create from "zustand";
import postsAPI from "../services/postsAPI";
import categoriesAPI from "../services/categoriesAPI";
import { usePostFormStore } from "./usePostFormStore";

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
  selectedPost: {
    _id: "",
    title: "",
    body: "",
    categories: [],
    createdAt: "",
    upadtedAt: "",
  },
  showSelectedPost: false,
  setShowSelectedPost: (boolean) => set(() => ({ showSelectedPost: boolean })),
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
  handleExpandPostButton: (post) =>
    set(() => ({
      selectedPost: post,
      showSelectedPost: true,
    })),
  handleEditPostButton: (post) => {
    const setShowPostForm = usePostFormStore.getState().setShowPostForm;
    const setIsNewPost = usePostFormStore.getState().setIsNewPost;
    const setOldPost = usePostFormStore.getState().setOldPost;
    setShowPostForm(true);
    setIsNewPost(false);
    setOldPost(post);
  },
  handleDeletePostButton: async (post, messageApi) => {
    try {
      await postsAPI.deletePostById(post._id);
      get().deletePost(post);
      messageApi.success("Your post has been deleted successfully.", 1);
    } catch (e) {
      console.log("Unable to delete post", e);
      messageApi.error("Oops... something went wrong, try again later.", 1);
    }
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
