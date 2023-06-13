import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "@/styles/profile/info.scss";
import { Skeleton, Input, Radio, Form, Button, DatePicker, Space, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import CropperComponent from "@/components/CropperComponent";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { http, debounce } from "@/utils";

const TextComponent = ({ value }) => {
  return <div style={{ width: "100%" }}>{value}</div>;
};

// 表单输入数据是否改变
const isEquals = (obj1, obj2) => {
  for (const key in obj1) {
    if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      return false;
    }
  }
  return true;
};

const InfoComponent = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sourceDate, setSourceData] = useState({});
  const [changeProp, setChangeProp] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await http.get("/talent/current").finally(() => {
        setTimeout(() => setLoading(false), 400);
      });
      res.birthTime = dayjs(res.birthTime);
      form.setFieldsValue(res);
      setSourceData(res);
    })();
  }, [form]);

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      setSending(true);
      values.birthTime = dayjs(values.birthTime).locale("zh-cn").format("YYYY-MM-DD");
      await http.post("/talent/current/update", values).finally(() => setSending(false));
      setChangeProp([]);
      setSourceData(values);
    });
  };

  const onCancel = () => {
    setChangeProp([]);
    form.resetFields();
    form.setFieldsValue(sourceDate);
  };

  const onValuesChange = debounce((arg) => {
    const prop = Object.keys(arg)[0];
    const status = isEquals(arg, sourceDate);
    if (status) {
      const list = changeProp.filter((item) => item !== prop);
      setChangeProp(list);
    } else {
      !changeProp.includes(prop) && setChangeProp([...changeProp, prop]);
    }
  }, 200);

  return (
    <div className="info_wrapper">
      <Skeleton active loading={loading}>
        <div className="user_card">
          <div className="avatar_card">
            <CropperComponent
              avatar={true}
              value={sourceDate.avatar}
              size={1024}
              onOk={async (file) => {
                let formData = new FormData();
                formData.append("file", file);
                const res = await http.post("/file/upload", formData);
                await http.post("/talent/current/update", { talentId: sourceDate.talentId, avatar: res });
              }}
            />
          </div>
          <div className="info_card">
            <Form form={form} layout="inline" onValuesChange={onValuesChange}>
              <Form.Item name="talentId" label="ID" hidden></Form.Item>
              <Form.Item name="talentName" label="用户名称">
                <TextComponent />
              </Form.Item>
              <Form.Item name="gender" label="性别">
                <Radio.Group>
                  <Radio value={0}>未知</Radio>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="mobile" label="手机号">
                <TextComponent />
              </Form.Item>
              <Form.Item name="createTime" label="创建时间">
                <TextComponent />
              </Form.Item>
              <Form.Item name="wechat" label="微信号">
                <Input placeholder="请输入微信号" maxLength={20} />
              </Form.Item>
              <Form.Item name="email" label="邮箱地址">
                <Input placeholder="邮箱地址" />
              </Form.Item>
              <Form.Item name="birthTime" label="出生日期">
                <DatePicker />
              </Form.Item>
              <Form.Item name="nativePlace" label="籍贯">
                <Input />
              </Form.Item>
              <Form.Item name="address" label="住址">
                <Input.TextArea maxLength={100} autoSize />
              </Form.Item>

              <Form.Item className="submit_card">
                <Space>
                  <Button onClick={onCancel} disabled={!changeProp.length}>
                    取消
                  </Button>
                  <Button type="primary" onClick={onFinish} loading={sending} disabled={!changeProp.length}>
                    保存
                  </Button>
                  <Tooltip title="数据变更后启用操作按钮" trigger={["hover", "click"]}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default observer(InfoComponent);
