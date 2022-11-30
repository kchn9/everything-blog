import { Button } from "antd";

const PostEditorButton = ({ postEditor, setPostEditor }) => {
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

export { PostEditorButton };
