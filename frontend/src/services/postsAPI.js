import axios from "axios";

const postsEndpoint = "http://localhost:3000/api/v1/posts";

const postsAPI = {
  getAllPosts() {
    return axios.get(postsEndpoint).then((res) => res.data);
  },
  searchPosts(query) {
    return axios
      .get(`${postsEndpoint}/search?contains=${query}`)
      .then((res) => res.data);
  },
  postPost(title, body, categories, coverId) {
    return axios
      .post(postsEndpoint, {
        title,
        body,
        categories,
        coverId,
      })
      .then((res) => res.data);
  },
  updatePostById(postId, title, body, categories, coverId) {
    return axios
      .put(`${postsEndpoint}/${postId}`, {
        title,
        body,
        categories,
        coverId,
      })
      .then((res) => res.data);
  },
  deletePostById(postId) {
    return axios.delete(`${postsEndpoint}/${postId}`);
  },
};

export default postsAPI;
