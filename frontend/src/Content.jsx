import { useEffect } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PostForm } from "./PostForm";
import { Loader } from "./Loader";
import { Layout, Empty } from "antd";
import { PostsGrid } from "./PostsGrid";
import { useAppStore } from "./hooks/useAppStore";
import { usePostFormStore } from "./hooks/usePostFormStore";
const { Content: AntContent } = Layout;

export const Content = ({ messageApi }) => {
  const posts = useAppStore((state) => state.posts);
  const activeCategory = useAppStore((state) => state.activeCategory);
  const fetchPosts = useAppStore((state) => state.fetchPosts);
  const showPostForm = usePostFormStore((state) => state.showPostForm);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  if (showPostForm) {
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
