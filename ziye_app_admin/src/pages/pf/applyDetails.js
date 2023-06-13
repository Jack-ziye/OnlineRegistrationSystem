import { useEffect } from "react";
import { http } from "@/utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tag, Button, Result, Space, Modal, Input, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import rules from "@/config/rules";

const ProjectDetailsComponent = () => {
  const [model, setModel] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (state && state.id) {
      (async () => {
        const res = await http.get(`/apply/details?id=${state.id}`);
        setModel(res);
      })();
    }
  }, [state]);

  const projectColumns = [
    { label: "栏目名称", prop: "categoryName", key: "categoryName" },
    { label: "创建用户", prop: "username", key: "username" },
    { label: "创建时间", prop: "createTime", key: "createTime" },
    { label: "开始时间", prop: "startTime", key: "startTime" },
    { label: "截至时间", prop: "endTime", key: "endTime" },
    {
      label: "项目状态",
      prop: "statusName",
      key: "statusName",
      option: (value, model) => {
        return <Tag color={!model.status ? "#87d068" : "#f50"}>{value}</Tag>;
      },
    },
  ];

  const talentColumns = [
    { label: "联系方式", prop: "mobile", key: "mobile" },
    { label: "邮箱地址", prop: "email", key: "email" },
  ];

  const optionCard = (item, model) => {
    if (item.option) {
      return item.option(model[item.prop], model);
    } else {
      return model[item.prop];
    }
  };

  if (!model.projectName) {
    return (
      <Result
        status="404"
        title="信息不存在"
        subTitle="对不起，您访问的项目信息不存在。"
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            返回
          </Button>
        }
      />
    );
  }

  const handleFailAudit = () => {
    Modal.confirm({
      title: "请输入反馈信息",
      content: (
        <Form form={form} autoComplete="off">
          <Form.Item name="feedback" rules={rules.feedback}>
            <Input allowClear maxLength="20" />
          </Form.Item>
        </Form>
      ),
      onOk: () =>
        form.validateFields().then(async ({ feedback }) => {
          await http.post("/apply/update/failAudit", { applyId: model.applyId, feedback });
          navigate(-1);
        }),
    });
  };

  const handleAudit = async (flag) => {
    await http.get(`/apply/update/audit?id=${model.applyId}`);
    navigate(-1);
  };

  return (
    <div className="datails_wapper">
      <Button className="closed_btn" type="text" icon={<CloseOutlined />} onClick={() => navigate(-1)} />
      <div className="header_card"></div>

      <div className="datails_card">
        <div className="title_card">
          <span style={{ marginRight: "8px" }}>{model.projectName}</span>
        </div>
        <div className="datails_info">
          {projectColumns.map((item) => (
            <div className="info_item" key={item.key}>
              <div className="label">{item.label}:</div>
              <div className="value">{optionCard(item, model.project)}</div>
            </div>
          ))}
        </div>
      </div>
      {/* ------------------------------------ */}
      <div className="datails_card">
        <div className="title_card">
          <span style={{ marginRight: "8px" }}>{model.talentName}</span>
        </div>
        <div className="datails_info">
          {talentColumns.map((item) => (
            <div className="info_item" key={item.key}>
              <div className="label">{item.label}:</div>
              <div className="value">{optionCard(item, model.talent)}</div>
            </div>
          ))}
          <div className="info_item">
            <div className="label">报名时间</div>
            <div className="value">{model.createTime}</div>
          </div>
        </div>
      </div>
      {/* ------------------------------------ */}

      <div className="datails_content" dangerouslySetInnerHTML={{ __html: model.project.content }}></div>
      <div style={{ textAlign: "center" }}>
        <Space>
          <Button onClick={() => handleFailAudit()} danger>
            不通过
          </Button>
          <Button type="primary" onClick={handleAudit}>
            通过
          </Button>
        </Space>
      </div>
      <div className="fill_card"></div>
    </div>
  );
};

export default ProjectDetailsComponent;
