import { Spin, Typography } from "antd";

const Loader = () => {
  return (
    <>
      <Spin
        size="large"
        style={{
          margin: "64px 0 24px 0",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Typography style={{ textAlign: "center" }}>Loading...</Typography>
    </>
  );
};

export { Loader };
