import postsAPI from "./services/postsAPI";
import coversAPI from "./services/coversAPI";
import { truncate } from "./util/truncate";
import { Buffer } from "buffer";
import {
  ExpandOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card as AntCard, Typography, Image } from "antd";
import { useState, useEffect } from "react";
const { Meta } = AntCard;

const Card = ({ setPostEditor, post, setPosts, messageApi }) => {
  const [src, setSrc] = useState("");
  function fetchCover() {
    if (post) {
      coversAPI
        .getCoverById(post.coverId)
        .then(({ file }) => {
          const buffer = file.data.data;
          const b64 = Buffer.from(buffer).toString("base64");
          const mimeType = file.contentType;
          setSrc(`data:${mimeType};base64,${b64}`);
        })
        .catch((e) => console.error(e));
    }
  }
  useEffect(() => {
    fetchCover();
  }, [post]);

  function handlePostEdit() {
    setPostEditor({
      state: true,
      mode: "update",
      data: {
        post,
      },
    });
  }
  function handlePostDelete() {
    postsAPI
      .deletePostById(post._id)
      .then(() => {
        messageApi.success("Your post has been deleted successfully.", 1);
        setPosts((prev) => [...prev].filter((p) => p._id !== post._id));
      })
      .catch((e) => {
        console.log(e);
        messageApi.error("Oops... something went wrong, try again later.", 1);
      });
  }
  const actions = [
    <ExpandOutlined key="show" />,
    <EditOutlined key="edit" onClick={() => handlePostEdit()} />,
    <DeleteOutlined
      key="edit"
      className="delete-icon"
      onClick={() => handlePostDelete()}
    />,
  ];
  return (
    <AntCard
      title={post.title}
      bordered={false}
      hoverable
      cover={
        <Image
          preview={false}
          style={{
            borderRadius: "0",
            objectFit: "cover",
            maxHeight: "50vh",
            objectPosition: "50% 50%",
            backgroundColor: "grey",
          }}
          src={src}
        />
      }
      actions={actions}
      bodyStyle={{
        minHeight: "104px",
        paddingBottom: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Meta style={{ flex: 1 }} description={truncate(post.body, 72)} />
      <Typography.Paragraph
        style={{ fontSize: 12, textAlign: "right", margin: "16px 8px 0px 0px" }}
        type="secondary"
      >
        Created on {new Date(post.createdAt).toLocaleDateString()}
      </Typography.Paragraph>
    </AntCard>
  );
};

export { Card };
