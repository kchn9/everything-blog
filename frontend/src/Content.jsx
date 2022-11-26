import postsAPI from "./services/postsAPI";
import categoriesAPI from "./services/categoriesAPI";
import { useState, useEffect } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Card } from "./Card";
import { Layout, Row, Col, Spin, Empty, Typography } from "antd";
const { Content: AntContent } = Layout;

const PostsGrid = ({ posts }) => {
  return (
    <Row gutter={[12, 16]}>
      {posts &&
        posts.map((post) => (
          <Col key={post._id} xxl={4} xl={6} lg={8} sm={12} xs={24}>
            <Card post={post} />
          </Col>
        ))}
    </Row>
  );
};

export const Content = ({ activeCategory }) => {
  const [posts, setPosts] = useState(null);
  const fetchPosts = async () => {
    if (activeCategory.name === "All") {
      return postsAPI.getAllPosts().then((res) => {
        setPosts(res);
      });
    }
    return categoriesAPI
      .getPostsByCategoryId(activeCategory._id)
      .then((res) => {
        setPosts(res);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  return (
    <AntContent style={{ padding: "24px 50px" }}>
      <Breadcrumb activeCategory={activeCategory} />
      {posts ? (
        posts.length != 0 ? (
          <PostsGrid posts={posts} />
        ) : (
          <Empty style={{ margin: "64px 0" }} description="No posts" />
        )
      ) : (
        <>
          <Spin
            size="large"
            style={{
              margin: "64px 0 24px 0",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Typography style={{ textAlign: "center" }}>Loading...</Typography>
        </>
      )}
    </AntContent>
  );
};
