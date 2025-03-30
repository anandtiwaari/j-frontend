import { Card, List, Button, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [scheduleEmails, setScheduleEmails] = useState([]);
  const [showAllEmails, setShowAllEmails] = useState({});

  const getAllTheEmails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/scheduled-emails"
      );
      console.log(response, "show the response....");
      setScheduleEmails(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTheEmails();
  }, []);

  const renderItem = (email) => {
    return (
      <List.Item key={email._id}>
        <Card
          title={email.subject}
          style={{
            width: "100%",
            background: "#f9f9f9",
            borderColor: "#e0e0e0",
          }}
          headStyle={{
            background: "#3498db",
            color: "white",
          }}
        >
          <p>
            <strong>To:</strong>
            {email?.to?.length <= 3 ? (
              email.to.join(", ")
            ) : (
              <>
                {showAllEmails[email._id] ? (
                  email.to.join(", ")
                ) : (
                  <>
                    {email.to.slice(0, 3).join(", ")}
                    <Button
                      type="link"
                      onClick={() =>
                        setShowAllEmails((prev) => ({
                          ...prev,
                          [email._id]: true,
                        }))
                      }
                    >
                      More
                    </Button>
                  </>
                )}
                {showAllEmails[email._id] && (
                  <Button
                    type="link"
                    onClick={() =>
                      setShowAllEmails((prev) => ({
                        ...prev,
                        [email._id]: false,
                      }))
                    }
                  >
                    Less
                  </Button>
                )}
              </>
            )}
          </p>
          <p>
            <strong>Body:</strong> {email.body}
          </p>
          <p>
            <strong>Scheduled At:</strong>{" "}
            {new Date(email.scheduledAt).toLocaleString()}
          </p>
          {/* <p><strong>Status:</strong> {email.status}</p>
           */}
          <p>
            <strong>Status:</strong>
            <Tag
              className="ml-2 font-bold"
              color={email.status === "pending" ? "volcano" : "success"}
            >
              {email.status}
            </Tag>
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(email.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(email.updatedAt).toLocaleString()}
          </p>
        </Card>
      </List.Item>
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <List
        grid={{
          gutter: 16,
          column: 1,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={scheduleEmails}
        renderItem={renderItem}
      />
    </div>
  );
};

export default Dashboard;
