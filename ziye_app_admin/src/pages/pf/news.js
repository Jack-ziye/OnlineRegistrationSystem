import { useState } from "react";
import { Button, Form, Input, Table, Popconfirm, Switch, DatePicker, Tooltip } from "antd";
import {
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { http } from "@/utils";
import { useNavigate } from "react-router-dom";

function NewsComponent() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [foled, setFoled] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const columns = [
    { title: "标题", dataIndex: "title", key: "title" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "状态",
      dataIndex: "statusName",
      key: "statusName",
      render: (value, record) => (
        <Tooltip placement="bottom" title={value}>
          <Switch
            size="small"
            checked={!record.status}
            onClick={async () => {
              await http.get(`/news/update/status?id=${record.newsId}`);
              getData();
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate("/pf/news/details", { state: { id: record.key } })}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate("/pf/news/editor", { state: { id: record.key } })}
          >
            编辑
          </Button>
          <Popconfirm
            title="是否删除该信息"
            placement="bottom"
            onConfirm={() => onDelete(record.key)}
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
    const res = await http.post("news/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.newsId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    (async () => {
      const res = await http.post("news/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.newsId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const handleFinish = async (values) => {
    if (!!values.createTimes) {
      const [creatTimeFrom, creatTimeTo] = values.createTimes;
      values.creatTimeFrom = new Date(creatTimeFrom).toLocaleDateString();
      values.creatTimeTo = new Date(creatTimeTo).toLocaleDateString();
      delete values.createTimes;
    }
    const res = await http.post("/news/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.newsId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const onDelete = async (id) => {
    await http.post(`/news/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("/news/deleteBatch", formData);
    getData();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
  };

  return (
    <div className="table_wapper">
      <div className="main_header" style={{ display: foled && "none" }}>
        <Form layout="inline" form={form} className="screen_from" onFinish={handleFinish} autoComplete="off">
          <Form.Item name="newsName" label="新闻名称">
            <Input allowClear maxLength="18" />
          </Form.Item>
          <Form.Item name="createTimes" label="申请时间">
            <DatePicker.RangePicker showToday />
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
            <Button type="primary" icon={<PlusOutlined />} ghost onClick={() => navigate("/pf/news/add")}>
              添加
            </Button>
            <Popconfirm
              title="是否删除确定多条信息"
              placement="bottom"
              onConfirm={handleDelete}
              okText="是"
              cancelText="否"
            >
              <Button icon={<DeleteOutlined />} danger disabled={!selectedRowKeys.length}>
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

export default NewsComponent;
