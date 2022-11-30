import categoriesAPI from "./services/categoriesAPI";
import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Header } from "./Header";
import { Content } from "./Content";
import { message } from "antd";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [activeCategory, setActiveCategory] = useState({
    _id: "0",
    name: "All",
  });
  const [postEditor, setPostEditor] = useState({
    state: false,
    mode: "add",
    data: {
      post: {},
    },
  });

  const [categories, setCategories] = useState([{}]);
  const fetchCategories = async () => {
    categoriesAPI.getAllCategories().then((res) => {
      setCategories(res);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      {contextHolder}
      <Header
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        postEditor={postEditor}
        setPostEditor={setPostEditor}
      />
      <Content
        categories={categories}
        activeCategory={activeCategory}
        postEditor={postEditor}
        setPostEditor={setPostEditor}
        messageApi={messageApi}
      />
    </Layout>
  );
};
export default App;
