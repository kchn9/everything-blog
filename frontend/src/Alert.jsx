import { Alert as AntAlert, Space } from "antd";

const Alert = ({ type, title, errorBody }) => {
  const acceptableTypes = ["success", "info", "warning", "error"];

  if (acceptableTypes.includes(type)) {
    return (
      <Space
        direction="vertical"
        style={{
          position: "absolute",
          bottom: "18px",
          right: "18px",
          minWidth: "25vw",
        }}
      >
        <AntAlert
          message={title}
          description={errorBody}
          type={type}
          closable
        />
      </Space>
    );
  }

  return null;
};

export { Alert };
