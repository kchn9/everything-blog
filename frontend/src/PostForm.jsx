import postsAPI from "./services/postsAPI";
import coversAPI from "./services/coversAPI";
import { Typography, Form, Input, Select, Empty, Image, Button } from "antd";
import { CoverUpload } from "./CoverUpload";
import { CategoryTag } from "./CategoryTag";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import { useAppStore } from "./hooks/useAppStore";
const { Item } = Form;

const PostForm = ({ messageApi }) => {
  // form values
  const [form] = Form.useForm();
  const title = Form.useWatch("title", form);
  const body = Form.useWatch("body", form);
  const selectedCategories = Form.useWatch("categories", form);

  // state
  const categories = useAppStore((state) => state.categories);
  const categoriesOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category._id,
    }));
  }, [categories]);
  const postEditor = useAppStore((state) => state.postEditor);
  const oldPost = useAppStore((state) => state.postEditor.data.post);
  const [oldCover, setOldCover] = useState({
    _id: "",
    src: "",
  });

  const [currentCoverId, setCurrentCoverId] = useState(() => {
    return postEditor.mode === "update" ? oldPost.coverId : undefined;
  });

  // effects
  useEffect(() => {
    if (currentCoverId && postEditor.mode === "update") {
      coversAPI.getCoverSrcById(currentCoverId).then((src) => {
        setOldCover({
          _id: currentCoverId,
          src,
        });
      });
    }
  }, []);

  // actions
  const updatePost = useAppStore((state) => state.updatePost);
  const addPost = useAppStore((state) => state.addPost);
  const setPostEditor = useAppStore((state) => state.setPostEditor);

  // handlers
  function handleSubmit(e) {
    e.preventDefault();
    if (postEditor.mode === "update" && fieldsChanged()) {
      postsAPI
        .updatePostById(
          postEditor.data.post._id,
          title,
          body,
          selectedCategories,
          currentCoverId
        )
        .then((post) => {
          if (oldCover._id !== currentCoverId) {
            coversAPI
              .deleteCoverById(oldCover._id)
              .then(() => updatePost(post))
              .catch((e) => console.log("Unable to delete old cover", e));
          } else {
            updatePost(post);
          }
        })
        .catch((e) => console.log(e));
    } else if (postEditor && postEditor.mode === "create") {
      postsAPI
        .postPost(title, body, selectedCategories, currentCoverId)
        .then(({ post }) => {
          addPost(post);
        })
        .catch((e) => console.log(e));
    }
  }

  function handleSuccessfullFinish() {
    setPostEditor({
      state: false,
      mode: "create",
      data: {},
    });
    if (postEditor.mode === "update" && fieldsChanged()) {
      messageApi.success("Your post has been updated successfully.");
    }
    if (postEditor.mode === "create") {
      messageApi.success("Your post has been added successfully.");
    }
  }

  function handleFailedFinish() {
    messageApi.error(
      "Ooops.. something went wrong, please check error fields and try again."
    );
  }

  // helper
  function fieldsChanged() {
    return (
      oldPost.title !== title ||
      oldPost.body !== body ||
      JSON.stringify(oldPost.categories) !==
        JSON.stringify(selectedCategories) ||
      currentCoverId !== oldCover._id
    );
  }

  return (
    <div className="post-form-container">
      <Typography.Title level={2} style={{ margin: "0 auto 48px auto" }}>
        {postEditor.mode === "update" ? "Updating post" : "Creating new post"}
      </Typography.Title>
      <Form
        onSubmitCapture={handleSubmit}
        onFinish={handleSuccessfullFinish}
        onFinishFailed={handleFailedFinish}
        initialValues={{
          title: oldPost?.title,
          body: oldPost?.body,
          categories: oldPost?.categories,
        }}
        form={form}
        name="post"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        autoComplete="off"
        size="large"
      >
        <Item
          label="Title"
          name="title"
          rules={[
            {
              required: postEditor.mode === "create",
              message: "Please input post title",
            },
          ]}
        >
          <Input placeholder="Please input post title" />
        </Item>
        {oldCover.src && (
          <Item label="Current cover">
            <Image height={200} src={oldCover.src} />
          </Item>
        )}
        <Item label="Cover">
          <CoverUpload
            mode={postEditor.mode}
            oldCoverId={oldCover._id}
            setCoverId={setCurrentCoverId}
          />
          <Typography.Text type="secondary">
            Maximum file size is 2MB. Accepted formats are .jpg/.jpeg and .png
          </Typography.Text>
        </Item>
        <Item label="Categories" name="categories">
          <Select
            mode="multiple"
            placeholder="Please start typing to select categories"
            options={categoriesOptions}
            notFoundContent={
              <Empty
                description="No categories found"
                imageStyle={{ height: 48 }}
              />
            }
            optionFilterProp="label"
            size="large"
            tagRender={CategoryTag}
          />
        </Item>
        <Item
          label="Post content"
          name="body"
          rules={[
            {
              required: postEditor.mode === "create",
              message: "Please input post content",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Please input post content"
            autoSize
            allowClear
            showCount
          />
        </Item>
        <Item wrapperCol={{ offset: 11 }}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 24 }}>
            Submit
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export { PostForm };
