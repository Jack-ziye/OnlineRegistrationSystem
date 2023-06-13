import { useEffect } from "react";
import { http } from "@/utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tag, Table, Statistic, Button, Result, Transfer, Space, Tooltip } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  BulbOutlined,
  EditOutlined,
  CloseOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import Dialog from "@/components/DialogComponent";
import CountUp from "react-countup";
import { download } from "@/utils";

const ExportDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);

  const dataSource = [
    { title: "ID", dataIndex: "applyId", key: "applyId" },
    { title: "栏目名称", dataIndex: "categoryName", key: "categoryName" },
    { title: "项目名称", dataIndex: "projectName", key: "projectName" },
    { title: "人才名称", dataIndex: "talentName", key: "talentName" },
    { title: "报名时间", dataIndex: "createTime", key: "createTime" },
    { title: "反馈信息", dataIndex: "feedback", key: "feedback" },
    { title: "报名状态", dataIndex: "statusName", key: "statusName" },
  ];

  const handleOk = async () => {
    if (!targetKeys.length) {
      return;
    }
    const res = await http.post("/apply/export", { props: targetKeys });
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
      <Tooltip placement="bottom" title="导出报名信息">
        <Button
          icon={<DownloadOutlined />}
          type="link"
          size="large"
          style={{ color: "#E6A23C" }}
          onClick={() => setIsModalOpen(true)}
        ></Button>
      </Tooltip>

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

const ProjectDetailsComponent = () => {
  const [model, setModel] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.id) {
      (async () => {
        const res = await http.get(`/project/details?id=${state.id}`);
        res.talentList.map((item) => (item.key = item.talentId));
        setModel(res);
      })();
    }
  }, [state]);

  const formatter = (value) => <CountUp end={value} separator="," />;

  const diffTimeRender = (diffTime) => {
    if (!diffTime) {
      return <Tag>已结束</Tag>;
    } else {
      return (
        <Statistic.Countdown
          title={diffTime < 0 ? "开始倒计时" : "结束倒计时"}
          valueStyle={{ fontSize: "14px", marginRight: "4px" }}
          value={new Date().getTime() + Math.abs(diffTime) * 1000}
          format={`D天 HH:mm:ss`}
        />
      );
    }
  };

  const columns = [
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

  const talentColums = [
    { title: "人才名称", dataIndex: "talentName", key: "talentName" },
    { title: "手机号", dataIndex: "mobile", key: "mobile" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "报名时间", dataIndex: "applyTime", key: "applyTime" },
    { title: "报名状态", dataIndex: "applyStatusName", key: "applyStatusName" },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => navigate("/pf/talent/details", { state: { id: record.talentId } })}
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

  return (
    <div className="datails_wapper">
      <Button className="closed_btn" type="text" icon={<CloseOutlined />} onClick={() => navigate(-1)} />
      <div className="header_card"></div>
      <div className="datails_card">
        <div className="title_card">
          <span style={{ marginRight: "8px" }}>{model.projectName}</span>

          <Space>
            <Button
              type="link"
              size="large"
              icon={<EditOutlined />}
              onClick={() => navigate("/pf/project/editor", { state: { ...state } })}
            ></Button>
            <ExportDialog />
          </Space>
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
          <AppstoreOutlined />
          <Statistic title="栏目" value={model.categoryName} />
        </div>
        <div className="chart_item">
          <UserOutlined />
          <Statistic
            title="名额"
            value={model.quota <= 0 ? "无限制" : model.quota}
            formatter={model.quota > 0 && formatter}
          />
        </div>
        <div className="chart_item">
          <UserAddOutlined />
          <Statistic
            title="人数"
            value={model.talentList && model.talentList.length}
            formatter={formatter}
            suffix={model.quota && model.quota !== -1 && `/ ${model.quota}`}
          />
        </div>
        <div className="chart_item">
          <ClockCircleOutlined />
          {diffTimeRender(model.diffTime)}
        </div>
        <div className="chart_item">
          <BulbOutlined />
          <Statistic title="状态" value={model.statusName} />
        </div>
      </div>
      <div className="datails_content" dangerouslySetInnerHTML={{ __html: model.content }}></div>
      <Table columns={talentColums} pagination={{ hideOnSinglePage: true }} dataSource={model.talentList} />
      <div className="fill_card"></div>
    </div>
  );
};

export default ProjectDetailsComponent;
