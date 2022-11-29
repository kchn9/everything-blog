import postsAPI from "./services/postsAPI";
import coverAPI from "./services/coversAPI";
import { Typography, Form, Input, Select, Empty, Tag, Button } from "antd";
import { CoverUpload } from "./CoverUpload";
import { CategoryTag } from "./CategoryTag";
import { useState, useMemo } from "react";
const { Item } = Form;

const PostForm = ({ categories, setAlert, setPostEditor, setPosts }) => {
  const [form] = Form.useForm();
  const [coverId, setCoverId] = useState("");
  const title = Form.useWatch("title", form);
  const body = Form.useWatch("body", form);
  const selectedCategories = Form.useWatch("categories", form);

  function handleSubmit(e) {
    e.preventDefault();
    postsAPI
      .postPost(title, body, selectedCategories, coverId)
      .then(({ post }) => {
        setPosts((prev) => [...prev, post]);
      })
      .catch((e) => console.log(e));
  }

  function handleSuccessfullFinish() {
    setPostEditor((prev) => ({
      ...prev,
      state: false,
    }));
    setAlert({
      title: "Success",
      body: "Your post has been added successfully.",
      type: "success",
    });
  }

  function handleFailedFinish() {
    setAlert({
      title: "Error",
      body: "Ooops.. something went wrong, please check error fields and try again.",
      type: "error",
    });
    if (coverId) {
      coverAPI.deleteCoverById(coverId).catch((e) => console.log(e));
    }
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
        Creating new post
      </Typography.Title>
      <Form
        onSubmitCapture={handleSubmit}
        onFinish={handleSuccessfullFinish}
        onFinishFailed={handleFailedFinish}
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
              required: true,
              message: "Please input post title",
            },
          ]}
        >
          <Input placeholder="Please input post title" />
        </Item>
        <Item label="Cover">
          <CoverUpload setCoverId={setCoverId} />
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
              required: true,
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
