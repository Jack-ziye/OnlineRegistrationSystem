import React, { useState, useEffect } from "react";
import "@/styles/news.scss";
import { Skeleton, Pagination, Input, Empty } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { http, debounce, crypto } from "@/utils";
import { useNavigate } from "react-router-dom";
import LayoutImage from "@/components/LayoutImageComponent";

const CardComponent = ({ values = [] }) => {
  const navigate = useNavigate();
  if (!values.length) {
    return (
      <div style={{ padding: "40px 0px" }}>
        <Empty />
      </div>
    );
  }

  return (
    <div className="grid_body_card">
      {values.map((item) => (
        <div
          className="body_item_card"
          key={item.key}
          onClick={() => navigate(`/news/details/${crypto.encrypt(item.key)}`)}
        >
          <div className="image_card">
            <LayoutImage src={process.env.REACT_APP_APIURL + item.cover} preview={false} />
          </div>
          <div className="item_main_card">
            <div className="title_card">{item?.title}</div>
            <div className="content_card">{item?.subtitle}</div>
            <div className="info_card">
              <span>{item?.createTime.split(" ")[0]}</span>
              <EyeOutlined />
              <span>{item?.reads}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const NewsComponent = () => {
  const [sourceData, setSourceData] = useState([]);
  const [condition, setCondition] = useState({});
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 20,
    totalPages: 0,
  });

  useEffect(() => {
    (async () => {
      const data = {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        ...condition,
      };
      const res = await http.post("/web/news/list", data).finally(() => {
        setTimeout(() => setLoading(false), 400);
      });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.newsId));
      setPagination({ pageNum, pageSize, totalPages });
      setSourceData(res.content);
    })();
  }, [pagination.pageNum, pagination.pageSize, condition]);

  const onSearch = debounce(async ({ target: { value: title } }) => {
    setCondition({ title });
  }, 400);

  return (
    <div className="news_wrapper">
      <Skeleton loading={loading} active>
        <div style={{ padding: "16px 0px" }}>
          <Input addonBefore={<SearchOutlined />} onChange={onSearch} />
        </div>
        <div className="news_body_card">
          <CardComponent values={sourceData} />
        </div>
        <div className="pagination_card">
          <Pagination
            hideOnSinglePage
            total={pagination.totalPages}
            pageSize={pagination.pageSize}
            onChange={(pageNum, pageSize) => setPagination({ pageNum, pageSize })}
          />
        </div>
      </Skeleton>
    </div>
  );
};

export default NewsComponent;
