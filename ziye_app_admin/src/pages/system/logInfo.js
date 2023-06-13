import { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Table, Select, Transfer, Popconfirm, Tag } from "antd";
import Dialog from "@/components/DialogComponent";
import { SearchOutlined, SyncOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { http, download } from "@/utils";

const ExportDialog = ({ dataSource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);

  const handleOk = async () => {
    if (!targetKeys.length) {
      return;
    }
    const res = await http.post("/user/loginLog/export", { props: targetKeys });
    download(process.env.REACT_APP_APIURL + res, `${new Date().getTime()}`);
    setIsModalOpen(false);
    http.get(`/file/remove?url=${res}`);
  };

  const handleCancel = async () => {
    setTargetKeys([]);
    await setIsModalOpen(false);
  };

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        ghost
        style={{ color: "#E6A23C", borderColor: "#E6A23C" }}
        onClick={() => setIsModalOpen(true)}
      >
        导出
      </Button>
      <Dialog
        className="export-dialog"
        width="600px"
        title="导出数据"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={onChange} render={(item) => item.title} />
      </Dialog>
    </>
  );
};

function LogInfoComponent() {
  const [form] = Form.useForm();
  const [foled, setFoled] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 20,
    totalPages: 0,
  });

  const columns = [
    { title: "用户名称", dataIndex: "username", key: "username" },
    { title: "登录地址", dataIndex: "address", key: "address" },
    // { title: "登录地点", dataIndex: "place", key: "place" },
    { title: "浏览器", dataIndex: "browser", key: "browser" },
    { title: "操作系统", dataIndex: "system", key: "system" },
    {
      title: "状态",
      dataIndex: "statusName",
      key: "statusName",
      render: (value, record) => <Tag color={record["status"] ? "#f50" : "#87d068"}>{value}</Tag>,
    },
    { title: "登录时间", dataIndex: "loginTime", key: "loginTime" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Popconfirm
            title="是否删除该信息"
            placement="bottom"
            onConfirm={() => onDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const getData = async () => {
    const res = await http.post("user/loginLog", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.id));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    (async () => {
      const res = await http.post("user/loginLog", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.id));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const onDelete = async (id) => {
    await http.post(`/user/loginLog/delete?id=${id}`, {});
    getData();
  };

  const handleFinish = async (values) => {
    if (!!values.loginTimes) {
      const [loginTimeFrom, loginTimeTo] = values.loginTimes;
      values.loginTimeFrom = loginTimeFrom;
      values.loginTimeTo = loginTimeTo;
      delete values.loginTimes;
    }
    const res = await http.post("/user/loginLog", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.id));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("/user/loginLog/deleteBatch?", formData);
    getData();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKey) => {
      setSelectedRowKeys(selectedRowKey);
    },
  };

  return (
    <div className="table_wapper">
      <div className="main_header" style={{ display: foled && "none" }}>
        <Form layout="inline" form={form} className="screen_from" onFinish={handleFinish} autoComplete="off">
          <Form.Item name="address" label="登录地址">
            <Input allowClear maxLength="15" />
          </Form.Item>
          <Form.Item name="username" label="用户名称">
            <Input allowClear maxLength="15" />
          </Form.Item>
          <Form.Item name="status" label="状态" style={{ width: "240px" }}>
            <Select>
              <Select.Option value={0}>成功</Select.Option>
              <Select.Option value={1}>失败</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="loginTimes" label="登录时间">
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
            <Popconfirm
              title="是否删除确定多条信息"
              placement="bottom"
              onConfirm={handleDelete}
              okText="是"
              cancelText="否"
            >
              <Button danger icon={<DeleteOutlined />} disabled={!selectedRowKeys.length}>
                删除
              </Button>
            </Popconfirm>
            <ExportDialog dataSource={columns.filter((item) => item.dataIndex)} />
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

export default LogInfoComponent;
