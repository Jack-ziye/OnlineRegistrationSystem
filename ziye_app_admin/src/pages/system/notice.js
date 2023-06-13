import { useEffect, useState } from "react";
import {
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Table, Radio, Popconfirm, Switch, Modal, Select } from "antd";
import Dialog from "@/components/DialogComponent";
import rules from "@/config/rules";
import { http } from "@/utils";
import { useNavigate } from "react-router-dom";

const AddDialog = ({ isModalOpen, setIsModalOpen, model, setModel, callBack }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    model.noticeId && form.setFieldsValue({ ...model });
  }, [form, model]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (model.noticeId) {
        values.noticeId = model.noticeId;
        await http.post("/notice/update", values);
      } else {
        await http.post("/notice/insert", values);
      }
      handleCancel();
      callBack();
    });
  };

  const handleCancel = async () => {
    form.resetFields();
    model.noticeId && (await setModel({}));
    await setIsModalOpen(false);
  };

  return (
    <Dialog
      title={model.noticeId ? "修改信息" : "添加信息"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={1000}
    >
      <Form
        form={form}
        initialValues={{ status: 0, noticeType: 0 }}
        autoComplete="off"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name="title" label="标题" rules={rules.noticeTitle}>
          <Input allowClear maxLength="120" />
        </Form.Item>
        <Form.Item name="noticeType" label="类型">
          <Radio.Group>
            <Radio value={0}>通知</Radio>
            <Radio value={1}>公告</Radio>
            <Radio value={2}>消息</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Radio.Group>
            <Radio value={0}>正常</Radio>
            <Radio value={1}>停用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="content" label="内容" rules={rules.noticeContent}>
          <Input.TextArea showCount maxLength={2000} autoSize={{ minRows: 2, maxRows: 10 }} />
        </Form.Item>
      </Form>
    </Dialog>
  );
};

function NoticeComponent() {
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

  const lookDetails = ({ title, content }) => {
    Modal.info({
      title: title,
      content: <div style={{ paddingRight: "8px", maxHeight: "600px", overflowY: "auto" }}>{content}</div>,
      width: 800,
      okText: "关闭",
    });
  };

  const columns = [
    { title: "类型", dataIndex: "typeName", key: "typeName" },
    { title: "标题", dataIndex: "title", key: "title" },
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
              await http.get(`/notice/update/status?id=${record.noticeId}`);
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

          <Button
            type="link"
            icon={<BellOutlined />}
            onClick={() => {
              navigate("/system/notice/push", { state: { id: record.key } });
            }}
          >
            推送
          </Button>

          <Popconfirm
            title="是否删除该信息"
            placement="bottom"
            onConfirm={() => onDelete(record.noticeId)}
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
      const res = await http.post("/notice/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.noticeId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const getData = async () => {
    const res = await http.post("/notice/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.noticeId));
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
    const res = await http.post("/notice/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.noticeId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  const handlerReset = () => {
    form.resetFields();
    setPagination({ pageNum: 1, pageSize: pagination.pageSize, totalPages: 0 });
    getData();
  };

  const onDelete = async (id) => {
    await http.post(`notice/delete?id=${id}`, {});
    getData();
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", selectedRowKeys);
    await http.post("notice/deleteBatch", formData);
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
          <Form.Item name="title" label="标题">
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

export default NoticeComponent;
