import { Layout } from "antd";
import { Header } from "./Header";
import { Content } from "./Content";
import { message } from "antd";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Layout>
      {contextHolder}
      <Header />
      <Content messageApi={messageApi} />
    </Layout>
  );
};
export default App;
