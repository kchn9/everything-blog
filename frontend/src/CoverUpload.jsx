import coverAPI from "./services/coversAPI";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const CoverUpload = ({ setCoverId }) => {
  const [filelist, setFilelist] = useState([]);

  return (
    <Upload
      listType="picture-card"
      fileList={filelist}
      beforeUpload={(file) => {
        const bytesLimit = 2_000_000;
        const isTooBig = file.size > bytesLimit;
        const acceptedFormats = ["image/png", "image/jpeg"];
        const isNotAcceptedFormat = !acceptedFormats.includes(file.type);
        if (isTooBig || isNotAcceptedFormat) {
          return Upload.LIST_IGNORE;
        }
        return true;
      }}
      onChange={({ fileList }) => {
        let newFilelist = [...fileList];
        if (newFilelist.length > 1) {
          const coverToDelete = newFilelist[0].response;
          coverAPI
            .deleteCoverById(coverToDelete._id)
            .catch((e) => console.error("Unable to delete old cover", e));
          newFilelist = newFilelist.slice(-1);
        }
        setFilelist(newFilelist);
      }}
      onRemove={(file) => {
        const coverToDelete = file.response;
        coverAPI
          .deleteCoverById(coverToDelete._id)
          .then(() => {
            return true;
          })
          .catch((e) => {
            console.error("Unable to delete old cover", e);
            return false;
          });
      }}
      customRequest={({ file, onSuccess, onError }) => {
        coverAPI
          .postCover(file)
          .then((response) => {
            setCoverId(response._id);
            onSuccess(response);
          })
          .catch((e) => {
            onError(e, file);
          });
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export { CoverUpload };
