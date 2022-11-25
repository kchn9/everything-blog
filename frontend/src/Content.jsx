import postsAPI from "./services/postsAPI";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { Layout, Row, Col, Spin, Space, Empty } from "antd";
const { Content: AntContent } = Layout;

const PostsGrid = ({ posts }) => {
  return (
    <Row gutter={[12, 16]}>
      {posts &&
        posts.map((post) => (
          <Col xxl={4} xl={6} lg={8} sm={12} xs={24}>
            <Card post={post} />
          </Col>
        ))}
    </Row>
  );
};

export const Content = () => {
  const [posts, setPosts] = useState(null);
  const fetchPosts = async () => {
    postsAPI.getAllPosts().then((res) => {
      setPosts(res);
    });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <AntContent style={{ padding: 50 }}>
      {posts ? (
        posts.length != 0 ? (
          <PostsGrid posts={posts} />
        ) : (
          <Empty style={{ margin: "64px 0" }} description="No posts" />
        )
      ) : (
        <Spin
          size="large"
          style={{
            margin: "64px 0",
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}
    </AntContent>
  );
};
