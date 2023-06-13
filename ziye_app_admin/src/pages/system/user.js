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
} from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Table, Transfer, Radio, Dropdown, Menu, Popconfirm, Switch } from "antd";
import Dialog from "@/components/DialogComponent";
import rules from "@/config/rules";
import { http, download } from "@/utils";

const AddDialog = ({ isModalOpen, setIsModalOpen, model, setModel, callBack }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    model.userId && form.setFieldsValue({ ...model });
  }, [form, model]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (model.userId) {
        values.userId = model.userId;
        await http.post("/user/update", values);
      } else {
        await http.post("/user/insert", values);
      }
      handleCancel();
      callBack();
    });
  };

  const handleCancel = async () => {
    form.resetFields();
    model.userId && (await setModel({}));
    await setIsModalOpen(false);
  };

  return (
    <Dialog
      title={model.userId ? "修改信息" : "添加信息"}
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
        <Form.Item name="username" label="用户名称" rules={rules.username}>
          <Input allowClear maxLength="12" />
        </Form.Item>
        <Form.Item name="nickName" label="用户昵称" rules={rules.nickName}>
          <Input allowClear maxLength="12" />
        </Form.Item>
        {!model.userId && (
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

const ResetPasswordDialog = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      await http.post("/user/reset/password", { userId, ...values });
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

const ExportDialog = ({ dataSource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);

  const handleOk = async () => {
    if (!targetKeys.length) {
      return;
    }
    const res = await http.post("/user/export", { props: targetKeys });
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

function UserComponent() {
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
    { title: "用户编号", dataIndex: "userId", key: "userId" },
    { title: "用户名称", dataIndex: "username", key: "username" },
    { title: "用户昵称", dataIndex: "nickName", key: "nickName" },
    { title: "手机号", dataIndex: "mobile", key: "mobile" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    {
      title: "状态",
      dataIndex: "statusName",
      key: "statusName",
      render: (_, record) => (
        <>
          <Switch
            size="small"
            checked={!record.status}
            onClick={async () => {
              await http.get(`/user/update/status?id=${record.userId}`);
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
            onConfirm={() => onDelete(record.userId)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
          <Dropdown
            overlay={<Menu items={[{ key: "1", label: <ResetPasswordDialog userId={record.userId} /> }]} />}
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

  useEffect(() => {
    (async () => {
      const res = await http.post("/user/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.userId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const getData = async () => {
    const res = await http.post("/user/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
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
    const res = await http.post("/user/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
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

  const onDelete = async (id) => {
    await http.post(`user/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("user/deleteBatch", formData);
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
            <Button type="primary" icon={<PlusOutlined />} ghost onClick={() => setIsModalOpen(true)}>
              添加
            </Button>
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

export default UserComponent;
