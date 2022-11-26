import axios from "axios";

const categoriesEndpoint = "http://localhost:3000/api/v1/categories";

const categoriesAPI = {
  getAllCategories() {
    return axios.get(categoriesEndpoint).then((res) => res.data);
  },
  getPostsByCategoryId(categoryId) {
    return axios
      .get(`${categoriesEndpoint}/${categoryId}`)
      .then((res) => res.data.posts);
  },
};

export default categoriesAPI;
