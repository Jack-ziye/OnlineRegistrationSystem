import { useState } from "react";
import { Button, Form, Input, Table, DatePicker } from "antd";
import { SearchOutlined, SyncOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { http } from "@/utils";
import { useNavigate } from "react-router-dom";

function ApplyComponent() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const columns = [
    { title: "项目名称", dataIndex: "projectName", key: "projectName" },
    { title: "人才名称", dataIndex: "talentName", key: "talentName" },
    { title: "申请时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate("/pf/apply/details", { state: { id: record.key } })}
          >
            查看
          </Button>
        </>
      ),
    },
  ];
  const getData = async () => {
    const res = await http.post("apply/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.applyId));
    setPagination({ pageNum, pageSize, totalPages });
    setSourceData(content);
  };

  useEffect(() => {
    (async () => {
      const res = await http.post("apply/list", { pageNum: pagination.pageNum, pageSize: pagination.pageSize });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.applyId));
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
    const res = await http.post("/apply/list", { ...values, pageNum: 1, pageSize: pagination.pageSize });
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.applyId));
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
    onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
  };

  return (
    <div className="table_wapper">
      <div className="main_header">
        <Form layout="inline" form={form} className="screen_from" onFinish={handleFinish} autoComplete="off">
          <Form.Item name="projectName" label="项目名称">
            <Input allowClear maxLength="18" />
          </Form.Item>
          <Form.Item name="talentName" label="人才名称">
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

export default ApplyComponent;
