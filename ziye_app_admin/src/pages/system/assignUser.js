import { useState } from "react";
import { Button, Form, Input, Table, Popconfirm, Radio } from "antd";
import { SearchOutlined, SyncOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Dialog from "@/components/DialogComponent";
import { useEffect } from "react";
import { http } from "@/utils";
import { useLocation } from "react-router-dom";
import rules from "@/config/rules";

const AddDialog = ({ isModalOpen, setIsModalOpen, callBack }) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const columns = [
    { title: "角色名称", dataIndex: "roleName", key: "roleName" },
    { title: "用户名称", dataIndex: "username", key: "username" },
    { title: "用户昵称", dataIndex: "nickName", key: "nickName" },
    { title: "手机号", dataIndex: "mobile", key: "mobile" },
  ];

  useEffect(() => {
    if (!isModalOpen) return;

    (async () => {
      const res = await http.post("assign/user/list", {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.userId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [isModalOpen, pagination.pageNum, pagination.pageSize]);

  const handleFinish = async (values) => {
    const res = await http.post("assign/user/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.userId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const getData = async () => {
    const res = await http.post("assign/user/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleOk = async () => {
    await http.post("assign/user/update", { roleId: 2, users: `${selectedRowKeys}` });
    handleCancel();
    callBack();
  };

  const handleCancel = async () => {
    form.resetFields();
    await setIsModalOpen(false);
  };

  return (
    <Dialog title="添加用户" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose width={800}>
      <div className="dialog_table_warpper">
        <div className="main_header">
          <Form className="screen_from" layout="inline" form={form} onFinish={handleFinish} autoComplete="off">
            <Form.Item>
              <Form.Item name="username" label="用户名称">
                <Input allowClear maxLength="30" />
              </Form.Item>
              <Form.Item name="type" label="搜索类型">
                <Radio.Group>
                  <Radio value={undefined}>全部</Radio>
                  <Radio value={0}>未分配</Radio>
                  <Radio value={1}>已分配</Radio>
                </Radio.Group>
              </Form.Item>
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
    </Dialog>
  );
};

function AssignUserComponent() {
  const [form] = Form.useForm();
  const [foled, setFoled] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState({});
  const [sourceData, setSourceData] = useState([]);
  const { state } = useLocation();
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const columns = [
    { title: "用户名称", dataIndex: "username", key: "username" },
    { title: "用户昵称", dataIndex: "nickName", key: "nickName" },
    { title: "手机号", dataIndex: "mobile", key: "mobile" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Popconfirm
            title="是否删除该信息"
            placement="bottom"
            onConfirm={() => onDelete(record.key)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              取消分配
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const getData = async () => {
    const res = await http.post("assign/user/list", {
      roleId: state.id,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
    });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.userId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    state.id &&
      (async () => {
        const res = await http.post("assign/user/list", {
          roleId: state.id,
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
        });
        const { content, pageNum, pageSize, totalPages } = res;
        content.map((item) => (item.key = item.userId));
        setPagination({ pageNum, pageSize, totalPages });
        setSourceData(content);
      })();
  }, [state, pagination.pageNum, pagination.pageSize]);

  const handleFinish = async (values) => {
    const res = await http.post("assign/user/list", {
      ...values,
      roleId: state.id,
      pageNum: 1,
      pageSize: pagination.pageSize,
    });
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
    await http.post(`assign/user/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("assign/user/deleteBatch", formData);
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
          <Form.Item name="userName" label="用户名称">
            <Input allowClear maxLength="18" />
          </Form.Item>
          <Form.Item name="mobile" label="联系方式" rules={rules.mobile}>
            <Input allowClear maxLength="11" />
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
              添加用户
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

export default AssignUserComponent;
