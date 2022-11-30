import { PostEditorButton } from "./PostEditorButton";
import { Menu } from "antd";

const HorizontalNav = ({
  postEditor,
  activeCategory,
  navItems,
  handleActiveCategoryChange,
  setPostEditor,
}) => {
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
      <PostEditorButton postEditor={postEditor} setPostEditor={setPostEditor} />
    </div>
  );
};

export { HorizontalNav };
