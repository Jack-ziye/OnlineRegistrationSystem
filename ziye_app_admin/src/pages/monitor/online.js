import { useEffect, useState } from "react";
import { http, loading, viewListener, customObserver } from "@/utils";
import { Button, Form, Input, Table, Popconfirm } from "antd";
import { SearchOutlined, SyncOutlined, DeleteOutlined } from "@ant-design/icons";

function OnlineComponent() {
  const [form] = Form.useForm();
  const [sourceData, setSourceData] = useState([]);

  const columns = [
    { title: "令牌", dataIndex: "token", key: "token", ellipsis: true },
    { title: "用户名称", dataIndex: "username", key: "username" },
    { title: "登录地址", dataIndex: "address", key: "address" },
    // { title: "登录地点", dataIndex: "place", key: "place" },
    { title: "浏览器", dataIndex: "browser", key: "browser" },
    { title: "操作系统", dataIndex: "system", key: "system" },
    { title: "状态", dataIndex: "statusName", key: "statusName" },
    { title: "登录时间", dataIndex: "loginTime", key: "loginTime" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Popconfirm
            title="是否强制该用户下线"
            placement="bottom"
            onConfirm={async () => {
              await http.get(`/monitor/online/delete?token=${record.token}`);
              getDate();
            }}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              强退
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      loading.open();
      const res = await http.post("/monitor/online/select", {});
      res.map((item) => (item.key = item.token));
      setSourceData(res);

      // 轮询更新数据
      viewListener({
        delay: 0,
        handleEnter: (state) => {
          const createTimer = () => {
            const timer = setInterval(async () => {
              await http.post("/monitor/online/select", {}).catch(() => {
                clearInterval(timer);
              });
              res.map((item) => (item.key = item.token));
              setSourceData(res);
            }, 2000);
            return timer;
          };

          const { initObserver, addObserver } = customObserver();
          initObserver({
            delay: 0,
            onEnter: () => {
              state.timer = createTimer();
            },
            onLeave: () => {
              state.timer && clearInterval(state.timer);
            },
          });
          addObserver(document.querySelector(".online_wapper"));
        },
        handleLeave: (state) => {
          state.timer && clearInterval(state.timer);
        },
      });
    })();
  }, []);

  const getDate = async () => {
    const res = await http.post("/monitor/online/select", {});
    res.map((item) => (item.key = item.token));
    setSourceData(res);
  };

  const handleFinish = async (values) => {
    const res = await http.post("/monitor/online/select", values);
    res.map((item) => (item.key = item.token));
    setSourceData(res);
  };

  const handlerReset = async () => {
    form.resetFields();
    const res = await http.post("/monitor/online/select", {});
    res.map((item) => (item.key = item.token));
    setSourceData(res);
  };

  return (
    <div className="table_wapper online_wapper">
      <div className="main_header">
        <Form layout="inline" form={form} className="screen_from" onFinish={handleFinish} autoComplete="off">
          <Form.Item name="address" label="登录地址">
            <Input allowClear maxLength="15" />
          </Form.Item>
          <Form.Item name="username" label="用户名称">
            <Input allowClear maxLength="15" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              搜索
            </Button>
            <Button onClick={handlerReset} icon={<SyncOutlined />}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="main_body">
        <Table columns={columns} dataSource={sourceData} />
      </div>
    </div>
  );
}
export default OnlineComponent;
