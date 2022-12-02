import create from "zustand";
import { useAppStore } from "./useAppStore";
import postsAPI from "../services/postsAPI";
import coversAPI from "../services/coversAPI";

const addPost = useAppStore.getState().addPost;
const updatePost = useAppStore.getState().updatePost;

export const usePostFormStore = create((set, get) => ({
  showPostForm: false,
  setShowPostForm: (boolean) =>
    set(() => ({
      showPostForm: boolean,
    })),
  isNewPost: false,
  setIsNewPost: (boolean) =>
    set(() => ({
      isNewPost: boolean,
    })),
  oldPost: {
    _id: "",
    title: "",
    body: "",
    categories: [],
    coverId: "",
    coverSrc: "",
  },
  setOldPost: ({ _id, title, body, categories, coverId, coverSrc }) => {
    set(() => ({
      oldPost: { _id, title, body, categories, coverId, coverSrc },
    }));
  },
  handleSubmit: (form, currentCoverId) => {
    const title = form.getFieldValue("title") || "";
    const body = form.getFieldValue("body") || "";
    const categories = form.getFieldValue("categories") || [];
    const oldPost = get().oldPost;

    if (get().isNewPost && title && body) {
      postsAPI
        .postPost(
          title,
          body,
          categories,
          currentCoverId === "" ? undefined : currentCoverId
        )
        .then(({ post }) => {
          addPost(post);
        })
        .catch((e) => console.log(e));
    } else if (
      !get().isNewPost &&
      oldPost._id &&
      (title !== oldPost.title ||
        body !== oldPost.body ||
        currentCoverId !== oldPost.coverId ||
        JSON.stringify(categories) !== JSON.stringify(oldPost.categories))
    ) {
      postsAPI
        .updatePostById(oldPost._id, title, body, categories, currentCoverId)
        .then((post) => {
          if (oldPost.coverId && oldPost.coverId !== currentCoverId) {
            console.log(oldPost.coverId, currentCoverId);
            coversAPI
              .deleteCoverById(oldPost.coverId)
              .then(() => updatePost(post))
              .catch((e) => console.log("Unable to delete old cover", e));
          } else {
            updatePost(post);
          }
        })
        .catch((e) => console.log(e));
    } else {
      return;
    }
  },
  handleSuccessfullFinish: (form, currentCoverId, messageApi) => {
    const title = form.getFieldValue("title") || "";
    const body = form.getFieldValue("body") || "";
    const categories = form.getFieldValue("categories") || [];
    const oldPost = get().oldPost;

    set(() => ({
      showPostForm: false,
    }));
    if (get().isNewPost) {
      messageApi.success("Your post has been added successfully.");
    } else if (
      !get().isNewPost &&
      oldPost._id &&
      (title !== oldPost.title ||
        body !== oldPost.body ||
        currentCoverId !== oldPost.coverId ||
        JSON.stringify(categories) !== JSON.stringify(oldPost.categories))
    ) {
      messageApi.success("Your post has been updated successfully.");
    }
  },
  handleFailedFinish: (messageApi) => {
    messageApi.error(
      "Ooops.. something went wrong, please check error fields and try again."
    );
  },
}));
