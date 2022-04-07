import { Layout, Menu } from "antd";
import style from "./admin-page.module.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    console.log("123414");
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={style.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item icon={<UserOutlined />} key="user-list">
            <Link to="user">User</Link>
          </Menu.Item>
          <Menu.Item icon={<QuestionOutlined />} key="question-list">
            <Link to="question">Question</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={style.background} style={{ padding: 0 }}>
          <div className={style.trigger} onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        <Content
          className={style.background}
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* AdminPage */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
