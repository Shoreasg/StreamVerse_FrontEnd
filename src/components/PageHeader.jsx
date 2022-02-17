import React from "react";
import { Button, Layout, Input } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom"
const { Header } = Layout;
const { Search } = Input;

const PageHeader = ({ userName }) => {
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
                <div className="relative right-4">
                    <Button type="link" onClick={() => navigate("/home")}>Home</Button></div>
                <div className="relative right-4">
                    <Button type="link" onClick={() => navigate(`/profile/${userName}`)}>Profile</Button>
                </div>

                <div className="flex items-center mx-auto">
                    <Search placeholder="input search text" enterButton size="large" className="relative right-3" />
                </div>
                <div className="relative left-6">
                    <Button type="link" onClick={handleLogOut}>Logout</Button>
                </div>
            </div>
        </Header>
    )
}

export default PageHeader