import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SubjectBodyForm = ({ form, handleSubmit }) => {




    return (
        <div style={styles.formContainer}>
            <Title level={3}>Create Email</Title>
            <Form
                form={form}
                name="subject-body-form"
                onFinish={handleSubmit}
                layout="vertical"
                style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
            >
                <Form.Item
                    name="subject"
                    label="Add Subject"
                    rules={[{ required: true, message: "Please input the subject!" }]}
                >
                    <Input placeholder="Enter Subject" />
                </Form.Item>

                <Form.Item
                    name="body"
                    label="Add Body"
                    rules={[{ required: true, message: "Please enter the body content!" }]}
                >
                    <Input.TextArea
                        placeholder="Enter the body content here..."
                        rows={8}
                        style={{ resize: "none" }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};


const styles = {
    formContainer: {
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
    },
};

export default SubjectBodyForm;
