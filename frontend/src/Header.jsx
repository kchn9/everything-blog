import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu, Button, Divider, Space } from "antd";
import { useMemo } from "react";
import { useWindowSize } from "./hooks/useWindowSize";
const { Header: AntHeader } = Layout;

export const Header = ({
  categories,
  activeCategory,
  setActiveCategory,
  postEditor,
  setPostEditor,
}) => {
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

  // for 'media query'
  const [width, _] = useWindowSize();

  return (
    <AntHeader className="header">
      {width > 768 && categories ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="logo">EverythingBlog</div>

          <div style={{ flex: "1" }}></div>
          {!postEditor.state && (
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[activeCategory._id]}
              items={navItems}
              onClick={({ key }) => handleActiveCategoryChange(key)}
              style={{
                minWidth: 0,
                flex: "1 1 500px",
              }}
            />
          )}

          <div style={{ flex: "1 48px" }}></div>
          <CreateModeButton
            postEditor={postEditor}
            setPostEditor={setPostEditor}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CreateModeButton
            postEditor={postEditor}
            setPostEditor={setPostEditor}
          />
          <div className="logo" style={{ marginRight: 46 }}>
            EverythingBlog
          </div>
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
            <a
              onClick={(e) => e.preventDefault()}
              style={{ float: "right", marginLeft: "50px" }}
            >
              <Space style={{ display: postEditor.state && "none" }}>
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      )}
    </AntHeader>
  );
};

const CreateModeButton = ({ postEditor, setPostEditor }) => {
  function handleCreateModeChange(state) {
    setPostEditor({
      state,
      mode: "create",
      data: {},
    });
  }

  if (postEditor.state) {
    return (
      <Button onClick={() => handleCreateModeChange(false)}>
        Back to posts
      </Button>
    );
  } else {
    return (
      <Button type="primary" onClick={() => handleCreateModeChange(true)}>
        Add a post
      </Button>
    );
  }
};
