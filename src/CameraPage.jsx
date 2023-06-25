import React, { useEffect, useRef } from "react";
import { Layout } from "antd";
import io from "socket.io-client";
import "./assets/style/style.scss";

const { Content } = Layout;

const CameraPage = () => {
  const colorBgContainer = "your-background-color";
  const imgRef = useRef(null);

  useEffect(() => {
    // Establish a Socket.IO connection
    const socket = io('http://localhost:5000');
    
    // Listen for 'video-frame' event and update image src when a frame is received
    socket.on('video-frame', (data) => {
      if (imgRef.current) {
        imgRef.current.src = 'data:image/jpeg;base64,' + data.frame;
      }
    });

    // Clean up the Socket.IO connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Layout className="main-inner-page">
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: colorBgContainer,
        }}
      >
        <div data-vjs-player>
          <img ref={imgRef} alt="video stream"/>
        </div>
      </Content>
    </Layout>
  );
};

export default CameraPage;
