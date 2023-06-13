import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/sign-up.scss";
import { Form, Input, Radio, Button, Skeleton, Empty, Spin } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { debounce, http, customObserver, crypto } from "@/utils";
import LayoutImage from "@/components/LayoutImageComponent";
import dayjs from "dayjs";

const SourceDataComponent = ({ data: values }) => {
  const navigate = useNavigate();

  if (values === null || values.length === 0) {
    return <Empty />;
  }
  const formDate = (date) => dayjs(date).locale("zh-cn").format("YYYY-MM-DD");

  return values.map((item) => (
    <div className="card_item" key={item.key} onClick={() => navigate(`/project/${crypto.encrypt(item.key)}`)}>
      {item.cover ? (
        <LayoutImage src={process.env.REACT_APP_APIURL + item.cover} preview={false} alt="error" />
      ) : (
        <div className="empty_card">{item.categoryName}</div>
      )}
      <div className="info">
        <div className="title">{item.projectName}</div>
        <div className="other_info">{formDate(item.createTime)}</div>
      </div>
    </div>
  ));
};

const ApplyComponent = () => {
  const [sourceData, setSourceData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [condition, setCondition] = useState({});
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 20, totalPages: 0 });

  // 获取分类列表
  useEffect(() => {
    (async () => {
      const res = await http.get("/web/category").catch(() => setLoading(false));
      res.map((item) => (item.key = item.categoryId));
      setCategoryData(res);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        ...condition,
      };
      const res = await http.post("/web/project", data).catch(() => setLoading(false));
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.projectId));
      setPagination({ pageNum, pageSize, totalPages });
      setLoadingMore(pageNum * pageSize < totalPages);
      setSourceData((item) => [...item, ...res.content]);
      setLoading(false);
    })();
  }, [condition, pagination.pageNum, pagination.pageSize]);

  // 加载更多
  useEffect(() => {
    if (loading || !loadingMore) {
      return;
    }

    const observer = customObserver();
    observer.initObserver({
      frist: false,
      threshold: 0.2,
      delay: 400,
      onEnter: () => {
        setPagination((item) => {
          return { ...item, pageNum: item.pageNum + 1 };
        });
      },
    });
    observer.addObserver(document.querySelector(".loadmore"));
  }, [loading, loadingMore]);

  // 筛选
  const getDate = async () => {
    setLoadingMore(false);
    setSourceData([]);
    const data = { ...condition, ...pagination, pageNum: 1 };
    const res = await http.post("/web/project", data);
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.projectId));
    setPagination({ pageNum, pageSize, totalPages });
    setLoadingMore(pageNum * pageSize < totalPages);
    setSourceData(res.content);
  };

  const onValuesChange = async (values) => {
    await setCondition((item) => {
      const [key, value] = Object.entries(values)[0];
      item[key] = value;
      return item;
    });
    getDate();
  };

  const onSearch = debounce(async ({ target: { value: projectName } }) => {
    await setCondition((item) => {
      item.projectName = projectName;
      return item;
    });
    getDate();
  }, 400);

  return (
    <div className="sign-up_card">
      {/* <Carousel>
        <Image
          src="https://www.100trust.cn/repository/image/74fd66a7-e34d-44af-a14f-0240fa002980.jpg"
          preview={false}
        />
      </Carousel> */}
      <div className="sign-up_main_card">
        <Skeleton active loading={loading}>
          <div className={`options_card${collapse ? "" : " options_collapse"}`}>
            <div className="search_card">
              <Input addonBefore={<SearchOutlined />} onChange={onSearch} />
            </div>
            <div className="condition_card">
              <Form autoComplete="off" onValuesChange={onValuesChange}>
                <Form.Item label="分类" name="categoryId">
                  <Radio.Group>
                    <Radio.Button value={undefined}>全部</Radio.Button>
                    {categoryData.map((item) => (
                      <Radio.Button value={item.key} key={item.key}>
                        {item.categoryName}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="状态" name="statusTime">
                  <Radio.Group>
                    <Radio.Button value={undefined}>全部</Radio.Button>
                    <Radio.Button value={"未开始"}>未开始</Radio.Button>
                    <Radio.Button value={"进行中"}>进行中</Radio.Button>
                    <Radio.Button value={"已结束"}>已结束</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </div>
            <div className="collapse_btn">
              <Button type="link" icon={<DownOutlined />} onClick={() => setCollapse(!collapse)} />
            </div>
          </div>

          <div className="content_card">
            <SourceDataComponent data={sourceData} />
            {loadingMore && (
              <div className="loadmore">
                <Spin tip="加载中" spinning={loadingMore} />
              </div>
            )}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default ApplyComponent;
