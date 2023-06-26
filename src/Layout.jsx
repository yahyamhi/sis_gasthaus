import {
  MenuFoldOutlined,
  BarChartOutlined,
  UserOutlined,
  AlertOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { NavLink,BrowserRouter as Router, Route, Routes, Navigate  , useNavigate} from "react-router-dom";


import AdminPage from "./AdminPage";
import CameraPage from "./CameraPage";
import EmergencyPage from "./EmergencyPage";
import ReportPage from "./ReportPage";
import AccessControl from "./AccessControl";

const { Header, Sider, Content } = Layout;

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
      <Layout className="main-page">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"  >
        <h2 style={{ color:"#ee661c" ,  textAlign:"center"}}>SUI</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
                  defaultSelectedKeys={["/adminPage"]}
                  onClick={({key})=>navigate(key)}
          items={[
            {
              key: "/adminPage",
              icon: <UserOutlined />,
              label: "Admin 1",
            },
            {
              key: "/cameraPage",
              icon: <VideoCameraOutlined />,
              label: "Camer 1",
            },
            {
              key: "/emergencyPage",
              icon: <AlertOutlined />,
              label: "Emergency",
            },
            {
              key: "/ReportPage",
              icon: <BarChartOutlined />,
              label: "Reports",
            },
            {
              key: "/accessControl",
              label: "Access Control"
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
        <Content
     
        >
          {/* <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube-nocookie.com/embed/Jqf9haCd6mM" 
          ></iframe> */}
           <Routes>
                      <Route path="/" element={<Navigate to="/adminPage" />} />
                                     <Route path="/*" element={<Navigate to="/adminPage"/>} />

               <Route path="/adminPage" element={<AdminPage/>} />
               <Route path="/cameraPage" element={<CameraPage/>} />
               <Route path="/emergencyPage" element={<EmergencyPage/>} />
               <Route path="/reportPage" element={<ReportPage/>} />
               <Route path="/accessControl" element={<AccessControl/>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage