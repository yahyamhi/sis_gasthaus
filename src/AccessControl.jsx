import React, { useState, useEffect } from "react";
import { Layout, Button, Checkbox, Card, Select, Tag, Space, Row, Col, Input } from "antd";
import "./assets/style/style.scss";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtxh-i-zP2VCgqdLx7dnfTBHuYkC",
  authDomain: "deepfusion-f834c.firebaseapp.com",
  databaseURL: "https://deepfusion-f834c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "deepfusion-f834c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

const { Content } = Layout;

const rooms = ["A101", "A102", "A103", "A201", "A202", "A203", "A301", "A302", "A303"];

const { Option } = Select;

const AccessControl = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [managedDevice, setManagedDevice] = useState({});
  const [devicePermissions, setDevicePermissions] = useState({});
  const [deviceName, setDeviceName] = useState("");
  const [devices, setDevices] = useState({});
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    const managePermissionRef = ref(db, 'managePermission');
    onValue(managePermissionRef, (snapshot) => {
      const value = snapshot.val();
      handleDeviceChange(value);
    });
  }, [db]);

  useEffect(() => {
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const deviceData = {};
      const deviceList = [];
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'managePermission' && typeof value === 'object' && value !== null) {
          deviceData[key] = value;
          deviceList.push({id: key, name: value.name || 'Unnamed Device'});
        }
      });
      setDevices(deviceData);
      setDeviceList(deviceList);
    });
  }, [db]);

  const handleDeviceChange = (value) => {
    const deviceData = devices[value];
    setManagedDevice({id: value, ...deviceData});
    const permissions = deviceData?.access || {};
    setDevicePermissions(permissions);
    const grantedRooms = Object.entries(permissions)
      .filter(([room, access]) => access === 1)
      .map(([room, access]) => room);
    setSelectedRooms(grantedRooms);
    if (!deviceData.name) {
      setDeviceName("");
    } else {
      setDeviceName(deviceData.name);
    }
  };

  const handleNameChange = (e) => {
    setDeviceName(e.target.value);
  };

  const saveName = () => {
    set(ref(db, `${managedDevice.id}/name`), deviceName);
  };

  const handleCheckChange = (checkedValues) => {
    setSelectedRooms(checkedValues);
  };

  const grantAccess = () => {
    const updates = {};
    selectedRooms.forEach(room => {
      updates[room] = 1;
    });
    set(ref(db, `${managedDevice.id}/access`), updates);
  };

  const denyAccess = () => {
    const updates = {};
    selectedRooms.forEach(room => {
      updates[room] = 0;
    });
    set(ref(db, `${managedDevice.id}/access`), updates);
  };

  const colorBgContainer = "your-background-color";

  return (
    <Layout className="main-inner-page">
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: colorBgContainer,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="Select a Device">
              <Select
                placeholder="Select a device"
                style={{ width: 200 }}
                onChange={handleDeviceChange}
                optionLabelProp="label"
              >
                {deviceList.map((device, index) => (
                  <Option value={device.id} label={device.name} key={index}>
                    <div className="demo-option-label-item">
                      {device.id}: {device.name}
                    </div>
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="NFC Device Info">
              <p><strong>ID:</strong> {managedDevice.id}</p>
              <p><strong>Name:</strong> 
                {!managedDevice.name ? 
                  <>
                    <Input placeholder="Enter device name" value={deviceName} onChange={handleNameChange} />
                    <Button type="primary" onClick={saveName}>Save Name</Button>
                  </> 
                  : managedDevice.name
                }
              </p>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Available Access">
              <Space direction="vertical" style={{ width: '100%' }}>
                {rooms.map(room => (
                  <Row key={room}>
                    <Col span={12}>{room}</Col>
                    <Col span={12}>
                      {devicePermissions[room] === 1 ? (
                        <Tag color="green">Access Granted</Tag>
                      ) : (
                        <Tag color="volcano">Access Denied</Tag>
                      )}
                    </Col>
                  </Row>
                ))}
              </Space>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Room Access Control">
              <Checkbox.Group options={rooms} value={selectedRooms} onChange={handleCheckChange} />
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" style={{ marginRight: "8px" }} onClick={grantAccess}>
                  Grant Access
                </Button>
                <Button danger onClick={denyAccess}>
                  Deny Access
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AccessControl;
