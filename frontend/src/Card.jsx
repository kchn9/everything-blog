import { truncate } from "./util/truncate";
import {
  ExpandOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card as AntCard, Typography } from "antd";
const { Meta } = AntCard;

const actions = [
  <ExpandOutlined key="show" />,
  <EditOutlined key="edit" />,
  <DeleteOutlined key="edit" />,
];

const Card = ({ post }) => {
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
