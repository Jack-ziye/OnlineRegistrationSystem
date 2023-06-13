import { useEffect, useState } from "react";
import { SearchOutlined, SyncOutlined, PlusOutlined, DeleteOutlined, BellOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Table, Popconfirm, Tag, Select } from "antd";
import { http } from "@/utils";
import { useLocation } from "react-router-dom";

function UserComponent() {
  const [form] = Form.useForm();
  const [foled, setFoled] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const { state } = useLocation();

  const columns = [
    { title: "用户名称", dataIndex: "username", key: "username" },
    { title: "手机号", dataIndex: "mobile", key: "mobile" },
    {
      title: "已读状态",
      dataIndex: "isRead",
      key: "isRead",
      render: (value, record) => value !== null && (value === 1 ? <Tag color="#108ee9">已读</Tag> : "未读"),
    },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          {record.informId ? (
            <Button
              type="link"
              icon={<BellOutlined />}
              danger
              onClick={async () => {
                await http.post(`/inform/delete?id=${record.informId}`);
                getData();
              }}
            >
              取消推送
            </Button>
          ) : (
            <Button
              type="link"
              icon={<BellOutlined />}
              onClick={async () => {
                await http.post("/inform/insert", { noticeId: state.id, userId: record.userId });
                getData();
              }}
            >
              推送
            </Button>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const data = { pageNum: pagination.pageNum, pageSize: pagination.pageSize, noticeId: state.id };
      const res = await http.post("/notice/user/list", data);
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.userId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [state, pagination.pageNum, pagination.pageSize]);

  const getData = async () => {
    const data = { pageNum: pagination.pageNum, pageSize: pagination.pageSize, noticeId: state.id };
    const res = await http.post("/notice/user/list", data);
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.userId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handleFinish = async (values) => {
    if (!!values.createTimes) {
      const [creatTimeFrom, creatTimeTo] = values.createTimes;
      values.creatTimeFrom = creatTimeFrom;
      values.creatTimeTo = creatTimeTo;
      delete values.createTimes;
    }
    const data = { ...values, pageNum: pagination.pageNum, pageSize: pagination.pageSize, noticeId: state.id };
    const res = await http.post("/notice/user/list", data);
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.userId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const handleDelete = async () => {
    await http.post("/inform/cancel-push", { noticeId: state.id, userList: selectedRowKeys });
    getData();
  };

  const handlePush = async () => {
    await http.post("/inform/push", { noticeId: state.id, userList: selectedRowKeys });
    getData();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
  };

  return (
    <div className="table_wapper">
      <div className="main_header" style={{ display: foled && "none" }}>
        <Form className="screen_from" layout="inline" form={form} onFinish={handleFinish} autoComplete="off">
          <Form.Item name="username" label="用户名称">
            <Input allowClear maxLength="30" />
          </Form.Item>

          <Form.Item name="isPush" label="类型">
            <Select
              defaultValue={""}
              style={{ width: 200 }}
              options={[
                { value: "", label: "全部" },
                { value: "true", label: "已推送" },
                { value: "false", label: "未推送" },
              ]}
            />
          </Form.Item>

          <Form.Item name="createTimes" label="创建时间">
            <DatePicker.RangePicker />
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
        <div className="button_card">
          <div>
            <Button
              type="primary"
              disabled={!selectedRowKeys.length}
              icon={<PlusOutlined />}
              ghost
              onClick={handlePush}
            >
              推送
            </Button>

            <Popconfirm
              title="是否删除确定多条信息"
              placement="bottom"
              onConfirm={handleDelete}
              okText="是"
              cancelText="否"
            >
              <Button danger icon={<DeleteOutlined />} disabled={!selectedRowKeys.length}>
                取消推送
              </Button>
            </Popconfirm>
          </div>
          <div>
            <Button shape="circle" icon={<SearchOutlined />} onClick={() => setFoled(!foled)}></Button>
            <Button shape="circle" icon={<SyncOutlined />} onClick={getData}></Button>
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sourceData}
          pagination={{
            current: pagination.pageNum,
            pageSize: pagination.pageSize,
            total: pagination.totalPages,
            showSizeChanger: true,
            onChange: (pageNum, pageSize) => {
              setPagination({ pageNum, pageSize, totalPages: pagination.totalPages });
            },
          }}
        />
      </div>
    </div>
  );
}

export default UserComponent;
