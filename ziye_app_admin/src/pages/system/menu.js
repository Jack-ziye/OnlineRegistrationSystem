import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, TreeSelect, Switch, Table, Radio, Popconfirm, Tag } from "antd";
import Dialog from "@/components/DialogComponent";
import { SearchOutlined, SyncOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as AntdIcon from "@ant-design/icons";
import rules from "@/config/rules";
import { http } from "@/utils";

const iconList = Object.entries(AntdIcon).filter((item) => item[0].includes("Outlined"));

const makeKey = (values) => {
  values.forEach((item) => {
    item.key = item.menuId;
    item.children && makeKey(item.children);
  });
};

const AddDialog = ({ menuData, isModalOpen, setIsModalOpen, model, setModel, callBack }) => {
  const [form] = Form.useForm();
  const [menuType, setMenuType] = useState(0);

  useEffect(() => {
    if (!Object.keys(model).length) {
      return;
    }
    form.setFieldsValue({ ...model });
    setMenuType(model.menuType);
  }, [form, model]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (model.menuId) {
        values.menuId = model.menuId;
        await http.post("/menu/update", values);
      } else {
        await http.post("/menu/insert", values);
      }
      handleCancel();
      callBack();
    });
  };

  const handleCancel = () => {
    setModel({});
    setTimeout(() => {
      form.resetFields();
      setIsModalOpen(false);
    }, 100);
  };
  return (
    <Dialog
      title={model.menuId ? "修改信息" : "添加信息"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={{ parent: 0, menuType: 0, orderIndex: 0, status: 0, show: 0 }}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item name="parent" label="上级目录" rules={rules.parent}>
          <TreeSelect
            treeData={[{ menuId: 0, menuName: "主目录", children: menuData }]}
            fieldNames={{ value: "menuId", label: "menuName", children: "children" }}
            showSearch
            placeholder="默认为主目录"
            filterTreeNode={(input, treeNode) => treeNode.menuName.toLowerCase().includes(input.toLowerCase())}
          ></TreeSelect>
        </Form.Item>
        <Form.Item name="menuType" label="菜单状态" rules={rules.status}>
          <Radio.Group onChange={({ target }) => setMenuType(target.value)}>
            <Radio value={0}>目录</Radio>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="menuName" label="菜单名称" rules={rules.menuName}>
          <Input allowClear maxLength="12" />
        </Form.Item>
        <Form.Item name="menuIcon" label="图标">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.value.toLowerCase().includes(input.toLowerCase())}
          >
            {iconList.map((item) => (
              <Select.Option value={item[0]} key={item}>
                <span style={{ paddingRight: "8px" }}>{React.createElement(item[1])}</span>
                <span>{item[0]}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="orderIndex" label="显示顺序" rules={rules.orderIndex}>
          <InputNumber min="0" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="menuPath"
          label="路由地址"
          rules={rules.menuPath}
          onChange={({ target }) => {
            let { value } = target;
            value = value.replace(/^[/]{1}/, "").replace(/\//g, ":");
            form.setFieldValue("menuCode", value);
          }}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        {!!menuType && (
          <>
            <Form.Item name="menuCode" label="权限标识" rules={rules.menuCode}>
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </>
        )}

        <Form.Item name="show" label="菜单显示" rules={rules.show}>
          <Radio.Group>
            <Radio value={0}>显示</Radio>
            <Radio value={1}>隐藏</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="status" label="菜单状态" rules={rules.status}>
          <Radio.Group>
            <Radio value={0}>正常</Radio>
            <Radio value={1}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Dialog>
  );
};

function MenuComponent() {
  // const [form] = Form.useForm();
  const [foled, setFoled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState({});
  const [sourceData, setSourceData] = useState([]);

  const columns = [
    { title: "菜单名称", dataIndex: "menuName", key: "menuName" },
    {
      title: "类型",
      dataIndex: "menuType",
      key: "menuType",
      render: (value) => {
        const tags = {
          0: <Tag color="magenta">目录</Tag>,
          1: <Tag color="blue">菜单</Tag>,
          2: <Tag color="#1890ff">按钮</Tag>,
        };
        return tags[value];
      },
    },
    {
      title: "图标",
      dataIndex: "menuIcon",
      key: "menuIcon",
      render: (text) => text && React.createElement(AntdIcon[text]),
    },
    { title: "路由路径", dataIndex: "menuPath", key: "menuPath" },
    { title: "权限标识", dataIndex: "menuCode", key: "menuCode" },
    { title: "显示顺序", dataIndex: "orderIndex", key: "orderIndex" },
    {
      title: "显示",
      dataIndex: "showName",
      key: "showName",
      render: (_, record) => (
        <>
          <Switch
            size="small"
            checked={!record.show}
            onClick={async () => {
              await http.get(`/menu/update/show?id=${record.menuId}`);
              getData();
            }}
          />
        </>
      ),
    },
    {
      title: "状态",
      dataIndex: "statusName",
      key: "statusName",
      render: (_, record) => (
        <>
          <Switch
            size="small"
            checked={!record.status}
            onClick={async () => {
              await http.get(`/menu/update/status?id=${record.menuId}`);
              getData();
            }}
          />
        </>
      ),
    },
    {
      title: "操作",
      key: "options",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={() => {
              setModel({ parent: record.menuId, menuPath: record.menuPath });
              setIsModalOpen(true);
            }}
          >
            添加
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setModel(record);
              setIsModalOpen(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="是否删除该信息"
            placement="bottom"
            onConfirm={() => onDelete(record.menuId)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const getData = async () => {
    const res = await http.post("menu/list", {});
    makeKey(res);
    setSourceData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleFinish = async (values) => {
  //   const { list: res } = await http.post("menu/list", values);
  //   makeKey(res);
  //   setSourceData(res);
  // };

  const onDelete = async (menuId) => {
    await http.post(`/menu/delete?id=${menuId}`);
    getData();
  };

  return (
    <div className="table_wapper">
      {/* <div className="main_header" style={{ display: foled && "none" }}>
        <Form layout="inline" form={form} className="screen_from" onFinish={handleFinish} autoComplete="off">
          <Form.Item name="roleName" label="菜单名称">
            <Input allowClear maxLength="18" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              搜索
            </Button>
            <Button onClick={() => form.resetFields()} icon={<SyncOutlined />}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div> */}

      <div className="main_body">
        <div className="button_card">
          <div>
            <Button type="primary" icon={<PlusOutlined />} ghost onClick={() => setIsModalOpen(true)}>
              添加
            </Button>
            <AddDialog
              menuData={sourceData}
              model={model}
              setModel={setModel}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              callBack={getData}
            />
          </div>
          <div>
            <Button shape="circle" icon={<SearchOutlined />} onClick={() => setFoled(!foled)}></Button>
            <Button shape="circle" icon={<SyncOutlined />} onClick={getData}></Button>
          </div>
        </div>
        <Table columns={columns} pagination={false} dataSource={sourceData} />
      </div>
    </div>
  );
}

export default MenuComponent;
