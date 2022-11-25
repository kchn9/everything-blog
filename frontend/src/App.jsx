import { Layout } from "antd";
import { Header } from "./Header";
import { Content } from "./Content";
import { useState } from "react";

const App = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <Layout>
      <Header setActiveCategory={setActiveCategory} />
      <Content activeCategory={activeCategory} />
    </Layout>
  );
};
export default App;
