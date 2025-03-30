import React, { useReducer } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const { Title } = Typography;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const initialState = {
  loading: false,
};

const manageRegisterState = (state: any, action: any) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false };
    case "REGISTER_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useReducer(
    manageRegisterState,
    initialState
  );
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>();
  console.log(getValues(), "control");

  const handleRegisterUser = async (data: RegisterFormData) => {
    try {
      setRegisterState({ type: "REGISTER_REQUEST" });
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );
      if (response?.status == 201) {
        setRegisterState({ type: "REGISTER_SUCCESS" });
        message.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      setRegisterState({ type: "REGISTER_FAILURE" });
      console.log(error, "error");
      message.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      handleRegisterUser(data);
    } catch (error) {
      console.log(error, "error");
      return error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2} className="!text-gray-800 !mb-2">
            Create Account
          </Title>
          <p className="text-gray-500">Start your journey with us today</p>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Form.Item
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
            className="mb-4"
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Full Name"
                  size="large"
                  className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
            className="mb-4"
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Email"
                  size="large"
                  className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
            className="mb-6"
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Password"
                  size="large"
                  className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={registerState.loading}
              className="h-12 text-lg font-medium rounded-lg bg-blue-500 hover:bg-blue-600 border-none shadow-md hover:shadow-lg transition-all duration-300"
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
