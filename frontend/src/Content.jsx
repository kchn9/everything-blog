import postsAPI from "./services/postsAPI";
import categoriesAPI from "./services/categoriesAPI";
import { useState, useEffect } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Card } from "./Card";
import { AddNewPost } from "./AddNewPost";
import { Layout, Row, Col, Spin, Empty, Typography } from "antd";
const { Content: AntContent } = Layout;

const PostsGrid = ({ posts, setPosts }) => {
  if (posts) {
    return (
      <Row gutter={[12, 16]}>
        {posts.map((post) => (
          <Col key={post._id} xxl={4} xl={6} lg={8} sm={12} xs={24}>
            <Card post={post} setPosts={setPosts} />
          </Col>
        ))}
      </Row>
    );
  }
  return null;
};

export const Content = ({
  categories,
  activeCategory,
  creatingPostMode,
  setCreatingPostMode,
  setAlert,
}) => {
  const [posts, setPosts] = useState([]);
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
      {creatingPostMode ? (
        <AddNewPost
          categories={categories}
          setAlert={setAlert}
          setCreatingPostMode={setCreatingPostMode}
          setPosts={setPosts}
        />
      ) : posts ? (
        posts.length != 0 ? (
          <>
            <Breadcrumb activeCategory={activeCategory} />
            <PostsGrid posts={posts} setPosts={setPosts} />
          </>
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
