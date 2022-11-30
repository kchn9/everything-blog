import { useAppStore } from "./hooks/useAppStore";
import { Button } from "antd";

const PostEditorButton = () => {
  const editorState = useAppStore((state) => state.postEditor.state);
  const setPostEditor = useAppStore((state) => state.setPostEditor);

  function handleCreateModeChange(state) {
    setPostEditor({
      state,
      mode: "create",
      data: {},
    });
  }

  if (editorState) {
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
