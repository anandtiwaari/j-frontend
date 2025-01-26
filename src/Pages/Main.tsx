import React from 'react'
import { useState } from "react";
import { List, Row, Col, Button, Form, message, Input } from "antd";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Controls from '../Components/Controls';
import EmailMessage from '../Components/EmailMessage';
import CsvParser from '../Components/Upload';
import SubjectBodyForm from './../Components/SubjectBodyForm';
const Main = () => {
    const [form] = Form.useForm();
    const [emails, setEmails] = useState([]);
    const [scheduleTime, setScheduleTime] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [addCustomEmail, setAddCustomEmail] = useState("");
    const navigate = useNavigate()

    const extractedEmails = emails.filter((email) => email).slice(1);

    const handleAddCustomEmail = () => {
        if (addCustomEmail.trim() !== "") {
            setEmails((prev) => [...prev, addCustomEmail.trim()]);
            setAddCustomEmail(""); // Clear the input after adding the email
        } else {
            toast.error("Please enter a valid email address.");
        }
    };

    const handleSubmit = (values) => {
        const payload = {
            to: emails,
            subject: values?.subject,
            body: values?.body,
            scheduledAt: scheduleTime,
        };
        handleScheduleEmails(payload);
        setScheduleTime(null)
        setEmails([])
        navigate("/dashboard")
    };

    const handleScheduleEmails = async (payload) => {
        try {
            const response = await axios.post(`https://j-backend-69vt.onrender.com/api/schedule-email`, payload);
            console.log(response,"show the response here now ...")
            if (response?.status === 201) {
                setIsModalOpen(false);
                toast.success(response?.data?.message || "Email scheduled successfully!");
                form.resetFields();
            }
        } catch (error) {
            setIsModalOpen(false);
            message.error(error?.response?.data?.error || "An error occurred.");
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Controls setScheduleTime={setScheduleTime} />
                <Col xs={24} md={18} className="content">
                    <>
                        <div className="content-inner">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold mb-2">Email List</h3>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter Emails"
                                        value={addCustomEmail}
                                        onChange={(e) => setAddCustomEmail(e.target.value)}
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
                                handleOk={handleOk}
                                component={<SubjectBodyForm form={form} handleSubmit={handleSubmit} />}
                            />
                            <div className="max-h-[300px] overflow-y-auto border border-gray-300 rounded-md p-2">
                                <List
                                    bordered
                                    dataSource={emails} // Display all emails
                                    renderItem={(email) => <List.Item>{email}</List.Item>}
                                />
                            </div>
                        </div>
                        <div className="uploads mt-4 flex flex-col">
                            <CsvParser setEmails={setEmails} setErrorMessage={setErrorMessage} />
                            {errorMessage && <div className="text-red-600 font-bold">{errorMessage}</div>}
                        </div>
                    </>
                </Col>
            </Row>
        </div>
    )
}

export default Main
