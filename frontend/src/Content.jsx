import { useState, useEffect } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PostForm } from "./PostForm";
import { Loader } from "./Loader";
import { Layout, Empty } from "antd";
import { PostsGrid } from "./PostsGrid";
import { useAppStore } from "./hooks/useAppStore";
const { Content: AntContent } = Layout;

export const Content = ({ messageApi }) => {
  const posts = useAppStore((state) => state.posts);
  const isUpdateMode = useAppStore((state) => state.postEditor.state);
  const activeCategory = useAppStore((state) => state.activeCategory);
  const fetchPosts = useAppStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  if (isUpdateMode) {
    return (
      <AntContent style={{ padding: "24px 50px" }}>
        <PostForm messageApi={messageApi} />
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
        <PostsGrid messageApi={messageApi} />
      )}
    </AntContent>
  );
};
