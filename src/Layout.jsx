import {
  MenuFoldOutlined,
  BarChartOutlined,
  UserOutlined,
  AlertOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink, BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";

import AdminPage from "./AdminPage";
import CameraPage from "./CameraPage";
import EmergencyPage from "./EmergencyPage";
import ReportPage from "./ReportPage";
import AccessControl from "./AccessControl";

const { Header, Sider, Content } = Layout;

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 style={{ color: "#ee661c", textAlign: "center" }}>SUI</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/adminPage"]}
          onClick={({key}) => navigate(key)}
        >
          <Menu.Item key="/adminPage" icon={<UserOutlined />}>Admin 1</Menu.Item>
          <Menu.Item key="/cameraPage" icon={<VideoCameraOutlined />}>Camera 1</Menu.Item>
          <Menu.Item key="/emergencyPage" icon={<AlertOutlined />}>Emergency</Menu.Item>
          <Menu.Item key="/reportPage" icon={<BarChartOutlined />}>Reports</Menu.Item>
          <Menu.Item key="/accessControl">Access Control</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/adminPage" />} />
              <Route path="/*" element={<Navigate to="/adminPage" />} />
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/cameraPage" element={<CameraPage />} />
              <Route path="/emergencyPage" element={<EmergencyPage />} />
              <Route path="/reportPage" element={<ReportPage />} />
              <Route path="/accessControl" element={<AccessControl />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
