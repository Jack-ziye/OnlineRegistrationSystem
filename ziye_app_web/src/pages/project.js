import "@/styles/details.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { useStore } from "@/store";
import { crypto, http } from "@/utils";
import { observer } from "mobx-react-lite";
import { Skeleton } from "antd";

const ProjectComponent = () => {
  const [sourceData, setSourceData] = useState({});
  const [loading, setLoading] = useState(true);
  const { userStore } = useStore();
  const navigate = useNavigate();
  const [isApply, setIsApply] = useState(false);
  const projectId = crypto.decrypt(useParams().id);

  useEffect(() => {
    (async () => {
      const res = await http.get(`web/project/details?id=${projectId}`).catch(() => setLoading(false));
      setSourceData(res);

      if (userStore.userInfo.talentId) {
        const apply = await http.get(`/talent/current/apply/info?id=${projectId}`).catch(() => setLoading(false));
        if (apply.applyId) {
          setIsApply(true);
        }
      }
      setLoading(false);
    })();
  }, [projectId, userStore.userInfo]);

  const optionsCard = ({ diffTime, statusInfo }) => {
    if (isApply) {
      return <div>已报名</div>;
    }

    if (diffTime > 0) {
      return (
        <Button type="primary" onClick={() => navigate(`/apply/add/${crypto.encrypt(projectId)}`)}>
          报名
        </Button>
      );
    } else {
      return <div>{statusInfo}</div>;
    }
  };

  return (
    <div className="details_card">
      <Skeleton loading={loading} active>
        <div className="details">
          <div className="title">{sourceData?.projectName}</div>
          <div className="info">
            <span>{sourceData?.createTime}</span>
            <span>{sourceData?.statusInfo}</span>
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: sourceData?.content }}></div>
          <div className="declaration">
            声明：本文所有的信息均用于测试数据，如涉及版权问题，请作者致电与我们联系，我们将及时按作者意愿予以更正
          </div>
          <div className="options_card">
            {userStore.userInfo.talentId ? (
              optionsCard(sourceData)
            ) : (
              <Button type="link" onClick={() => navigate("/login")}>
                请先登录
              </Button>
            )}
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default observer(ProjectComponent);
