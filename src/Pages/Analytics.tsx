import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Spin, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const { Title, Text } = Typography;

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/analytics`);
      setAnalyticsData(response.data || {});
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <Text>No data available</Text>
      </div>
    );
  }

  const {
    totalSent = 0,
    totalPending = 0,
    totalFailed = 0,
    emailsOverTime = [],
  } = analyticsData;

  const pieData = [
    {
      name: "Sent",
      value: totalSent,
      color:
        "#28a745"
        // "#71e18a",
    },
    { name: "Pending", value: totalPending, color: "#ffc107" },
    { name: "Failed", value: totalFailed, color: "#dc3545" },
  ];

  console.log(emailsOverTime, "emailsOverTime.........emailsOverTime");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Title level={2} className="text-center mb-6">
        📊 Email Analytics Dashboard
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg p-4 border border-gray-200">
          <Title level={4} className="text-green-600">
            ✅ Sent Emails
          </Title>
          <Text className="text-xl font-semibold">{totalSent}</Text>
        </Card>

        <Card className="shadow-lg p-4 border border-gray-200">
          <Title level={4} className="text-yellow-500">
            ⏳ Pending Emails
          </Title>
          <Text className="text-xl font-semibold">{totalPending}</Text>
        </Card>

        <Card className="shadow-lg p-4 border border-gray-200">
          <Title level={4} className="text-red-500">
            ❌ Failed Emails
          </Title>
          <Text className="text-xl font-semibold">{totalFailed}</Text>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Pie Chart */}
        <Card className="shadow-lg p-4 border border-gray-200 flex justify-center">
          <PieChart width={350} height={350}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <Title level={5} className="text-center mt-4">
            Email Status Distribution
          </Title>
        </Card>

        {/* Bar Chart */}
        <Card className="shadow-lg p-4 border border-gray-200">
          {/* {emailsOverTime?.length > 0 ? ( */}
          {/* <div className="bg-red-700">No Data available</div> */}
          {/* ) : ( */}
          <BarChart width={500} height={300} data={emailsOverTime}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4CAF50" />
          </BarChart>
          {/* )} */}

          <Title level={5} className="text-center mt-4">
            Sent Emails Over Time
          </Title>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
