import React from "react";
import { Button, Layout, Input } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom"
const { Header } = Layout;
const { Search } = Input;

const PageHeader = () => {
    let navigate = useNavigate();


    const handleLogOut = () => {
        axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/logout`, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.status)
                    navigate(0)
                }
            })
    }
    return (
        <Header>
            <div className="flex flex-row">
                <div className="pr-4">
                    <Button type="link" onClick={() => navigate("/home")}>Home</Button></div>
                <div className="pr-4">
                    <Button type="link" onClick={() => navigate("/profile")}>Profile</Button>
                </div>
            
                <div className="flex items-center mx-auto pr-10">
                    <Search placeholder="input search text" enterButton size="large" />
                </div>
                <div>
                    <Button type="link" onClick={handleLogOut}>Logout</Button>
                </div>
            </div>
        </Header>
    )
}

export default PageHeader