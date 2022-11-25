import axios from "axios";

const postsEndpoint = "http://localhost:3000/api/v1/posts";

const postsAPI = {
  getAllPosts() {
    return axios.get(postsEndpoint).then((res) => res.data);
  },
};

export default postsAPI;
