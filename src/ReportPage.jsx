import React ,{ useState, useEffect } from 'react';
import "./assets/style/style.scss";
// import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';
// import { Column } from '@ant-design/plots';
import { Line } from '@ant-design/charts';

import { Button, Layout, Menu, theme } from "antd";
// import { useState } from "react";
const {   Content } = Layout;

const ReportPage = () => {
    const {
    token: { colorBgContainer },
  } = theme.useToken();
  const data = [
    { year: 'Jan', value: 3 },
    { year: 'Feb', value: 4 },
    { year: 'Mar', value: 3 },
    { year: 'Apr', value: 6 },
    { year: 'May', value: 4 },
    
  ];
  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  let chart;

  // Export Image
  const downloadImage = () => {
    chart?.downloadImage();
  };

  // Get chart base64 string
  const toDataURL = () => {
    console.log(chart?.toDataURL());
  };

    return (
        <Layout className="main-inner-page">

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: colorBgContainer,
              }}
            >
             <h1>Report page </h1>
             <div>
      <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
        Export Image
      </button>
      <button type="button" onClick={toDataURL}>
        Get base64
      </button>
      <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
    </div>
              
            </Content>
        </Layout>
      );
};

export default ReportPage;