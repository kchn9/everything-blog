import axios from "axios";
import { Buffer } from "buffer";

const coversEndpoint = "/api/v1/posts/covers";

const coversAPI = {
  getCoverSrcById(coverId) {
    return axios
      .get(`${coversEndpoint}/${coverId}`)
      .then((res) => res.data)
      .then(({ file }) => {
        const buffer = file.data.data;
        const b64 = Buffer.from(buffer).toString("base64");
        const mimeType = file.contentType;
        return `data:${mimeType};base64,${b64}`;
      });
  },
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
