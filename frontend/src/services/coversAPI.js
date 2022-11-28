import axios from "axios";

const coversEndpoint = "http://localhost:3000/api/v1/posts/covers";

const coversAPI = {
  postCover(file) {
    const formData = new FormData();
    formData.append("file", file);
    return axios
      .post(coversEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
  deleteCoverById(coverId) {
    return axios.delete(`${coversEndpoint}/${coverId}`).then((res) => res.data);
  },
};

export default coversAPI;
