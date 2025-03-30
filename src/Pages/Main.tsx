import React from "react";
import { useState } from "react";
import { List, Row, Col, Button, Form, message, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Controls from "../Components/Controls";
import EmailMessage from "../Components/EmailMessage";
import CsvParser from "../Components/Upload";
import SubjectBodyForm from "./../Components/SubjectBodyForm";
import toast from "react-hot-toast";
import { DeleteOutlined } from '@ant-design/icons';
const Main = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  const [form] = Form.useForm();
  const [emails, setEmails] = useState([]);
  const [scheduleTime, setScheduleTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addCustomEmail, setAddCustomEmail] = useState("");
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  // loader state for the handle schedule emails.......
  const [isScheduling, setIsScheduling] = useState(false)

  const extractedEmails = emails.filter((email) => email).slice(1);
  const [error, setError] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  // const handleAddCustomEmail = () => {
  //   if (addCustomEmail.trim() !== "") {
  //     setEmails((prev) => [...prev, addCustomEmail.trim()]);
  //     setAddCustomEmail(""); // Clear the input after adding the email
  //   } else {
  //     toast.error("Please enter a valid email address.");
  //   }
  // };

  const handleAddCustomEmail = () => {
    if (!validateEmail(addCustomEmail.trim())) {
      setError(true); // Show input-level error
      return;
    }

    if (emails.includes(addCustomEmail.trim())) {
      setError(true); // Show error if email is duplicate
      return;
    }

    setEmails((prev) => [...prev, addCustomEmail.trim()]);
    setAddCustomEmail(""); // Clear input after adding the email
    setError(false); // Reset error state after successful addition
  };

  const handleSubmit = async (values) => {
    setIsScheduling(true)
    const payload = {
      to: emails,
      subject: values?.subject,
      body: values?.body,
      scheduledAt: scheduleTime,
    };
    const formData = new FormData();
    formData.append("image", fileList?.[0]?.originFileObj); // Append image
    formData.append("to", JSON.stringify(emails)); // Replace with actual data
    formData.append("subject", values?.subject);
    formData.append("body", values?.body);
    formData.append("scheduledAt", scheduleTime);
    await handleScheduleEmails(formData);
    setIsScheduling(false)
    setScheduleTime(null);
    setEmails([]);
    navigate("/dashboard");
  };

  const handleScheduleEmails = async (payload) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/schedule-email`,
        payload
      );
      console.log(response, "show the response here now ...");
      if (response?.status === 201) {
        setIsModalOpen(false);
        toast.success(
          response?.data?.message || "Email scheduled successfully!"
        );
        form.resetFields();
      }
    } catch (error) {
      console.log(
        error,
        "show the error here now for the schedule emails ....."
      );

      console.log(error?.response?.data?.error, "error?.response?.data?.error");
      setIsModalOpen(false);
      // message.error(error?.response?.data?.error || "An error occurred.");
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDelete = (emailToRemove) => {
    setEmails((prevEmails) => prevEmails.filter((email) => email !== emailToRemove));
  };

  console.log(fileList, "check the file list here now .......");
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Controls setScheduleTime={setScheduleTime} />
        <Col xs={24} md={18} className="content">
          <>
            <div className="content-inner">
              <div className="flex justify-between items-center">
                <h3 className="mb-2 text-lg font-bold">Email List</h3>
                <div className="flex gap-2">
                  {/* <Input
                    placeholder="Enter Emails"
                    value={addCustomEmail}
                    onChange={(e) => setAddCustomEmail(e.target.value)}
                  /> */}

                  <Input
                    placeholder="Enter Emails"
                    value={addCustomEmail}
                    status={error ? "error" : ""}
                    onChange={(e) => {
                      setAddCustomEmail(e.target.value);
                      setError(false); // Clear error while typing
                    }}
                    onPressEnter={handleAddCustomEmail} // Add email on Enter key press
                  />
                  <Button type="primary" onClick={handleAddCustomEmail}>
                    Add Email
                  </Button>
                </div>
                {emails?.length > 0 && scheduleTime && (
                  <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Add Details
                  </Button>
                )}
              </div>
              <EmailMessage
                isModalOpen={isModalOpen}
                handleSubmit={form.submit}
                handleCancel={handleCancel}
                isScheduling={isScheduling}
                handleOk={handleOk}
                component={
                  <SubjectBodyForm
                    form={form}
                    handleSubmit={handleSubmit}
                    fileList={fileList}
                    setFileList={setFileList}
                    isScheduling={isScheduling}
                  />
                }
              />
              <div className="max-h-[300px] overflow-y-auto border border-gray-300 rounded-md p-2">
                <List
                  bordered
                  dataSource={emails} // Display all emails
                  renderItem={(email) => <List.Item
                    actions={[
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(email)}
                      />
                    ]}

                  >{email}</List.Item>}
                />
              </div>
            </div>
            <div className="flex flex-col mt-4 uploads">
              <CsvParser
                setEmails={setEmails}
                setErrorMessage={setErrorMessage}
              />
              {errorMessage && (
                <div className="font-bold text-red-600">{errorMessage}</div>
              )}
            </div>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
