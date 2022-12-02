import { Layout } from "antd";
import { Header } from "./Header";
import { SearchBox } from "./SearchBox";
import { Content } from "./Content";
import { message } from "antd";
import { usePostFormStore } from "./hooks/usePostFormStore";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const shouldRenderSearch = !usePostFormStore((state) => state.showPostForm);

  return (
    <Layout>
      {contextHolder}
      <Header />
      {shouldRenderSearch && (
        <div className="horizontal-search-wrapper">
          <SearchBox />
        </div>
      )}

      <Content messageApi={messageApi} />
    </Layout>
  );
};
export default App;
