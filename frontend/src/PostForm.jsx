import postsAPI from "./services/postsAPI";
import coverAPI from "./services/coversAPI";
import { Typography, Form, Input, Select, Empty, Image, Button } from "antd";
import { Buffer } from "buffer";
import { CoverUpload } from "./CoverUpload";
import { CategoryTag } from "./CategoryTag";
import { useState, useMemo } from "react";
import { useEffect } from "react";
const { Item } = Form;

const PostForm = ({
  postEditor,
  categories,
  messageApi,
  setPostEditor,
  setPosts,
}) => {
  const [form] = Form.useForm();
  const title = Form.useWatch("title", form);
  const body = Form.useWatch("body", form);
  const selectedCategories = Form.useWatch("categories", form);

  const [coverId, setCoverId] = useState("");
  const [oldCover, setOldCover] = useState({
    _id: "",
    src: "",
  });
  const fetchOldCoverSrc = () => {
    coverAPI.getCoverById(coverId).then(({ file }) => {
      const buffer = file.data.data;
      const b64 = Buffer.from(buffer).toString("base64");
      const mimeType = file.contentType;
      setOldCover((prev) => ({
        ...prev,
        src: `data:${mimeType};base64,${b64}`,
      }));
    });
  };
  useEffect(() => {
    if (coverId && postEditor && postEditor.mode === "update") {
      setOldCover((prev) => ({
        ...prev,
        _id: coverId,
      }));
      fetchOldCoverSrc();
    }
  }, []);

  const initialValues = useMemo(() => {
    if (postEditor && postEditor.mode === "create") {
      return {
        title: "",
        body: "",
        categories: [],
      };
    }
    if (
      postEditor &&
      postEditor.data &&
      postEditor.data.post &&
      postEditor.mode === "update"
    ) {
      setCoverId(postEditor.data.post.coverId);
      return {
        title: postEditor.data.post.title,
        body: postEditor.data.post.body,
        categories: postEditor.data.post.categories,
      };
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (postEditor && postEditor.mode === "create") {
      postsAPI
        .postPost(title, body, selectedCategories, coverId)
        .then(({ post }) => {
          setPosts((prev) => [...prev, post]);
        })
        .catch((e) => console.log(e));
    } else if (
      postEditor &&
      postEditor.data &&
      postEditor.data.post &&
      postEditor.mode === "update"
    ) {
      if (
        postEditor.data.post.title === title &&
        postEditor.data.post.body === body &&
        JSON.stringify(postEditor.data.post.categories) ===
          JSON.stringify(selectedCategories) &&
        coverId === oldCover._id
      ) {
        return false;
      }

      postsAPI
        .updatePostById(
          postEditor.data.post._id,
          title,
          body,
          selectedCategories,
          coverId
        )
        .then((post) => {
          if (oldCover._id !== coverId) {
            coverAPI
              .deleteCoverById(oldCover._id)
              .then(() =>
                setPosts((prev) => [
                  ...prev.filter((p) => p._id !== post._id),
                  post,
                ])
              )
              .catch((e) => console.log("Unable to delete old cover", e));
          } else {
            setPosts((prev) => [
              ...prev.filter((p) => p._id !== post._id),
              post,
            ]);
          }
        })
        .catch((e) => console.log(e));
    }
  }

  function handleSuccessfullFinish() {
    setPostEditor((prev) => ({
      ...prev,
      data: {},
      state: false,
    }));
    if (postEditor.mode === "update") {
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

  const categoriesOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category._id,
    }));
  }, [categories]);

  return (
    <div
      style={{
        padding: "50px",
        marginTop: "25px",
        boxShadow:
          "0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
        borderRadius: "6px",
        background: "rgb(255, 255, 255)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography.Title level={2} style={{ margin: "0 auto 48px auto" }}>
        {postEditor && postEditor.mode === "create" && "Creating new post"}
        {postEditor && postEditor.mode === "update" && "Updating post"}
      </Typography.Title>
      <Form
        onSubmitCapture={handleSubmit}
        onFinish={handleSuccessfullFinish}
        onFinishFailed={handleFailedFinish}
        initialValues={initialValues}
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
        {coverId &&
          postEditor &&
          postEditor.mode === "update" &&
          oldCover &&
          oldCover.src && (
            <Item label="Current cover">
              <Image height={200} src={oldCover.src} />
            </Item>
          )}
        <Item label="Cover">
          <CoverUpload
            mode={postEditor.mode}
            oldCoverId={oldCover._id}
            setCoverId={setCoverId}
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
