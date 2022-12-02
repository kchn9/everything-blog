import { useAppStore } from "./hooks/useAppStore";
import { useWindowSize } from "./hooks/useWindowSize";
import { Card } from "./Card";
import { List } from "antd";
import { useState, useEffect } from "react";
const { Item } = List;

const PostsGrid = ({ messageApi }) => {
  const posts = useAppStore((state) => state.posts);

  const [width, _] = useWindowSize();
  const [pageSize, setPageSize] = useState(8);
  useEffect(() => {
    if (width < 576) {
      setPageSize(2);
    }
    if (width >= 576) {
      setPageSize(4);
    }
    if (width >= 992) {
      setPageSize(6);
    }
    if (width >= 1600) {
      setPageSize(8);
    }
  }, [width]);

  if (posts) {
    return (
      <>
        <List
          grid={{
            gutter: [0, 24],
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={posts}
          renderItem={(post) => (
            <Item>
              <Card post={post} messageApi={messageApi} />
            </Item>
          )}
          pagination={{
            defaultCurrent: 1,
            hideOnSinglePage: true,
            pageSize: pageSize,
            responsive: true,
          }}
        />
      </>
    );
  }
  return null;
};

export { PostsGrid };
