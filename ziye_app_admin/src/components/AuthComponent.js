import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

// 路由鉴权 高阶组件
const AuthComponent = ({ children }) => {
  const isToken = getToken();

  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace></Navigate>;
  }
};

export default AuthComponent;
