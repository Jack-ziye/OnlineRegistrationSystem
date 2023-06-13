import { useEffect } from "react";
import { http } from "@/utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tag, QRCode, Popover, Button, Result } from "antd";
import { QrcodeOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { crypto } from "@/utils";

const NewsDetailsComponent = () => {
  const [model, setModel] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.id) {
      (async () => {
        const res = await http.get(`/news/info?id=${state.id}`);
        setModel(res);
      })();
    }
  }, [state]);

  const columns = [
    { label: "新闻标题", prop: "title", key: "title" },
    { label: "创建时间", prop: "createTime", key: "createTime" },
    {
      label: "新闻状态",
      prop: "statusName",
      key: "statusName",
      option: (value, model) => {
        return <Tag color={!model.status ? "#87d068" : "#C0C4CC"}>{value}</Tag>;
      },
    },
  ];

  const optionCard = (item, model) => {
    if (item.option) {
      return item.option(model[item.prop], model);
    } else {
      return model[item.prop];
    }
  };

  if (!model.title) {
    return (
      <Result
        status="404"
        title="信息不存在"
        subTitle="对不起，您访问的新闻信息不存在。"
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
          <span style={{ marginRight: "8px" }}>{model.title}</span>
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<QRCode errorLevel="H" value={crypto.encrypt(`${model.newsId}`)} bordered={false} />}
          >
            <QrcodeOutlined style={{ marginRight: "8px", color: "#409EFF" }} />
          </Popover>
          <Button
            type="link"
            size="large"
            icon={<EditOutlined />}
            onClick={() => navigate("/pf/news/editor", { state: { ...state } })}
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
      <div className="datails_content" dangerouslySetInnerHTML={{ __html: model.content }}></div>
      <div className="fill_card"></div>
    </div>
  );
};

export default NewsDetailsComponent;
