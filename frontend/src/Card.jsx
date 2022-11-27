import postsAPI from "./services/postsAPI";
import { truncate } from "./util/truncate";
import {
  ExpandOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card as AntCard, Typography } from "antd";
const { Meta } = AntCard;

const Card = ({ post, setPosts }) => {
  function handlePostDelete() {
    postsAPI.deletePostById(post._id).then(() => {
      setPosts((prev) => [...prev].filter((p) => p._id !== post._id));
    });
  }
  const actions = [
    <ExpandOutlined key="show" />,
    <EditOutlined key="edit" />,
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
        <img
          style={{ borderRadius: 0 }}
          src="https://random.imagecdn.app/500/500"
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
