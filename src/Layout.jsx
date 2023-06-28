import React from "react";
import {
  MenuFoldOutlined,
  BarChartOutlined,
  UserOutlined,
  AlertOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { NavLink, BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, FireOutlined, AimOutlined } from '@ant-design/icons';

import AdminPage from "./AdminPage";
import CameraPage from "./CameraPage";
import EmergencyPage from "./EmergencyPage";
import ReportPage from "./ReportPage";
import AccessControl from "./AccessControl";

const { Header, Sider, Content } = Layout;

const LayoutPage = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 style={{ color: "#ee661c", textAlign: "center" }}>GastHaus</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/adminPage"]}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: '1px solid #333' }} // This line
        >
          <Menu.Item key="/adminPage" icon={<UserOutlined />}>
            Admin 1
          </Menu.Item>
          <Menu.Item key="/cameraPage" icon={<VideoCameraOutlined />}>
            Camera 1
          </Menu.Item>
          <Menu.Item key="/emergencyPage" icon={<AlertOutlined />}>
            Emergency
          </Menu.Item>
          <Menu.Item key="/reportPage" icon={<BarChartOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="/accessControl" icon={<LockOutlined />}>
            Access Control
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
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
