import coversAPI from "./services/coversAPI";
import {
  ExpandOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useAppStore } from "./hooks/useAppStore";

import { Card as AntCard, Typography, Image } from "antd";
const { Paragraph } = Typography;
const { Meta } = AntCard;

const Card = ({ post, messageApi }) => {
  const [src, setSrc] = useState("");
  function fetchCover() {
    if (post && post.coverId) {
      coversAPI
        .getCoverSrcById(post.coverId)
        .then((src) => {
          setSrc(src);
        })
        .catch((e) => console.error(e));
    }
  }
  useEffect(() => {
    fetchCover();
  }, [post]);

  const handleExpandPostButton = useAppStore(
    (state) => state.handleExpandPostButton
  );
  const handleDeletePostButton = useAppStore(
    (state) => state.handleDeletePostButton
  );
  const handleEditPostButton = useAppStore(
    (state) => state.handleEditPostButton
  );

  const actions = [
    <ExpandOutlined key="show" onClick={() => handleExpandPostButton(post)} />,
    <EditOutlined key="edit" onClick={() => handleEditPostButton(post)} />,
    <DeleteOutlined
      key="edit"
      className="delete-icon"
      onClick={() => handleDeletePostButton(post, messageApi)}
    />,
  ];

  return (
    <AntCard
      title={post.title}
      bordered={false}
      hoverable
      cover={
        src && (
          <Image
            style={{
              borderRadius: "0",
              objectFit: "cover",
              maxHeight: "50vh",
              objectPosition: "50% 50%",
              backgroundColor: "grey",
            }}
            src={src}
          />
        )
      }
      actions={actions}
      bodyStyle={{
        minHeight: "104px",
        paddingBottom: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Meta
        style={{ flex: 1 }}
        description={<Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>}
      />
      <Paragraph
        style={{ fontSize: 12, textAlign: "right", margin: "16px 8px 0px 0px" }}
        type="secondary"
      >
        Created on {new Date(post.createdAt).toLocaleDateString()}
      </Paragraph>
    </AntCard>
  );
};

export { Card };
