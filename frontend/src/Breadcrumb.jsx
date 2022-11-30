import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { useAppStore } from "./hooks/useAppStore";

const { Item } = AntBreadcrumb;

const Breadcrumb = () => {
  const activeCategory = useAppStore((state) => state.activeCategory);
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
