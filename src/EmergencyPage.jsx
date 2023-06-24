import React from "react";
import "./assets/style/style.scss";

import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
const {   Content } = Layout;

const EmergencyPage = () => {
    const {
    token: { colorBgContainer },
  } = theme.useToken();
    return (
        <Layout className="main-inner-page">

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: colorBgContainer,
              }}
            >
             <h1>Emergency page </h1>
              
            </Content>
        </Layout>
      );
};

export default EmergencyPage;