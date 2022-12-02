import { usePostFormStore } from "./hooks/usePostFormStore";
import { Button } from "antd";

const NewPostButton = () => {
  const showPostForm = usePostFormStore((state) => state.showPostForm);
  const setIsNewPost = usePostFormStore((state) => state.setIsNewPost);
  const setShowPostForm = usePostFormStore((state) => state.setShowPostForm);
  const setOldPost = usePostFormStore((state) => state.setOldPost);

  function handleCreateModeChange(state) {
    setShowPostForm(state);
    setIsNewPost(true);
    setOldPost(() => ({
      oldPost: {
        _id: "",
        title: "",
        body: "",
        categories: [],
        coverId: "",
        coverSrc: "",
      },
    }));
  }

  if (showPostForm) {
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

export { NewPostButton };
