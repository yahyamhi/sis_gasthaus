import React from "react";
import "./assets/style/style.scss";

import { Card, Layout, Descriptions, theme } from "antd";
import { useState } from "react";
const { Content } = Layout;
const { Meta } = Card;

const AdminPage = () => {
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
        <Descriptions title="Admin Info">
          <Descriptions.Item >
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://shorturl.at/cuCU7" />}
            >
              <Meta title="Garfield" description="Staff: Admin 1 " />
            </Card>
          </Descriptions.Item>
          <Descriptions.Item ></Descriptions.Item>
          <Descriptions.Item ></Descriptions.Item>
          <Descriptions.Item label="Telephone">+49 12345678912</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>

      </Content>
    </Layout>
  );
};

export default AdminPage;