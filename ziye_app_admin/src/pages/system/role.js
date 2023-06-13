import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Table,
  Transfer,
  Radio,
  Dropdown,
  Menu,
  Popconfirm,
  Switch,
} from "antd";

import {
  UserOutlined,
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import Dialog from "@/components/DialogComponent";
import MenuTree from "@/components/MenuTreeComponent";
import rules from "@/config/rules";
import { download, http } from "@/utils";

const AddDialog = ({ isModalOpen, setIsModalOpen, model, setModel, callBack }) => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    model.roleId && form.setFieldsValue({ ...model });
  }, [form, model]);

  useEffect(() => {
    if (!isModalOpen) return;
    (async () => {
      const res = await http.post("menu/list", {});
      setTreeData(res);
    })();
  }, [isModalOpen]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (model.roleId) {
        values.roleId = model.roleId;
        await http.post("/role/update", values);
      } else {
        await http.post("/role/insert", values);
      }
      handleCancel();
      callBack();
    });
  };

  const handleCancel = () => {
    setModel({});
    setTimeout(() => {
      form.resetFields();
      setIsModalOpen(false);
    }, 100);
  };

  return (
    <Dialog
      title={model.roleId ? "修改信息" : "添加信息"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={{ orderIndex: 0, status: true }}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        preserve={false}
      >
        <Form.Item name="roleName" label="角色名称" rules={rules.roleName}>
          <Input allowClear maxLength="12" />
        </Form.Item>
        <Form.Item name="roleCode" label="权限字符" rules={rules.roleCode}>
          <Input allowClear maxLength="12" />
        </Form.Item>
        <Form.Item name="orderIndex" label="显示顺序" rules={rules.orderIndex}>
          <InputNumber min="0" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={rules.status}>
          <Radio.Group>
            <Radio value={true}>正常</Radio>
            <Radio value={false}>停用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="roleMenu" label="菜单权限">
          <MenuTree
            className="tree_select"
            checkable
            selectable={false}
            treeData={treeData}
            fieldNames={{ key: "menuId", title: "menuName", children: "children" }}
          />
        </Form.Item>
        <Form.Item name="remark" label="备注" rules={rules.remark}>
          <Input allowClear maxLength="18" />
        </Form.Item>
      </Form>
    </Dialog>
  );
};

const ExportDialog = ({ dataSource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);

  const handleOk = async () => {
    if (!targetKeys.length) {
      return;
    }
    const res = await http.post("/role/export", { props: targetKeys });
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

function RoleComponent() {
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

  const navigate = useNavigate();

  const dropdownMenu = (record) => {
    return (
      <Menu
        items={[
          {
            key: "1",
            label: (
              <Button
                type="link"
                size="small"
                icon={<UserOutlined />}
                onClick={() => navigate("assgin/user", { state: { id: record.roleId } })}
              >
                分配用户
              </Button>
            ),
          },
        ]}
      />
    );
  };

  const columns = [
    { title: "角色编号", dataIndex: "roleId", key: "roleId" },
    { title: "角色名称", dataIndex: "roleName", key: "roleName" },
    { title: "权限字符", dataIndex: "roleCode", key: "roleCode" },
    { title: "显示顺序", dataIndex: "orderIndex", key: "orderIndex" },
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
              await http.get(`/role/update/status?id=${record.roleId}`);
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
      render: ({ roleId }, record) =>
        roleId !== 1 && (
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
              onConfirm={() => onDelete(record.roleId)}
              okText="是"
              cancelText="否"
            >
              <Button type="link" icon={<DeleteOutlined />} danger>
                删除
              </Button>
            </Popconfirm>
            <Dropdown overlay={dropdownMenu(record)} placement="bottomRight" arrow={{ pointAtCenter: true }}>
              <Button type="link" icon={<DoubleRightOutlined />}>
                更多
              </Button>
            </Dropdown>
          </>
        ),
    },
  ];

  const getData = async () => {
    const res = await http.post("/role/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.roleId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    (async () => {
      const res = await http.post("/role/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.roleId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const handleFinish = async (values) => {
    if (!!values.createTimes) {
      const [creatTimeFrom, creatTimeTo] = values.createTimes;
      values.creatTimeFrom = creatTimeFrom;
      values.creatTimeTo = creatTimeTo;
      delete values.createTimes;
    }
    const res = await http.post("/role/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.roleId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const onDelete = async (roleId) => {
    await http.post(`role/delete?id=${roleId}`);
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("role/deleteBatch", formData);
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
          <Form.Item name="roleName" label="角色名称">
            <Input allowClear maxLength="18" />
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

export default RoleComponent;
