import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb as AntBreadcrumb } from "antd";
const { Item } = AntBreadcrumb;

const Breadcrumb = ({ activeCategory }) => {
  return (
    <AntBreadcrumb
      style={{
        marginBottom: 24,
      }}
    >
      <Item href="/">
        <HomeOutlined />
      </Item>
      <Item>{activeCategory.name}</Item>
    </AntBreadcrumb>
  );
};

export { Breadcrumb };
