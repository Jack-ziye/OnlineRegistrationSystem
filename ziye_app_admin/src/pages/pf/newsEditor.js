import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Radio, Button, Space } from "antd";
import TinymceFormComponent from "@/components/TinymceFormComponent";
import rules from "@/config/rules";
import { http } from "@/utils";

function ProjectEditorComponent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (state && state.id) {
      (async () => {
        const res = await http.get(`/news/info?id=${state.id}`);
        form.setFieldsValue(res);
      })();
    }
  }, [form, state]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (values.newsId) {
        await http.post("/news/update", values);
        navigate(-1);
      } else {
        await http.post("/news/insert", values);
        navigate(-1);
      }
    });
  };

  return (
    <>
      <Form form={form} initialValues={{ status: 0, orderIndex: 0 }} autoComplete="off" preserve={false}>
        <Form.Item name="newsId" hidden></Form.Item>
        <Form.Item name="title" label="标题" rules={rules.title}>
          <Input allowClear maxLength="20" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={rules.status}>
          <Radio.Group>
            <Radio value={0}>发布</Radio>
            <Radio value={1}>下架</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="content" rules={rules.content}>
          <TinymceFormComponent />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Space>
          <Button onClick={() => navigate(-1)}>取消</Button>
          <Button type="primary" onClick={handleOk}>
            提交
          </Button>
        </Space>
      </div>
    </>
  );
}

export default ProjectEditorComponent;
