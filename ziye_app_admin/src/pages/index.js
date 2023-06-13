import "@/styles/index.scss";
import { Button, Space, Divider, Statistic } from "antd";
import { HomeOutlined, GithubOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { http } from "@/utils";
import { echartCard, echartCard2 } from "@/config/echart";

const HeaderCard = () => {
  return (
    <div className="header_card">
      <div className="left_card">
        <div className="left_title">
          <div className="title">叶子起点</div>
          <div className="subtitle">网上报名后台管理系统</div>
        </div>
        <Space className="other">
          <Button type="primary" icon={<HomeOutlined />} ghost href="http://www.aiziye.cn" target="_blank">
            官网
          </Button>
          <Button icon={<GithubOutlined />} href="https://github.com/Jack-ziye" target="_blank">
            Github
          </Button>
        </Space>
      </div>
      <div className="rigth_card">
        <div className="title">技术选型</div>
        <div className="rigth_info_card">
          <div className="item_card">
            <div className="item_title">前端技术</div>
            <div className="item_content">React</div>
            <div className="item_content">React-router-dom</div>
            <div className="item_content">Mobx</div>
            <div className="item_content">Axios</div>
            <div className="item_content">Antd</div>
            <div className="item_content">Sass</div>
            <div className="item_content">...</div>
          </div>
          <div className="item_card">
            <div className="item_title">后端技术</div>
            <div className="item_content">SpringBoot</div>
            <div className="item_content">Shiro</div>
            <div className="item_content">JWT</div>
            <div className="item_content">MyBatis</div>
            <div className="item_content">Fastjson</div>
            <div className="item_content">EasyExcel</div>
            <div className="item_content">...</div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

const getDay = (day) => {
  const today = new Date();
  const targetDay = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetDay);
  return today.getDate();
};

const OverviewCard = () => {
  const formatter = (value) => <CountUp end={value} separator="," />;

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const res = await http.get("/index/data");
      res.recentlyApply = res.recentlyApply.split(",").map((item) => +item);

      setData(res);

      echartCard({
        target: document.querySelector(".passCard"),
        title: { text: "审批", left: "center" },
        data: [
          { name: "未审核", value: res.unaudited },
          { name: "通过", value: res.applyPass },
          { name: "未通过", value: res.applyNotPass },
        ],
      });

      echartCard2({
        target: document.querySelector(".passCard2"),
        title: { text: "近7日提交数", left: "center" },
        xData: Array.from({ length: 7 }, (_, i) => getDay(i - 7)),
        series: { data: res.recentlyApply, type: "line" },
      });
    })();
  }, []);

  const headerModel = [
    { label: "项目总数", prop: "projectTotal" },
    { label: "人才总数", prop: "talentTotal" },
    { label: "总申请数", prop: "applyTotal" },
    { label: "今日提交", prop: "todayApplyTotal" },
  ];

  return (
    <div className="overview_card">
      <div className="title">概览</div>
      <div className="body_card">
        <div className="header_card">
          {headerModel.map((item) => (
            <div className="item_card" key={item.prop}>
              <div className="label">{item.label}</div>
              <div className="value">
                <Statistic value={data[item.prop]} formatter={formatter} />
              </div>
            </div>
          ))}
        </div>

        <div className="chart_card">
          <div className="chart_item passCard2"></div>
          <div className="chart_item passCard"></div>
        </div>
      </div>
    </div>
  );
};

function Index() {
  return (
    <div className="index-wrapper">
      <HeaderCard />
      <OverviewCard />
    </div>
  );
}

export default Index;
