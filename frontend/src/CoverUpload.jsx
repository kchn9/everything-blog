import coverAPI from "./services/coversAPI";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { usePostFormStore } from "./hooks/usePostFormStore";

const CoverUpload = ({ updateCurrentCover }) => {
  const [filelist, setFilelist] = useState([]);
  const oldCoverId = usePostFormStore((state) => state.oldPost.coverId);
  const isNewPost = usePostFormStore((state) => state.isNewPost);

  return (
    <Upload
      listType="picture"
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
            if (!isNewPost) {
              // works well only if filelist maxCount = 1
              updateCurrentCover(oldCoverId);
            }
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
            updateCurrentCover(response._id);
            onSuccess(response);
          })
          .catch((e) => {
            onError(e, file);
          });
      }}
    >
      <Button icon={<UploadOutlined />}>
        {isNewPost ? "Upload" : "Change cover"}
      </Button>
    </Upload>
  );
};

export { CoverUpload };
