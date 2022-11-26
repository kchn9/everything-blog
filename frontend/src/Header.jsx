import categoriesAPI from "./services/categoriesAPI";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu, Divider, Space } from "antd";
import { useMemo, useEffect, useState } from "react";
import { useWindowSize } from "./hooks/useWindowSize";
const { Header: AntHeader } = Layout;

export const Header = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    categoriesAPI.getAllCategories().then((res) => {
      setCategories(res);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const navItems = useMemo(() => {
    if (categories) {
      return [
        {
          label: "All",
          key: "0",
        },
        ...categories.map((category) => ({
          label: category.name,
          key: category._id,
        })),
      ];
    }
  }, [categories]);

  function handleActiveCategoryChange(key) {
    if (key === "0") {
      setActiveCategory({
        _id: key,
        name: "All",
      });
    } else {
      const categoryToSet = categories.find((category) => category._id === key);
      setActiveCategory(categoryToSet);
    }
  }

  const [width, _] = useWindowSize();

  return (
    <AntHeader
      className="header"
      style={{
        justifyContent: "space-between",
      }}
    >
      <div className="logo">EverythingBlog</div>
      {width > 768 && categories ? (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[categories[0]._id]}
          selectedKeys={[activeCategory._id]}
          items={navItems}
          onClick={({ key }) => handleActiveCategoryChange(key)}
        />
      ) : (
        <Dropdown
          menu={{
            items: navItems,
            selectable: true,
            theme: "dark",
            style: {
              borderRadius: "0",
              boxShadow: "none",
              padding: "5px 38px",
            },
            selectedKeys: [activeCategory._id],
            onClick: function ({ key }) {
              handleActiveCategoryChange(key);
            },
          }}
          placement="bottom"
          overlayClassName="dropdown-overlay"
          dropdownRender={(menu) => (
            <div
              className="dropdown-content"
              style={{
                position: "relative",
                width: "100%",
                background: "white",
                boxShadow:
                  "0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
              }}
            >
              {menu}
              <Divider
                style={{
                  margin: 0,
                }}
              />
              <Space
                style={{
                  padding: "13px 50px",
                }}
              >
                Search field
              </Space>
            </div>
          )}
        >
          <a onClick={(e) => e.preventDefault()} style={{ float: "right" }}>
            <Space>
              <MenuOutlined />
            </Space>
          </a>
        </Dropdown>
      )}
    </AntHeader>
  );
};
