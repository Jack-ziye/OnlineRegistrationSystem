import { useEffect } from "react";
import { http } from "@/utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tag, Table, Statistic, QRCode, Popover, Button, Result } from "antd";
import {
  QrcodeOutlined,
  UserAddOutlined,
  PhoneOutlined,
  BulbOutlined,
  EditOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import { crypto } from "@/utils";

const TalentDetailsComponent = () => {
  const [model, setModel] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.id) {
      (async () => {
        const res = await http.get(`/talent/details?id=${state.id}`);
        res.projectList.map((item) => (item.key = item.projectId));
        setModel(res);
      })();
    }
  }, [state]);

  const formatter = (value) => <CountUp end={value} separator="," />;

  const columns = [
    { label: "邮箱地址", prop: "email", key: "email" },
    { label: "注册时间", prop: "createTime", key: "createTime" },
    {
      label: "项目状态",
      prop: "statusName",
      key: "statusName",
      option: (value, model) => {
        return <Tag color={!model.status ? "#87d068" : "#f50"}>{value}</Tag>;
      },
    },
  ];

  const projectColums = [
    { title: "考试报名", dataIndex: "categoryName", key: "categoryName" },
    { title: "标题", dataIndex: "projectName", key: "projectName" },
    { title: "开始时间", dataIndex: "startTime", key: "startTime" },
    { title: "截至时间", dataIndex: "endTime", key: "endTime" },
    { title: "状态", dataIndex: "statusName", key: "statusName" },
    { title: "报名时间", dataIndex: "applyTime", key: "applyTime" },
    { title: "报名状态", dataIndex: "applyStatusName", key: "applyStatusName" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => navigate("/pf/project/details", { state: { id: record.projectId } })}
        >
          查看
        </Button>
      ),
    },
  ];

  const optionCard = (item, model) => {
    if (item.option) {
      return item.option(model[item.prop], model);
    } else {
      return model[item.prop];
    }
  };

  if (!model.talentName) {
    return (
      <Result
        status="404"
        title="信息不存在"
        subTitle="对不起，您访问的人才信息不存在。"
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            返回
          </Button>
        }
      />
    );
  }

  return (
    <div className="datails_wapper">
      <Button className="closed_btn" type="text" icon={<CloseOutlined />} onClick={() => navigate(-1)} />
      <div className="header_card"></div>
      <div className="datails_card">
        <div className="title_card">
          <span style={{ marginRight: "8px" }}>{model.talentName}</span>
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<QRCode errorLevel="H" value={crypto.encrypt(`${model.talentId}`)} bordered={false} />}
          >
            <QrcodeOutlined style={{ marginRight: "8px", color: "#409EFF" }} />
          </Popover>
          <Button
            type="link"
            size="large"
            icon={<EditOutlined />}
            onClick={() => navigate("/pf/talent/editor", { state: { ...state } })}
          ></Button>
        </div>
        <div className="datails_info">
          {columns.map((item) => (
            <div className="info_item" key={item.key}>
              <div className="label">{item.label}:</div>
              <div className="value">{optionCard(item, model)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="chart_card">
        <div className="chart_item">
          <PhoneOutlined />
          <Statistic title="联系方式" value={model.mobile.replace(/(?=(\d{4})+$)/g, " ")} />
        </div>
        <div className="chart_item">
          <UserAddOutlined />
          <Statistic
            title="项目数"
            value={model.projectList && model.projectList.length}
            formatter={formatter}
            suffix={model.quota && model.quota !== -1 && `/ ${model.quota}`}
          />
        </div>
        <div className="chart_item">
          <BulbOutlined />
          <Statistic title="状态" value={model.statusName} />
        </div>
      </div>
      <Table columns={projectColums} pagination={{ hideOnSinglePage: true }} dataSource={model.projectList} />
      <div className="fill_card"></div>
    </div>
  );
};

export default TalentDetailsComponent;
