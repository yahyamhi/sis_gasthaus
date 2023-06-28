import React, { useEffect, useRef, useState } from "react";
import { Layout } from "antd";
import io from "socket.io-client";
import "./assets/style/style.scss";
import { ExclamationCircleOutlined, FireOutlined, AimOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';

const { Content } = Layout;

const ALARM_TYPES = [
  { id: 'Fight', display: 'Fight', icon: <ExclamationCircleOutlined /> },
  { id: 'Fire', display: 'Fire', icon: <FireOutlined /> },
  { id: 'Violence', display: 'Vandalism', icon: <AimOutlined /> }
];

const CameraPage = () => {
  const imgRef = useRef(null);
  const [lastAlarmTimes, setLastAlarmTimes] = useState(new Map());
  const [timer, setTimer] = useState(Date.now());
  const [numPeople, setNumPeople] = useState(0);
  // Create AudioContext for alarm sound
  const audioCtx = new (window.AudioContext || window.webkitAudioContext || false)();

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
      setLastAlarmTimes(prevTimes => new Map(prevTimes).set(data.type, Date.now()));

      // Play alarm sound
      if (audioCtx) {
        let oscillator = audioCtx.createOscillator();
        oscillator.connect(audioCtx.destination);
        oscillator.frequency.value = 3000; // Frequency of the beep
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
        }, 1000); // Duration of the beep
      }
    });
    
    socket.on('people-detected', (data) => {
      console.log('Received people-detected event: ', data);
      setNumPeople(data.num_people);
    });
    
    // Clean up the Socket.IO connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderAlarms = () => {
    const now = Date.now();
    return ALARM_TYPES.map(alarmType => {
      const lastTime = lastAlarmTimes.get(alarmType.id);
      const color = lastTime && (now - lastTime < 2000) ? 'red' : 'grey';
      return (
        <div key={alarmType.id} style={{ color: 'black', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <span style={{ color, fontSize: '22px', marginRight: '10px' }}>{alarmType.icon}</span> 
          <span style={{fontSize: '20px'}}>{alarmType.display}</span>
        </div>
      );
    });
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
          <div className="camera-alerts">
          <div style={{ color: 'black', marginBottom: '15px', fontSize: '22px', display: 'flex', alignItems: 'center' }}>
            <UsergroupAddOutlined style={{ fontSize: '25px', marginRight: '10px' }} /> 
            Total Guests: {numPeople}
          </div>
          {renderAlarms()}
        </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CameraPage;
