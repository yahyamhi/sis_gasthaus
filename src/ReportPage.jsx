import React from 'react';
import { Layout, Typography, Divider } from 'antd';
import { Pie, Line, Bar } from '@ant-design/charts';

const { Content } = Layout;
const { Title } = Typography;

const pieData = [
  { type: 'Monday', value: 40, color: '#1890ff' },
  { type: 'Tuesday', value: 25, color: '#73d13d' },
  { type: 'Wednesday', value: 20, color: '#ff7875' },
  { type: 'Thursday', value: 15, color: '#ff9c6e' },
];

const lineData = [
  { day: 'Mon', value: 0 },
  { day: 'Tue', value: 2 },
  { day: 'Wed', value: 3 },
  { day: 'Thu', value: 4 },
  { day: 'Fri', value: 3 },
  { day: 'Sat', value: 5 },
  { day: 'Sun', value: 4 },
];

const barData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 150 },
  { month: 'Apr', value: 300 },
];

const ReportPage = () => {
  return (
    <Layout className="main-inner-page">
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
        }}
      >
        <Title level={3}>Reports</Title>
        <Divider />
        <Title level={4}>Gender Distribution</Title>
        <Pie data={pieData} height={200} angleField='value' colorField='type' radius={0.8} />
        <Divider />
        <Title level={4}>Weekly Occupancy Rates</Title>
        <Line data={lineData} height={200} xField='day' yField='value' point={{ size: 2, shape: 'circle' }} line={{ color: '#1890ff' }} />
        <Divider />
        <Title level={4}>Daily Guest Count</Title>
        <Line data={lineData} height={200} xField='day' yField='value' point={{ size: 2, shape: 'circle' }} line={{ color: '#1890ff' }} />
        <Divider />
        <Title level={4}>Monthly Meal Count</Title>
        <Bar data={barData} height={200} xField='month' yField='value' colorField='month' />
      </Content>
    </Layout>
  );
};

export default ReportPage;
