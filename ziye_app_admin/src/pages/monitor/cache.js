import { Button, Form, Input, Table } from "antd";
import { SearchOutlined, SyncOutlined, DeleteOutlined } from "@ant-design/icons";

function CacheComponent() {
  const [form] = Form.useForm();

  const columns = [
    { title: "序号", dataIndex: "key", key: "key" },
    { title: "缓存名称", dataIndex: "cacheName", key: "cacheName" },
    { title: "缓存键名", dataIndex: "cacheKey", key: "cacheKey" },
    { title: "备注", dataIndex: "remark", key: "remark" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              console.log(record.token);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      cacheName: "login_tokens",
      cacheKey: "token",
      remark: "用户信息",
    },
  ];

  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="main_header">
        <Form layout="inline" form={form} className="screen_from" onFinish={handleFinish} autoComplete="off">
          <Form.Item name="cacheName" label="缓存名称">
            <Input allowClear maxLength="15" />
          </Form.Item>
          <Form.Item name="cacheKey" label="缓存键名">
            <Input allowClear maxLength="15" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              搜索
            </Button>
            <Button onClick={() => form.resetFields()} icon={<SyncOutlined />}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="main_body">
        <Table columns={columns} dataSource={data} align="center" />
      </div>
    </>
  );
}
export default CacheComponent;
