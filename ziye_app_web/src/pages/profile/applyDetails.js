import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@/styles/profile/applyDetails.scss";
import { Skeleton, Button, Descriptions, Watermark, Tooltip, Space } from "antd";
import { PrinterOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { http } from "@/utils";
import dayjs from "dayjs";

const ApplyDetailsComponent = () => {
  const [applyDate, setApplyData] = useState({});
  const [project, setProject] = useState({});
  const [talent, setTalent] = useState({});
  const [loading, setLoading] = useState(true);
  const { id: applyId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await http.get(`/talent/current/apply/details?id=${applyId}`).finally(() => {
        setTimeout(() => setLoading(false), 400);
      });
      setApplyData(res);
      setProject(res.project);
      setTalent(res.talent);
    })();
  }, [applyId]);

  const formDate = (date) => dayjs(date).locale("zh-cn").format("YYYY-MM-DD");

  const printDom = () => {
    const dom = document.querySelector(".print_card");
    console.log(dom.style.display);
    dom.style.display = "block";
    // 全局打印
    window.print();
    // 还原页面内容
    dom.style.display = "";
  };

  return (
    <div className="apply_details_wrapper">
      {/* 用于打印页面时, 遮罩 */}
      <div className="print_card"></div>

      <Skeleton active loading={loading}>
        <Watermark content="叶子起点">
          <div className="table_card">
            <div className="table_name">{`${project.categoryName}表`}</div>
            <Descriptions bordered>
              <Descriptions.Item label="姓名">{talent.talentName}</Descriptions.Item>
              <Descriptions.Item label="性别">{talent.genderName}</Descriptions.Item>
              <Descriptions.Item label="出生日期">{talent.birthTime}</Descriptions.Item>
              <Descriptions.Item label="年龄">22</Descriptions.Item>
              <Descriptions.Item label="手机号">{talent.mobile}</Descriptions.Item>
              <Descriptions.Item label="邮箱地址">2296543112@qq.com</Descriptions.Item>
              <Descriptions.Item label="微信号">ziye_1011</Descriptions.Item>
              <Descriptions.Item label="籍贯">{talent.nativePlace}</Descriptions.Item>
              <Descriptions.Item label="住址" span={3}>
                {talent.address}
              </Descriptions.Item>

              <Descriptions.Item label="项目名称" span={3}>
                {project.projectName}
              </Descriptions.Item>
              <Descriptions.Item label="报名费用">{project.expense}元</Descriptions.Item>
              <Descriptions.Item label="开始时间">{formDate(project.createTime)}</Descriptions.Item>
              <Descriptions.Item label="截至时间">{formDate(project.endTime)}</Descriptions.Item>
              <Descriptions.Item label="项目状态">{project.statusInfo}</Descriptions.Item>

              <Descriptions.Item label="报名时间">{formDate(applyDate.createTime)}</Descriptions.Item>
              <Descriptions.Item label="报名状态">{applyDate.statusName}</Descriptions.Item>
            </Descriptions>
          </div>

          <div className="option_card">
            <Space>
              <Button type="primary" icon={<PrinterOutlined />} onClick={printDom}>
                <span>打印</span>
              </Button>
              <Tooltip title="建议选择横向打印" trigger={["hover", "click"]}>
                <QuestionCircleOutlined />
              </Tooltip>
            </Space>
          </div>
        </Watermark>
      </Skeleton>
    </div>
  );
};

export default ApplyDetailsComponent;
