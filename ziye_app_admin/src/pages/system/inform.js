import { useEffect, useState } from "react";
import { SearchOutlined, SyncOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Table, Popconfirm, Switch, Modal, Select } from "antd";
import { http } from "@/utils";

function InformComponent() {
  const [form] = Form.useForm();
  const [foled, setFoled] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const lookDetails = ({ title, content }) => {
    Modal.info({
      title: title,
      content: <div style={{ paddingRight: "8px", maxHeight: "600px", overflowY: "auto" }}>{content}</div>,
      width: 800,
      okText: "关闭",
    });
  };

  const columns = [
    { title: "类型", dataIndex: "noticeTypeName", key: "noticeTypeName" },
    { title: "标题", dataIndex: "noticeTitle", key: "noticeTitle" },
    {
      title: "已读",
      dataIndex: "isRead",
      key: "isRead",
      render: (value, record) => (
        <>
          <Switch
            size="small"
            checked={value}
            onClick={async () => {
              await http.get(`/inform/update/read?id=${record.informId}&isRead=${Math.abs(value - 1)}`);
              getData();
            }}
          />
        </>
      ),
    },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Button type="link" icon={<EyeOutlined />} onClick={() => lookDetails(record)}>
            查看
          </Button>
          <Popconfirm
            title="是否删除该信息"
            placement="bottom"
            onConfirm={() => onDelete(record.informId)}
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

  useEffect(() => {
    (async () => {
      const res = await http.post("/inform/list/current", {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.informId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const getData = async () => {
    const res = await http.post("/inform/list/current", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.informId));
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
    const res = await http.post("/inform/list/current", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.informId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const onDelete = async (id) => {
    await http.post(`inform/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("inform/deleteBatch", formData);
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
          <Form.Item name="noticeTitle" label="标题">
            <Input allowClear maxLength="30" />
          </Form.Item>
          <Form.Item name="noticeType" label="类型">
            <Select
              defaultValue={""}
              style={{ width: 200 }}
              options={[
                { value: "", label: "全部" },
                { value: 0, label: "通知" },
                { value: 1, label: "公告" },
                { value: 2, label: "消息" },
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

export default InformComponent;
