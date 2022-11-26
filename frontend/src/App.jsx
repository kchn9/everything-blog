import { Layout } from "antd";
import { Header } from "./Header";
import { Content } from "./Content";
import { useState } from "react";

const App = () => {
  const [activeCategory, setActiveCategory] = useState({
    _id: "0",
    name: "All",
  });
  return (
    <Layout>
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Content activeCategory={activeCategory} />
    </Layout>
  );
};
export default App;
