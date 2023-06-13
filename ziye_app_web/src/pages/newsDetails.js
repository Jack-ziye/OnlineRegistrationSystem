import "@/styles/details.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { crypto, http } from "@/utils";
import { observer } from "mobx-react-lite";
import { Skeleton } from "antd";

const ProjectComponent = () => {
  const [sourceData, setSourceData] = useState({});
  const [loading, setLoading] = useState(true);

  const newsId = crypto.decrypt(useParams().id);

  useEffect(() => {
    (async () => {
      const res = await http.get(`web/news/details?id=${newsId}`).finally(() => {
        setTimeout(() => setLoading(false), 400);
      });
      setSourceData(res);
    })();
  }, [newsId]);

  return (
    <div className="details_card">
      <Skeleton loading={loading} active>
        <div className="details">
          <div className="title">{sourceData?.title}</div>
          <div className="info">
            <span>{sourceData?.createTime}</span>
            <span>阅读数：{sourceData?.reads + 1}</span>
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: sourceData?.content }}></div>
        </div>
      </Skeleton>
    </div>
  );
};

export default observer(ProjectComponent);
