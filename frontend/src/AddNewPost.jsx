import postsAPI from "./services/postsAPI";
import coverAPI from "./services/coversAPI";
import {
  Typography,
  Form,
  Upload,
  Input,
  Select,
  Empty,
  Tag,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
const { Item } = Form;

const renderCustomTag = ({ label, closable, onClose }) => {
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="geekblue"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 2.5,
        marginLeft: 2.5,
        marginBottom: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const AddNewPost = ({
  categories,
  setAlert,
  setCreatingPostMode,
  setPosts,
}) => {
  const [form] = Form.useForm();
  const title = Form.useWatch("title", form);
  const body = Form.useWatch("body", form);
  const [filelist, setFilelist] = useState([]);
  const [coverId, setCoverId] = useState("");
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
    setCreatingPostMode(false);
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
      coverAPI.deleteCoverById(coverId).catch((e) => console.error(e));
    }
  }

  const categoriesOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category._id,
    }));
  }, [categories]);

  return (
    <>
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
            <Upload
              listType="picture-card"
              fileList={filelist}
              beforeUpload={(file) => {
                const bytesLimit = 2_000_000;
                const isTooBig = file.size > bytesLimit;
                const acceptedFormats = ["image/png", "image/jpeg"];
                const isNotAcceptedFormat = !acceptedFormats.includes(
                  file.type
                );
                if (isTooBig || isNotAcceptedFormat) {
                  return Upload.LIST_IGNORE;
                }
                return true;
              }}
              onChange={({ fileList }) => {
                let newFilelist = [...fileList];
                if (newFilelist.length > 1) {
                  const coverToDelete = newFilelist[0].response;
                  coverAPI
                    .deleteCoverById(coverToDelete._id)
                    .catch((e) =>
                      console.error("Unable to delete old cover", e)
                    );
                  newFilelist = newFilelist.slice(-1);
                }
                setFilelist(newFilelist);
              }}
              onRemove={(file) => {
                const coverToDelete = file.response;
                coverAPI
                  .deleteCoverById(coverToDelete._id)
                  .then(() => {
                    return true;
                  })
                  .catch((e) => {
                    console.error("Unable to delete old cover", e);
                    return false;
                  });
              }}
              customRequest={({ file, onSuccess, onError }) => {
                coverAPI
                  .postCover(file)
                  .then((response) => {
                    setCoverId(response._id);
                    onSuccess(response);
                  })
                  .catch((e) => {
                    onError(e, file);
                  });
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
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
              tagRender={renderCustomTag}
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
    </>
  );
};

export { AddNewPost };
