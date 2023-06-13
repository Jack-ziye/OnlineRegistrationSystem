import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Result } from "antd";
import { crypto, http } from "@/utils";

const SendCode = () => {
  const { pid, tid } = useParams();
  const [projectId, talentId] = [crypto.decrypt(pid), crypto.decrypt(tid)];
  const [result, setResult] = useState(false);

  const onClick = async () => {
    await http.post("/web/apply/add", { projectId, talentId });
    setResult(true);
  };

  const style = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  };

  return (
    <div style={style}>
      {result ? (
        <Result status="success" title="缴费成功" />
      ) : (
        <Button type="primary" key="back" onClick={onClick}>
          缴费
        </Button>
      )}
    </div>
  );
};

export default SendCode;
