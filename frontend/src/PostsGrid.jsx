import { Row, Col } from "antd";
import { Card } from "./Card";

const PostsGrid = ({ setPostEditor, posts, setPosts, messageApi }) => {
  if (posts) {
    return (
      <Row gutter={[12, 16]}>
        {posts.map((post) => (
          <Col key={post._id} xxl={4} xl={6} lg={8} sm={12} xs={24}>
            <Card
              post={post}
              setPostEditor={setPostEditor}
              setPosts={setPosts}
              messageApi={messageApi}
            />
          </Col>
        ))}
      </Row>
    );
  }
  return null;
};

export { PostsGrid };
