import { Typography, Form, Input, Select, Empty, Image, Button } from "antd";
import { CoverUpload } from "./CoverUpload";
import { CategoryTag } from "./CategoryTag";
import { useState, useMemo } from "react";
import { useAppStore } from "./hooks/useAppStore";
import { usePostFormStore } from "./hooks/usePostFormStore";
const { Item } = Form;

const PostForm = ({ messageApi }) => {
  // state
  const categories = useAppStore((state) => state.categories);
  const categoriesOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category._id,
    }));
  }, [categories]);
  const isNewPost = usePostFormStore((state) => state.isNewPost);
  const oldPost = usePostFormStore((state) => state.oldPost);

  // form values
  const [form] = Form.useForm();
  const [currentCoverId, setCurrentCoverId] = useState(() => {
    return isNewPost ? "" : oldPost.coverId;
  });

  // handlers
  const handleSubmit = usePostFormStore((state) => state.handleSubmit);
  const handleSuccessfullFinish = usePostFormStore(
    (state) => state.handleSuccessfullFinish
  );
  const handleFailedFinish = usePostFormStore(
    (state) => state.handleFailedFinish
  );

  return (
    <div className="post-form-container">
      <Typography.Title level={2} style={{ margin: "0 auto 48px auto" }}>
        {isNewPost ? "Creating new post" : "Updating post"}
      </Typography.Title>
      <Form
        onSubmitCapture={(e) => {
          e.preventDefault();
          handleSubmit(form, currentCoverId);
        }}
        onFinish={() =>
          handleSuccessfullFinish(form, currentCoverId, messageApi)
        }
        onFinishFailed={() => {
          handleFailedFinish(messageApi);
        }}
        initialValues={oldPost}
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
              required: isNewPost,
              message: "Post title is required",
            },
          ]}
        >
          <Input placeholder="Please input post title" />
        </Item>
        {oldPost && oldPost.coverSrc && (
          <Item label="Current cover">
            <Image height={200} src={oldPost.coverSrc} />
          </Item>
        )}
        <Item label="Cover">
          <CoverUpload updateCurrentCover={setCurrentCoverId} />
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
              required: isNewPost,
              message: "Post content is required",
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
