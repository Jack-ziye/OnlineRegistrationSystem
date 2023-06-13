import { Spin } from "antd";

const LoadingComponent = ({ title = "加载中..." }) => {
  const style = {
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100vh",
    position: "absolute",
    zIndex: "2000",
    fontSize: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    visibility: "hidden",
  };

  return <Spin id="loading-warpper" style={style} tip={title} />;
};

export default LoadingComponent;
