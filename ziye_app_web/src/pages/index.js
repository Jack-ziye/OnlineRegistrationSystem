import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "@/styles/index.scss";
import animation from "@/utils/animation";
import "@/styles/animation.scss";
import LayoutImage from "@/components/LayoutImageComponent";
import { http, crypto } from "@/utils";
import { useNavigate } from "react-router-dom";

const IndexComponent = () => {
  const [newsData, setNewsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    animation({
      target: [...document.querySelectorAll(".content"), ...document.querySelectorAll(".animation_card")],
      onEnter: ({ target }, animationName) => {
        const { className } = target;
        target.className = `${className} ${animationName}`;
      },
      onLeave: ({ target }, animationName) => {
        const { className } = target;
        target.className = className.replace(` ${animationName}`, "");
      },
    });
    // 平滑滚动
    animation({
      target: [...document.querySelectorAll(".page_item")],
      threshold: 0.05,
      onEnter: ({ target }) => {
        window.location.href = `#${target.id}`;
      },
    });
  }, []);

  useEffect(() => {
    (async () => {
      const res = await http.post("/web/news/list", { pageNum: 1, pageSize: 4 });
      res.content.map((item) => (item.key = item.newsId));
      setNewsData(res.content);

      const project = await http.post("/web/project", { pageNum: 1, pageSize: 4 });
      project.content.map((item) => (item.key = item.projectId));
      setProjectData(project.content);
    })();
  }, []);

  return (
    <div className="index_wapper">
      <div className="page_card">
        <div className="page_item page1" id="page1">
          <div className="content" z-type="fade-up">
            叶子起点 网上报名
          </div>
        </div>
        <div className="page_item page2" id="page2">
          <div className="animation_card left_card" z-type="fade-right">
            <div className="title">新闻动态</div>
            <div className="info">关注新闻动态，了解最新新闻资讯</div>
            <Button type="primary" href="/news">
              了解更多
            </Button>
          </div>
          <div className="animation_card right_card" z-type="fade-left">
            {newsData.map((item) => (
              <div
                className="news_item_card"
                key={item.key}
                onClick={() => navigate(`/news/details/${crypto.encrypt(item.key)}`)}
              >
                <div className="image_card">
                  <LayoutImage src={process.env.REACT_APP_APIURL + item.cover} preview={false} />
                </div>
                <div className="info_card">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="page_item page3" id="page3">
          <div className="animation_card left_card" z-type="fade-down">
            <div className="title">报名动态</div>
            <div className="info">关注报名动态，了解最新项目报名活动</div>
            <Button type="primary" href="/sign-up">
              了解更多
            </Button>
          </div>
          <div className="animation_card right_card" z-type="fade-up">
            {projectData.map((item) => (
              <div
                className="news_item_card"
                key={item.key}
                onClick={() => navigate(`/project/${crypto.encrypt(item.key)}`)}
              >
                <div className="image_card">
                  <LayoutImage src={process.env.REACT_APP_APIURL + item.cover} preview={false} />
                </div>
                <div className="info_card">{item.projectName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexComponent;
