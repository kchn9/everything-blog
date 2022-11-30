import { useAppStore } from "./hooks/useAppStore";
import { MenuOutlined } from "@ant-design/icons";
import { PostEditorButton } from "./PostEditorButton";
import { Dropdown, Divider, Space } from "antd";

const VerticalDropdown = ({ menu }) => {
  return (
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
  );
};

const VerticalNav = ({ navItems, handleActiveCategoryChange }) => {
  const shouldDisplayMenuIcon = useAppStore((state) => state.postEditor.state);
  const activeCategory = useAppStore((state) => state.activeCategory);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <PostEditorButton />
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
        dropdownRender={(menu) => <VerticalDropdown menu={menu} />}
      >
        <a
          onClick={(e) => e.preventDefault()}
          style={{ float: "right", marginLeft: "50px" }}
        >
          <Space style={{ display: shouldDisplayMenuIcon && "none" }}>
            <MenuOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export { VerticalNav };
