import React, { useReducer } from "react";
import { Card, Button, Input, Form, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import login_bg from "../../assets/login_bg.jpg";
interface LoginFormInputs {
  email: string;
  password: string;
}

const initialState = {
  loading: false,
};

const manageLoginState = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false };
    case "LOGIN_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loginState, setLoginState] = useReducer(
    manageLoginState,
    initialState
  );
  const [messageApi, contextHolder] = message.useMessage();
  const handleLoginUser = async (data: LoginFormInputs) => {
    try {
      setLoginState({ type: "LOGIN_REQUEST" });
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      if (response?.status == 200) {
        setLoginState({ type: "LOGIN_SUCCESS" });
        message.success("Login successful!");
        localStorage.setItem("token", response?.data?.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginState({ type: "LOGIN_FAILURE" });
      console.log(error, "error");
      message.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      handleLoginUser(data);
    } catch (error) {
      console.log(error, "error");
      return error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {contextHolder}
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <Typography.Title level={2} className="!mb-2">
            Welcome Back
          </Typography.Title>
          {/* <Typography.Text className="text-gray-500">
            Please sign in to continue
          </Typography.Text> */}
          <Typography.Text className="text-gray-500">
            Sign in to automate your emails effortlessly
          </Typography.Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
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
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your email"
                  size="large"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  size="large"
                />
              )}
            />
          </Form.Item>

          {/* <div className="flex justify-between items-center mb-4">
            <Typography.Link className="text-sm">
              Forgot password?
            </Typography.Link>
          </div> */}

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loginState?.loading}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Sign In
          </Button>

          <div className="text-center mt-4">
            <Typography.Text className="text-gray-500">
              Don't have an account?{" "}
              <Typography.Link onClick={() => navigate("/register")}>
                Sign up
              </Typography.Link>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </div>
    // <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
    //   {/* Background Image */}
    //   <img
    //     src={login_bg}
    //     alt="Email Automation Illustration"
    //     className="absolute inset-0 w-full h-full object-cover opacity-20"
    //   />

    //   {/* Login Card */}
    //   <Card className="w-full max-w-md p-8 rounded-xl shadow-2xl border border-gray-200 bg-white relative z-10">
    //     <div className="text-center mb-6">
    //       <img src="/logo.png" alt="Logo" className="h-12 mx-auto mb-3" />
    //       <Typography.Title level={2} className="!mb-2 text-gray-800">
    //         Welcome Back
    //       </Typography.Title>
    //       <Typography.Text className="text-gray-500">
    //         Sign in to automate your emails effortlessly
    //       </Typography.Text>
    //     </div>

    //     <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
    //       {/* Email Field */}
    //       <Form.Item
    //         label={<span className="text-gray-700 font-medium">Email</span>}
    //         validateStatus={errors.email ? "error" : ""}
    //         help={errors.email?.message}
    //       >
    //         <Controller
    //           name="email"
    //           control={control}
    //           rules={{
    //             required: "Email is required",
    //             pattern: {
    //               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //               message: "Invalid email address",
    //             },
    //           }}
    //           render={({ field }) => (
    //             <Input
    //               {...field}
    //               prefix={<UserOutlined className="text-gray-400" />}
    //               placeholder="Enter your email"
    //               size="large"
    //               className="rounded-lg shadow-sm"
    //             />
    //           )}
    //         />
    //       </Form.Item>

    //       {/* Password Field */}
    //       <Form.Item
    //         label={<span className="text-gray-700 font-medium">Password</span>}
    //         validateStatus={errors.password ? "error" : ""}
    //         help={errors.password?.message}
    //       >
    //         <Controller
    //           name="password"
    //           control={control}
    //           rules={{
    //             required: "Password is required",
    //             minLength: {
    //               value: 6,
    //               message: "Password must be at least 6 characters",
    //             },
    //           }}
    //           render={({ field }) => (
    //             <Input.Password
    //               {...field}
    //               prefix={<LockOutlined className="text-gray-400" />}
    //               placeholder="Enter your password"
    //               size="large"
    //               className="rounded-lg shadow-sm"
    //             />
    //           )}
    //         />
    //       </Form.Item>

    //       {/* Sign In Button */}
    //       <Button
    //         type="primary"
    //         htmlType="submit"
    //         size="large"
    //         loading={loginState?.loading}
    //         className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
    //       >
    //         Sign In
    //       </Button>

    //       {/* Sign Up Link */}
    //       <div className="text-center mt-4">
    //         <Typography.Text className="text-gray-600">
    //           Don't have an account?{" "}
    //           <Typography.Link
    //             onClick={() => navigate("/register")}
    //             className="text-blue-600 font-medium hover:text-blue-800 transition"
    //           >
    //             Sign up
    //           </Typography.Link>
    //         </Typography.Text>
    //       </div>
    //     </Form>
    //   </Card>
    // </div>
  );
};

export default Login;
