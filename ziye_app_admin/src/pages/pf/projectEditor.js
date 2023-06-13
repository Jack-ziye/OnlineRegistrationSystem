import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Radio, Select, DatePicker } from "antd";
import Dialog from "@/components/DialogComponent";
import TinymceComponent from "@/components/TinymceComponent";
import CropperComponent from "@/components/CropperComponent";
import rules from "@/config/rules";
import { http } from "@/utils";
import dayjs from "dayjs";

const AddDialog = ({ isModalOpen, setIsModalOpen, model, callBack }) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!isModalOpen) return;
    model.startTime = dayjs(model.startTime);
    model.endTime = dayjs(model.endTime);
    model.projectId && form.setFieldsValue({ ...model });
    (async () => {
      const { content: categoryList } = await http.post("/category/list", {});
      setOptions(categoryList);
    })();
  }, [form, model, isModalOpen]);

  const handleOk = () => {
    const formatDate = (value) => dayjs(value).locale("zh-cn").format("YYYY-MM-DD HH:mm:ss");

    form.validateFields().then(async (values) => {
      values.content = model.content;
      values.startTime = formatDate(values.startTime);
      values.endTime = formatDate(values.endTime);

      if (values.cover instanceof File) {
        // 上传封面 > 获取地址
        let formData = new FormData();
        formData.append("file", values.cover);
        values.cover = await http.post("/file/upload", formData);
      }

      if (model.projectId) {
        values.projectId = model.projectId;
        await http.post("/project/update", values);
        callBack();
      } else {
        await http.post("/project/insert", values);
        callBack();
      }
    });
  };

  const handleCancel = async (e) => {
    e.target.innerText && form.resetFields();
    await setIsModalOpen(false);
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDate = (current) => {
    return current && current < new Date();
  };
  const disabledDateTime = () => {
    const now = new Date();
    return {
      disabledHours: () => range(0, now.getHours()),
      disabledMinutes: () => range(0, now.getMinutes()),
    };
  };

  return (
    <Dialog
      getContainer={false}
      title={model.projectId ? "修改信息" : "添加信息"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={{ status: 0, orderIndex: 0 }}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        preserve={false}
      >
        <Form.Item className="cropper_item" name="cover">
          <CropperComponent />
        </Form.Item>
        <Form.Item name="categoryId" label="项目名称" rules={rules.categoryId}>
          <Select options={options} fieldNames={{ label: "categoryName", value: "categoryId" }} />
        </Form.Item>
        <Form.Item name="projectName" label="项目名称" rules={rules.projectName}>
          <Input allowClear maxLength="20" />
        </Form.Item>
        <Form.Item name="startTime" label="开始日期" rules={rules.startTime}>
          <DatePicker disabledDate={disabledDate} disabledTime={disabledDateTime} showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item name="endTime" label="结束日期" rules={rules.endTime}>
          <DatePicker disabledDate={disabledDate} showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={rules.status}>
          <Radio.Group>
            <Radio value={0}>正常</Radio>
            <Radio value={1}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Dialog>
  );
};

function ProjectEditorComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.id) {
      (async () => {
        const res = await http.get(`/project/info?id=${state.id}`);
        setModel(res);
      })();
    }
  }, [state]);

  return (
    <>
      <AddDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        model={model}
        setModel={setModel}
        callBack={() => navigate(-1)}
      />
      <TinymceComponent
        initValue={model.content && model.content}
        onClick={(value) => {
          setIsModalOpen(true);
          setModel(state && state.id ? { ...model, content: value } : { content: value });
        }}
      />
    </>
  );
}

export default ProjectEditorComponent;
