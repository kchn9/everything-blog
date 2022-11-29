import { Tag } from "antd";

const CategoryTag = ({ label, closable, onClose }) => {
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

export { CategoryTag };
