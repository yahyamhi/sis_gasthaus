import React, { useState, useEffect } from "react";
import { Layout, Button, Checkbox, Card, Select, Tag, Space, Row, Col, Input } from "antd";
import "./assets/style/style.scss";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "@firebase/database";
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

const firebaseConfig = {
  apiKey: "AIzaSyBtxh-i-zP2VCgqdLx7dnfTBHuYkCPy8jE",
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
  const [deviceName, setDeviceName] = useState(managedDevice.name);
  const [devices, setDevices] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [deviceNameEditable, setDeviceNameEditable] = useState(true);
  
  useEffect(() => {
    const managePermissionRef = ref(db, 'managePermission');
    onValue(managePermissionRef, (snapshot) => {
      const value = snapshot.val();
      handleDeviceChange(value);
    });
  }, [db]);
  
  useEffect(() => {
    setDeviceName(managedDevice.name);
  }, [managedDevice]);
  
  
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
      // if managedDevice.id exists in the new data, update it
      if (deviceData[managedDevice.id]) {
        setManagedDevice(prev => ({...prev, name: deviceData[managedDevice.id].name}));
      }
    });
  }, [db, managedDevice.id]);
  
  const handleDeviceChange = (value) => {
    const deviceData = devices[value];
    setManagedDevice({id: value, ...deviceData});
    const permissions = deviceData?.access || {};
    setDevicePermissions(permissions);
    const grantedRooms = Object.entries(permissions)
      .filter(([room, access]) => access === 1)
      .map(([room, access]) => room);
    setSelectedRooms(grantedRooms);
    setDeviceNameEditable(false);  // Set it to not editable
    if (!deviceData.name) {
      setDeviceName("");
      setDeviceNameEditable(true);  // Make it editable if no name
    } else {
      setDeviceName(deviceData.name);
    }
  };

  const handleNameChange = (e) => {
    setDeviceName(e.target.value);
  };

  const saveName = () => {
    set(ref(db, `${managedDevice.id}/name`), deviceName)
      .then(() => {
        setDeviceNameEditable(false);  // Hide the text input and button after saving the name
      });
  };

  const handleCheckChange = (checkedValues) => {
    setSelectedRooms(checkedValues);
  };

  const grantAccess = () => {
    const updates = {};
    selectedRooms.forEach(room => {
      updates[room] = 1;
    });
    set(ref(db, `${managedDevice.id}/access`), updates).then(() => {
      setDevicePermissions(prev => ({ ...prev, ...updates }));  // Update the local state after changes made
    });
  };

  const denyAccess = () => {
    const updates = {};
    selectedRooms.forEach(room => {
      updates[room] = 0;
    });
    set(ref(db, `${managedDevice.id}/access`), updates).then(() => {
      setDevicePermissions(prev => ({ ...prev, ...updates }));  // Update the local state after changes made
    });
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
          <Col span={12}>
            <Card title="Select a Device" style={{ height: "100%" }}>
              <Select
                placeholder="Select a device"
                style={{ width: "100%" }}
                onChange={handleDeviceChange}
                optionLabelProp="label"
              >
                {deviceList.map((device, index) => (
                  <Option value={device.id} label={device.name} key={index}>
                    <div className="demo-option-label-item">
                      {device.name || `Unknown (${device.id})`}
                    </div>
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="NFC Device Info" style={{ height: "100%" }}>
              <p>
                <strong>ID:</strong> {managedDevice.id}
              </p>
              <p>
                <strong>Name:</strong>
                {!deviceNameEditable ? (
                  managedDevice.name
                ) : (
                  <>
                    <Input
                      placeholder="Enter device name"
                      value={deviceName}
                      onChange={handleNameChange}
                    />
                    <Button type="primary" onClick={saveName}>
                      Save Name
                    </Button>
                  </>
                )}
              </p>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Available Access">
              <Space direction="horizontal" style={{ width: "100%" }}>
                {rooms.map((room) => (
                  <div
                    key={room}
                    style={{ display: "flex", alignItems: "center", margin: "4px" }}
                  >
                    {devicePermissions[room] === 1 ? (
                      <CheckCircleOutlined
                        style={{ color: "green", marginRight: "4px" }}
                      />
                    ) : (
                      <StopOutlined
                        style={{ color: "red", marginRight: "4px" }}
                      />
                    )}
                    <span>{room}</span>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Room Access Control">
              <Row>
                <Col span={12}>
                  <Checkbox.Group
                    options={rooms}
                    value={selectedRooms}
                    onChange={handleCheckChange}
                  />
                </Col>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    style={{ marginRight: "8px" }}
                    onClick={grantAccess}
                  >
                    Grant Access
                  </Button>
                  <Button danger onClick={denyAccess}>
                    Deny Access
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
  
export default AccessControl;
