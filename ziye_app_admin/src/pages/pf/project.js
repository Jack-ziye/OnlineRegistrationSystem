import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Table, Popconfirm, Switch, Statistic, Tag, Tooltip, Transfer } from "antd";
import {
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import Dialog from "@/components/DialogComponent";
import { http, download } from "@/utils";

const ExportDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);

  const dataSource = [
    { title: "ID", dataIndex: "projectId", key: "projectId" },
    { title: "栏目名称", dataIndex: "categoryName", key: "categoryName" },
    { title: "项目名称", dataIndex: "projectName", key: "projectName" },
    { title: "开始时间", dataIndex: "startTime", key: "startTime" },
    { title: "截至时间", dataIndex: "endTime", key: "endTime" },
    { title: "状态", dataIndex: "statusInfo", key: "statusInfo" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
  ];

  const handleOk = async () => {
    if (!targetKeys.length) {
      return;
    }
    const res = await http.post("/project/export", { props: targetKeys });
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

function ProjectComponent() {
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

  const diffTimeRender = (diffTime) => {
    if (diffTime === 0) {
      return <Tag>已结束</Tag>;
    } else if (diffTime < 0) {
      return (
        <div style={{ display: "flex" }}>
          <Statistic.Countdown
            valueStyle={{ fontSize: "14px", marginRight: "4px" }}
            value={new Date().getTime() - diffTime * 1000}
            format={`D天 HH:mm:ss`}
            onFinish={getData}
          />
          <Tag color="#87d068">开始</Tag>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <Statistic.Countdown
            valueStyle={{ fontSize: "14px", marginRight: "4px" }}
            value={new Date().getTime() + diffTime * 1000}
            format={`D天 HH:mm:ss`}
            onFinish={getData}
          />
          <Tag color="#108ee9">结束</Tag>
        </div>
      );
    }
  };

  const columns = [
    { title: "栏目名称", dataIndex: "categoryName", key: "categoryName" },
    { title: "项目名称", dataIndex: "projectName", key: "projectName" },
    {
      title: "名额",
      dataIndex: "quota",
      key: "quota",
      render: (value) => (value === -1 ? "无限制" : value),
    },
    { title: "开始时间", dataIndex: "startTime", key: "startTime" },
    { title: "截至时间", dataIndex: "endTime", key: "endTime" },
    {
      title: "计时",
      dataIndex: "diffTime",
      key: "diffTime",
      render: (value) => diffTimeRender(value),
    },
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
              await http.get(`/project/update/status?id=${record.projectId}`);
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
            onClick={() => navigate("/pf/project/details", { state: { id: record.key } })}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate("/pf/project/editor", { state: { id: record.key } })}
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
    const res = await http.post("project/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.projectId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    (async () => {
      const res = await http.post("project/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.projectId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const handleFinish = async (values) => {
    const res = await http.post("/project/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.projectId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const onDelete = async (id) => {
    await http.post(`/project/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("/project/deleteBatch", formData);
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
          <Form.Item name="projectName" label="项目名称">
            <Input allowClear maxLength="18" />
          </Form.Item>
          <Form.Item name="categoryName" label="栏目名称">
            <Input allowClear maxLength="18" />
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
            <Button type="primary" icon={<PlusOutlined />} ghost onClick={() => navigate("/pf/project/add")}>
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
            <ExportDialog />
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

export default ProjectComponent;
