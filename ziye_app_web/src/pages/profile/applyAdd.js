import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Steps, Button, Input, Radio, Form, Statistic, Space, Tooltip, Result, Skeleton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import "@/styles/applyAdd.scss";
import dayjs from "dayjs";
import { crypto, http, debounce } from "@/utils";

const StepsComponent = (props) => {
  const items = props.items.map((item) => ({ ...item }));
  const current = props.current || 0;

  return (
    <div className="steps_card">
      <div className="steps_header">
        <Steps {...props} items={items} />
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>{props.children}</div>
      <div className="steps_body">{items[current].content}</div>
    </div>
  );
};

const ConfirmInfoPage = (props) => {
  const [form] = useForm();
  const [sourceDate, setSourceData] = useState({});
  const [changeProp, setChangeProp] = useState([]);
  const [sending, setSending] = useState(false);
  const projectId = crypto.decrypt(useParams().id);

  useEffect(() => {
    if (!projectId) return;
    (async () => {
      const project = await http.get(`web/project/details?id=${projectId}`);
      const res = await http.get("/talent/current");
      res.birthTime = dayjs(res.birthTime);
      setSourceData(res);
      form.setFieldsValue({ ...res, ...project });
    })();
  }, [form, projectId]);

  const isEquals = (obj1, obj2) => {
    for (const key in obj1) {
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        return false;
      }
    }
    return true;
  };

  const onValuesChange = debounce((arg) => {
    const prop = Object.keys(arg)[0];
    const status = isEquals(arg, sourceDate);
    if (status) {
      const list = changeProp.filter((item) => item !== prop);
      setChangeProp(list);
    } else {
      !changeProp.includes(prop) && setChangeProp([...changeProp, prop]);
    }
  }, 200);

  const TextComponent = ({ value, zeroText = null }) => {
    if (zeroText !== null && value === 0) {
      return <div style={{ width: "100%" }}>{zeroText}</div>;
    }

    return <div style={{ width: "100%" }}>{value}</div>;
  };

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      if (!!changeProp.length) {
        // 更新信息
        setSending(true);
        values.birthTime = dayjs(values.birthTime).locale("zh-cn").format("YYYY-MM-DD");
        await http.post("/talent/current/update", values).catch(() => setSending(false));
        setChangeProp([]);
        setSourceData(values);
        setSending(false);
        props.onChange && props.onChange(values);
        props.callBack && props.callBack(values);
      } else {
        setSourceData(values);
        props.onChange && props.onChange(values);
        props.callBack && props.callBack(values);
      }
    });
  };

  const onCancel = () => {
    setChangeProp([]);
    form.resetFields();
    form.setFieldsValue(sourceDate);
  };

  return (
    <div className="confirm_info_card">
      <Form form={form} layout="inline" onValuesChange={onValuesChange}>
        <Form.Item name="projectId" hidden>
          <TextComponent />
        </Form.Item>
        <Form.Item name="projectName" label="项目名称">
          <TextComponent />
        </Form.Item>
        {/* <Form.Item name="expense" label="报名费用">
          <TextComponent zeroText="免费" />
        </Form.Item> */}
        <Form.Item name="talentName" label="用户名称">
          <TextComponent />
        </Form.Item>
        <Form.Item name="gender" label="性别">
          <Radio.Group>
            <Radio value={0}>未知</Radio>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="mobile" label="手机号">
          <TextComponent />
        </Form.Item>
        <Form.Item name="wechat" label="微信号">
          <Input placeholder="请输入微信号" maxLength={20} />
        </Form.Item>
        <Form.Item name="email" label="邮箱地址">
          <Input placeholder="邮箱地址" />
        </Form.Item>
        <Form.Item name="nativePlace" label="籍贯">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="住址">
          <Input.TextArea width={"400px"} maxLength={100} autoSize />
        </Form.Item>

        <Form.Item className="submit_card">
          <Space>
            <Button onClick={onCancel} disabled={!changeProp.length}>
              取消
            </Button>
            <Button type="primary" onClick={onFinish} loading={sending}>
              {!!changeProp.length && "保存并"}提交
            </Button>
            <Tooltip title="数据变更后启用操作按钮" trigger={["hover", "click"]}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

const ApplyAddComponent = () => {
  const [projectDate, setProjectDate] = useState({});

  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const projectId = crypto.decrypt(useParams().id);

  const steps = [
    {
      title: "确认信息",
      content: (
        <ConfirmInfoPage
          callBack={async (values) => {
            // 提交申请
            await http.get(`/talent/current/apply/add?id=${values.projectId}`);
            setCurrent(current + 1);
          }}
        />
      ),
    },
    {
      title: "提交审核",
      content: (
        <Result
          status="success"
          title="报名已提交审核"
          subTitle="您可以点击查看进入个人中心查看报名申请详情，稍后也可以进入个人中心查看审核结果"
          extra={[
            <Button type="primary" key="back" onClick={() => navigate(-1)}>
              返回
            </Button>,
            <Button key="buy" onClick={() => navigate(`/profile/apply`)}>
              查看
            </Button>,
          ]}
        />
      ),
    },
  ];

  const DiffTimeRender = ({ diffTime }) => {
    if (diffTime === 0) {
      return <div>报名已结束</div>;
    } else if (diffTime > 0) {
      return (
        <Statistic.Countdown
          prefix="报名剩余时间"
          valueStyle={{ fontSize: "14px", marginRight: "4px" }}
          value={new Date().getTime() + diffTime * 1000}
          format={`D天 HH:mm:ss`}
        />
      );
    }
  };

  useEffect(() => {
    (async () => {
      const apply = await http.get(`/talent/current/apply/info?id=${projectId}`).finally(() => {
        setTimeout(() => setLoading(false), 200);
      });

      const proejct = await http.get(`/web/project/details?id=${projectId}`);
      setProjectDate(proejct);

      if (apply.applyId) {
        setCurrent(1);
      }
    })();
  }, [projectId]);

  return (
    <div className="apply_add_card">
      <Skeleton active loading={loading}>
        <StepsComponent items={steps} current={current}>
          <DiffTimeRender diffTime={projectDate.diffTime} />
        </StepsComponent>
      </Skeleton>
    </div>
  );
};

export default ApplyAddComponent;
