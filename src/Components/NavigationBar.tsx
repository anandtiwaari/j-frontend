import { Avatar, Menu } from 'antd'
import { Header } from 'antd/es/layout/layout'
import mailify from "../assets/mailify-logo.svg"
import { Link } from 'react-router-dom';
const NavigationBar = () => {
    const items = [{ path: "/", label: "Home" }, { path: "/dashboard", label: "Dashboard" }].map((d, index) => ({
        key: index + 1,
        label: <Link to={d?.path}>{`${d?.label}`}</Link>,
    }));
    console.log(items, "show the items")
    return (
        <div>
            <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "#3D52A0" }}>
                <div >
                    <img src={mailify} className='h-[35px]' alt="" />
                </div>
                <Menu

                    theme="dark"
                    mode="horizontal"
                    // selectedKeys={}
                    // defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0, backgroundColor: "#3D52A0" }}
                />
            </Header>
        </div>
    )
}

export default NavigationBar
