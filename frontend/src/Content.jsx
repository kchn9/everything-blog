import postsAPI from "./services/postsAPI";
import categoriesAPI from "./services/categoriesAPI";
import { useState, useEffect } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PostForm } from "./PostForm";
import { Loader } from "./Loader";
import { Layout, Empty } from "antd";
import { PostsGrid } from "./PostsGrid";
import { useAppStore } from "./hooks/useAppStore";
const { Content: AntContent } = Layout;

export const Content = ({ postEditor, setPostEditor, messageApi }) => {
  const activeCategory = useAppStore((state) => state.activeCategory);
  const categories = useAppStore((state) => state.categories);
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

  if (postEditor.state) {
    return (
      <AntContent style={{ padding: "24px 50px" }}>
        <PostForm
          postEditor={postEditor}
          categories={categories}
          messageApi={messageApi}
          setPostEditor={setPostEditor}
          setPosts={setPosts}
        />
      </AntContent>
    );
  }

  if (!posts) {
    return <Loader />;
  }

  return (
    <AntContent style={{ padding: "24px 50px" }}>
      <Breadcrumb activeCategory={activeCategory} />
      {posts.length === 0 ? (
        <Empty style={{ margin: "64px 0" }} description="No posts" />
      ) : (
        <PostsGrid
          setPostEditor={setPostEditor}
          posts={posts}
          setPosts={setPosts}
          messageApi={messageApi}
        />
      )}
    </AntContent>
  );
};
