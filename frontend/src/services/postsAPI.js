import axios from "axios";

const postsEndpoint = "http://localhost:3000/api/v1/posts";

const postsAPI = {
  getAllPosts() {
    return axios.get(postsEndpoint).then((res) => res.data);
  },
  postPost(title, body, categories) {
    return axios.post(postsEndpoint, {
      title,
      body,
      categories,
    });
  },
};

export default postsAPI;
