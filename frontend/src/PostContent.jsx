import { Typography, Button, Space } from "antd";
import { useAppStore } from "./hooks/useAppStore";
const { Title, Paragraph } = Typography;

const PostContent = () => {
  const selectedPost = useAppStore((state) => state.selectedPost);
  const setShowSelectedPost = useAppStore((state) => state.setShowSelectedPost);

  const handleBackClick = () => setShowSelectedPost(false);

  return (
    <>
      <Title>{selectedPost.title}</Title>
      <Paragraph>{selectedPost.body}</Paragraph>
      <Paragraph type="secondary">
        Created on: {new Date(selectedPost.createdAt).toLocaleDateString()} |
        Last update: {new Date(selectedPost.updatedAt).toLocaleString()}
      </Paragraph>
      <Space style={{ padding: "2rem 0" }}>
        <Button onClick={handleBackClick}>Back to posts</Button>
      </Space>
    </>
  );
};

export { PostContent };
