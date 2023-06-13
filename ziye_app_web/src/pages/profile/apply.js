import React, { useState, useEffect } from "react";
import "@/styles/profile/apply.scss";
import { Tag, Button, Skeleton, Pagination, Input, Empty } from "antd";
import { RightOutlined, SearchOutlined } from "@ant-design/icons";
import { http, debounce } from "@/utils";
import { useNavigate } from "react-router-dom";

const ApplyCard = ({ data = [], onClick = () => {} }) => {
  return (
    <div className="card">
      {data.map((item) => (
        <div className="item_card" key={item.key} onClick={() => onClick({ id: item.key })}>
          <div className="item_name">{item.projectName}</div>
          <div className="item_info">
            <div className="info_status">
              <Tag color="">{item.categoryName}</Tag>
              <Tag color="magenta">{item.statusName}</Tag>
            </div>
            <div className="info_date">{item.createTime}</div>
          </div>
          <div className="option">
            <Button type="link" icon={<RightOutlined />}></Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const ApplyComponent = () => {
  const [applyData, setApplyData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
  });

  useEffect(() => {
    (async () => {
      const values = { pageNum: pagination.pageNum, pageSize: pagination.pageSize };
      const res = await http.post("/talent/current/apply/list", values).finally(() => {
        setTimeout(() => setLoading(false), 400);
      });
      const { content, pageNum, pageSize, totalPages } = res;
      content.map((item) => (item.key = item.applyId));
      setPagination({ pageNum, pageSize, totalPages });
      setApplyData(content);
    })();
  }, [pagination.pageNum, pagination.pageSize]);

  const onSearch = debounce(async ({ target: { value: projectName } }) => {
    const values = { pageNum: pagination.pageNum, pageSize: pagination.pageSize, projectName };
    const res = await http.post("/talent/current/apply/list", values);
    const { content, pageNum, pageSize, totalPages } = res;
    content.map((item) => (item.key = item.applyId));
    setPagination({ pageNum, pageSize, totalPages });
    setApplyData(content);
  }, 400);

  return (
    <div className="apply_wrapper">
      <Skeleton active loading={loading}>
        <div style={{ paddingBottom: "16px" }}>
          <Input addonBefore={<SearchOutlined />} onChange={onSearch} />
        </div>

        {!!applyData.length ? (
          <>
            <ApplyCard data={applyData} onClick={({ id }) => navigate(`/profile/apply/details/${id}`)} />
            <div className="pagination_card">
              <Pagination
                hideOnSinglePage
                defaultCurrent={pagination.pageNum}
                pageSize={pagination.pageSize}
                total={pagination.totalPages}
                onChange={(page, pageSize) => {
                  setPagination({ pageNum: page, pageSize: pageSize, totalPages: 0 });
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ padding: "20vh 0px" }}>
            <Empty />
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default ApplyComponent;
