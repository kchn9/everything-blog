import { useAppStore } from "./hooks/useAppStore";
import { PostEditorButton } from "./PostEditorButton";
import { Menu } from "antd";

const HorizontalNav = ({ navItems, handleActiveCategoryChange }) => {
  const shouldRenderMenu = !useAppStore((state) => state.postEditor.state);
  const activeCategory = useAppStore((state) => state.activeCategory);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="logo">EverythingBlog</div>

      <div style={{ flex: "1" }}></div>
      {shouldRenderMenu && (
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
      <PostEditorButton />
    </div>
  );
};

export { HorizontalNav };
