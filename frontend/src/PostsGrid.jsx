import { Row, Col } from "antd";
import { Card } from "./Card";
import { useAppStore } from "./hooks/useAppStore";

const PostsGrid = ({ messageApi }) => {
  const posts = useAppStore((state) => state.posts);
  if (posts) {
    return (
      <Row gutter={[12, 16]}>
        {posts.map((post) => (
          <Col key={post._id} xxl={4} xl={6} lg={8} sm={12} xs={24}>
            <Card post={post} messageApi={messageApi} />
          </Col>
        ))}
      </Row>
    );
  }
  return null;
};

export { PostsGrid };
