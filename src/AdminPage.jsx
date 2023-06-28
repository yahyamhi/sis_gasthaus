import React from "react";
import "./assets/style/style.scss";

import { Card, Layout, Descriptions } from "antd";
const { Content } = Layout;
const { Meta } = Card;

const AdminPage = () => {
  const firstName = "John";
  const lastName = "Applsead";
  const position = "Staff";
  const profilePictureUrl =
    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

  return (
    <Layout className="main-inner-page">
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
        }}
      >
        <Descriptions title="Admin Info" layout="vertical" bordered>
          <Descriptions.Item label="Profile">
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="Profile picture" src={profilePictureUrl} />}
            >
              <Meta title={`${firstName} ${lastName}`} description={`Staff: ${position}`} />
            </Card>
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">+49 12345678912</Descriptions.Item>
          <Descriptions.Item label="Live">Dortmund, Germany</Descriptions.Item>
          <Descriptions.Item label="Remark">N/A</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Kurfürstendamm, Charlottenburg, Dortmund, Germany
          </Descriptions.Item>
        </Descriptions>
      </Content>
    </Layout>
  );
};

export default AdminPage;
