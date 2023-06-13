import { useEffect, useState } from "react";
import {
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  DoubleRightOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Table, Transfer, Radio, Dropdown, Menu, Popconfirm, Switch } from "antd";
import Dialog from "@/components/DialogComponent";
import rules from "@/config/rules";
import { http, download } from "@/utils";
import { useNavigate } from "react-router-dom";

const AddDialog = ({ isModalOpen, setIsModalOpen, model, setModel, callBack }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    model.talentId && form.setFieldsValue({ ...model });
  }, [form, model]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (model.talentId) {
        values.talentId = model.talentId;
        await http.post("/talent/update", values);
      } else {
        await http.post("/talent/insert", values);
      }
      handleCancel();
      callBack();
    });
  };

  const handleCancel = async () => {
    form.resetFields();
    model.talentId && (await setModel({}));
    await setIsModalOpen(false);
  };

  return (
    <Dialog
      title={model.talentId ? "修改信息" : "添加信息"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={{ status: 0 }}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item name="talentName" label="人才名称" rules={rules.talentName}>
          <Input allowClear maxLength="12" />
        </Form.Item>
        {!model.talentId && (
          <>
            <Form.Item name="password" label="密码" rules={rules.password}>
              <Input.Password allowClear maxLength="18" />
            </Form.Item>
            <Form.Item name="validPassword" label="确认密码" rules={rules.validPassword}>
              <Input.Password allowClear maxLength="18" />
            </Form.Item>
          </>
        )}
        <Form.Item name="mobile" label="手机号" rules={rules.mobile}>
          <Input allowClear maxLength="11" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={rules.email}>
          <Input allowClear maxLength="30" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={rules.status}>
          <Radio.Group>
            <Radio value={0}>正常</Radio>
            <Radio value={1}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Dialog>
  );
};

const ResetPasswordDialog = ({ talentId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      await http.post("/talent/reset/password", { talentId, ...values });
      handleCancel();
    });
  };

  const handleCancel = async () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="link" size="small" icon={<CheckCircleOutlined />} onClick={() => setIsModalOpen(true)}>
        重置密码
      </Button>
      <Dialog width="600px" title="重置密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <Form form={form} autoComplete="off" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Form.Item name="password" label="新密码" rules={rules.password}>
            <Input.Password allowClear maxLength="18" />
          </Form.Item>
          <Form.Item name="validPassword" label="确认密码" rules={rules.validPassword}>
            <Input.Password allowClear maxLength="18" />
          </Form.Item>
        </Form>
      </Dialog>
    </>
  );
};

const ExportDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);

  const dataSource = [
    { title: "ID", dataIndex: "talentId", key: "talentId" },
    { title: "人才名称", dataIndex: "talentName", key: "talentName" },
    { title: "性别", dataIndex: "genderName", key: "genderName" },
    { title: "手机号", dataIndex: "mobile", key: "mobile" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "微信号", dataIndex: "wechat", key: "wechat" },
    { title: "出生日期", dataIndex: "birthTime", key: "birthTime" },
    { title: "籍贯", dataIndex: "nativePlace", key: "nativePlace" },
    { title: "住址", dataIndex: "address", key: "address" },
    { title: "状态", dataIndex: "statusName", key: "statusName" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
  ];

  const handleOk = async () => {
    if (!targetKeys.length) {
      return;
    }
    const res = await http.post("/talent/export", { props: targetKeys });
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

function TalentComponent() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [foled, setFoled] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState({});
  const [sourceData, setSourceData] = useState([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const columns = [
    { title: "人才名称", dataIndex: "talentName", key: "talentName" },
    { title: "手机号", dataIndex: "mobile", key: "mobile" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    {
      title: "状态",
      dataIndex: "statusName",
      key: "statusName",
      render: (value, record) => (
        <>
          <Switch
            size="small"
            checked={!record.status}
            onClick={async () => {
              await http.get(`/talent/update/status?id=${record.talentId}`);
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
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate("/pf/talent/details", { state: { id: record.key } })}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setModel(record);
              setIsModalOpen(true);
            }}
          >
            编辑
          </Button>

          <Popconfirm
            title="是否删除该信息"
            placement="bottom"
            onConfirm={() => onDelete(record.talentId)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
          <Dropdown
            overlay={<Menu items={[{ key: "1", label: <ResetPasswordDialog talentId={record.talentId} /> }]} />}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Button type="link" icon={<DoubleRightOutlined />}>
              更多
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

  const getData = async () => {
    const res = await http.post("/talent/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.talentId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    (async () => {
      const res = await http.post("/talent/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.talentId));
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
    const res = await http.post("/talent/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.talentId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const onDelete = async (id) => {
    await http.post(`talent/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("talent/deleteBatch", formData);
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
          <Form.Item name="talentName" label="人才名称">
            <Input allowClear maxLength="30" />
          </Form.Item>

          <Form.Item name="createTimes" label="创建时间">
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
            <span style={{ display: "none" }}>
              <Button type="primary" icon={<PlusOutlined />} ghost onClick={() => setIsModalOpen(true)}>
                添加
              </Button>
            </span>
            <AddDialog
              model={model}
              setModel={setModel}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              callBack={getData}
            />

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

export default TalentComponent;
