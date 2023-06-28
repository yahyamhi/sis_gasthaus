import React, { useState } from "react";
import { Button, Layout, List, Typography } from "antd";
import { SecurityScanOutlined } from "@ant-design/icons";
import "./assets/style/style.scss";

const { Content } = Layout;
const { Text } = Typography;

const EmergencyPage = () => {
  const [isEmergency, setIsEmergency] = useState(false);

  const handleEmergencyToggle = () => {
    setIsEmergency((prevEmergency) => !prevEmergency);
  };

  return (
    <Layout className="main-inner-page">
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: "Current Status",
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<SecurityScanOutlined style={{ fontSize: "24px" }} />}
                title={item.title}
                description={
                  <Text style={{ color: isEmergency ? "red" : "green" }}>
                    {isEmergency ? "Emergency" : "Normal"}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Button
            type="danger"
            style={{ backgroundColor: "red", color: "black" }}
            onClick={handleEmergencyToggle}
          >
            {isEmergency
              ? "Stop Emergency Signal"
              : "Report Emergency Incident"}
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default EmergencyPage;
