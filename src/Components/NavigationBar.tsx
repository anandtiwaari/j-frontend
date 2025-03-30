// import { Avatar, Button, Menu } from "antd";
// import { Header } from "antd/es/layout/layout";
// import mailify from "../assets/mailify-logo.svg";
// import { Link, useLocation } from "react-router-dom";

// const NavigationBar = () => {
//   const location = useLocation(); // Get the current route

//   const items = [
//     { path: "/", label: "Home" },
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/analytics", label: "Analytics" },
//   ].map((d) => ({
//     key: d.path, // Use path as key to match location.pathname
//     label: <Link to={d.path}>{d.label}</Link>,
//   }));

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   return (
//     <div>
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "#3D52A0",
//         }}
//       >
//         <div>
//           <img src={mailify} className="h-[35px]" alt="Mailify Logo" />
//         </div>
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           selectedKeys={[location.pathname]} // Mark active item
//           items={items}
//           style={{ flex: 1, minWidth: 0, backgroundColor: "#3D52A0" }}
//         />
//         <div className="flex justify-end">
//           <Button type="primary" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </Header>
//     </div>
//   );
// };

// export default NavigationBar;

import { Avatar, Button, Menu, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import mailify from "../assets/mailify-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

const NavigationBar = () => {
  const location = useLocation(); // Get the current route
  const [userData, setUserData] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    let data: any = localStorage.getItem("user_details");
    if (data) {
      data = JSON.parse(data);
      setUserData(data);
    }
  }, []);

  const items = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/analytics", label: "Analytics" },
  ].map((d) => ({
    key: d.path, // Use path as key to match location.pathname
    label: (
      <Link
        to={d.path}
        className={`px-4 py-2 transition-all rounded-md ${
          location.pathname === d.path
            ? "bg-white !text-[#3D52A0] font-semibold shadow-md"
            : "text-white hover:bg-[#5468C4] hover:text-white"
        }`}
      >
        {d.label}
      </Link>
    ),
  }));

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  console.log(
    userData,
    "show the userData here now and check how this one is used here now ............"
  );
  return (
    <Header className="flex items-center justify-between px-6 py-3 bg-[#3D52A0] shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <img src={mailify} className="h-10 w-auto" alt="Mailify Logo" />
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]} // Mark active item
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "transparent",
          borderBottom: "none",
          display: "flex",
          justifyContent: "center",
        }}
      />

      {/* User Profile & Logout */}
      <div className="flex items-center space-x-4">
        <Tooltip
          title={
            <div className="p-2 text-sm text-white bg-gray-800 rounded-md shadow-md">
              <p className="font-semibold">
                {/* 👤 */}
                <span className="mr-2">
                  <UserOutlined />
                </span>
                {userData?.name}
              </p>
              <p className="text-gray-300">
                {/* 📧 */}
                <span className="mr-2">
                  <MailOutlined />
                </span>
                {userData?.email}
              </p>
            </div>
          }
          visible={isHovered}
        >
          <Avatar
            size="large"
            className="bg-white text-[#3D52A0] font-semibold"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {userData?.name?.[0]?.toUpperCase()}
          </Avatar>
        </Tooltip>
        <Button
          type="primary"
          danger
          onClick={handleLogout}
          className="px-4 py-2 transition-all hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default NavigationBar;
