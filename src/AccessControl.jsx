import React, { useState } from "react";
import { Layout, Button, Checkbox, Card } from "antd";
import "./assets/style/style.scss";

const { Content } = Layout;

const rooms = ["A101", "A102", "A103", "A201", "A202", "A203", "A301", "A302", "A303"];

const AccessControl = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleCheckChange = (checkedValues) => {
    setSelectedRooms(checkedValues);
  }

  const grantAccess = () => {
    alert(`Access granted to rooms: ${selectedRooms.join(", ")}`);
    setSelectedRooms([]);
  }

  const denyAccess = () => {
    alert(`Access denied to rooms: ${selectedRooms.join(", ")}`);
    setSelectedRooms([]);
  }

  const colorBgContainer = "your-background-color";

  return (
    <Layout className="main-inner-page">
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: colorBgContainer,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card title="Room Access Control" style={{ width: 300, marginBottom: "16px" }}>
          <Checkbox.Group options={rooms} value={selectedRooms} onChange={handleCheckChange} />
        </Card>
        <div>
          <Button type="primary" style={{ marginRight: "8px" }} onClick={grantAccess}>
            Grant Access
          </Button>
          <Button danger onClick={denyAccess}>
            Deny Access
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default AccessControl;
