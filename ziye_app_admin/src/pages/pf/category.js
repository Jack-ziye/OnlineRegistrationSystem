import { useState } from "react";
import { Button, Form, Input, Table, Radio, Popconfirm, InputNumber, Switch } from "antd";
import { SearchOutlined, SyncOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Dialog from "@/components/DialogComponent";
import { useEffect } from "react";
import rules from "@/config/rules";
import { http } from "@/utils";

const AddDialog = ({ isModalOpen, setIsModalOpen, model, setModel, callBack }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    model.categoryId && form.setFieldsValue({ ...model });
  }, [form, model]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (model.categoryId) {
        values.categoryId = model.categoryId;
        await http.post("/category/update", values);
      } else {
        await http.post("/category/insert", values);
      }
      handleCancel();
      callBack();
    });
  };

  const handleCancel = async () => {
    form.resetFields();
    model.categoryId && (await setModel({}));
    await setIsModalOpen(false);
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
        initialValues={{ status: 0, orderIndex: 0 }}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        preserve={false}
      >
        <Form.Item name="categoryName" label="栏目名称" rules={rules.categoryName}>
          <Input allowClear maxLength="20" />
        </Form.Item>
        <Form.Item name="orderIndex" label="显示顺序" rules={rules.orderIndex}>
          <InputNumber min="0" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={rules.status}>
          <Radio.Group>
            <Radio value={0}>正常</Radio>
            <Radio value={1}>停用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="remark" label="备注" rules={rules.remark}>
          <Input allowClear maxLength="18" />
        </Form.Item>
      </Form>
    </Dialog>
  );
};

function CategoryComponent() {
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
    { title: "名称", dataIndex: "categoryName", key: "categoryName" },
    { title: "显示顺序", dataIndex: "orderIndex", key: "orderIndex" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
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
              await http.get(`/category/update/status?id=${record.categoryId}`);
              getData();
            }}
          />
        </>
      ),
    },
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
    const res = await http.post("category/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.categoryId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    (async () => {
      const res = await http.post("category/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.categoryId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const handleFinish = async (values) => {
    const res = await http.post("/category/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.categoryId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const onDelete = async (id) => {
    await http.post(`/category/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("/category/deleteBatch", formData);
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

export default CategoryComponent;
