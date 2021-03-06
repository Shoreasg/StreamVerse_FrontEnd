import React from "react";
import { Typography, Card } from 'antd';
import MyTwitchLoginButton from "./TwitchButton";
const { Title } = Typography;

const handleLogin = () => {
    window.open(`${process.env.REACT_APP_DEV_BACKEND_URL}/auth/twitch`, "_self")
}


const LoginCard = () => {
    return (
        <Card style={{ width: 300, height: 300 }}>
            <Title style={{ textAlign: "center" }}>Welcome to Streamverse</Title>
            <Title level={4} style={{ textAlign: "center" }}>Login/Register using your twitch account</Title>
            <MyTwitchLoginButton onClick={handleLogin} />
        </Card>
    )
}

export default LoginCard