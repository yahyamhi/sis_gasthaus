import React, { useEffect, useRef, useState } from "react";
import { Layout, Alert } from "antd";
import { FireOutlined, VideoCameraOutlined, WarningOutlined } from '@ant-design/icons';
import io from "socket.io-client";
import "./assets/style/style.scss";

const { Content } = Layout;

const CameraPage = () => {
  const imgRef = useRef(null);
  const [alarmType, setAlarmType] = useState(null);

  useEffect(() => {
    // Establish a Socket.IO connection
    const socket = io('http://localhost:5000');
    
    // Listen for 'video-frame' event and update image src when a frame is received
    socket.on('video-frame', (data) => {
      if (imgRef.current) {
        imgRef.current.src = 'data:image/jpeg;base64,' + data.frame;
      }
    });

    // Listen for alarm events
    socket.on('alarm', (data) => {
      console.log('Received alarm event: ', data);
      setAlarmType(data.type);
    });
    
    // Clean up the Socket.IO connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  const renderAlarm = () => {
    let message;
    let icon;

    switch(alarmType) {
      case 'vandalism':
        message = 'Vandalism detected!';
        icon = <WarningOutlined />;
        break;
      case 'violence':
        message = 'Violence detected!';
        icon = <VideoCameraOutlined />;
        break;
      case 'fire':
        message = 'Fire detected!';
        icon = <FireOutlined />;
        break;
      default:
        return null;
    }

    return (
      <Alert
        message={message}
        description="An alarm has been triggered due to detected activity. Please take immediate action."
        type="error"
        showIcon
        icon={icon}
      />
    );
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
        <div className="camera-page">
          <div className="camera-feed">
            <img ref={imgRef} alt="video stream"/>
          </div>
          {renderAlarm()}
        </div>
      </Content>
    </Layout>
  );
};

export default CameraPage;
