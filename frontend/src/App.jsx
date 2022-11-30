import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Header } from "./Header";
import { Content } from "./Content";
import { message } from "antd";
import { useAppStore } from "./hooks/useAppStore";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [postEditor, setPostEditor] = useState({
    state: false,
    mode: "add",
    data: {
      post: {},
    },
  });

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      {contextHolder}
      <Header postEditor={postEditor} setPostEditor={setPostEditor} />
      <Content
        postEditor={postEditor}
        setPostEditor={setPostEditor}
        messageApi={messageApi}
      />
    </Layout>
  );
};
export default App;
