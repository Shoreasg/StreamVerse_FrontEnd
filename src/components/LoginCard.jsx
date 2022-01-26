import React from "react";
import { Typography, Card } from 'antd';
import MyTwitchLoginButton from "./TwitchButton";
const { Title } = Typography;


const LoginCard = () => {
    return(
        <Card style={{width: 300,height: 300,marginTop: -200}}>
            <Title style={{textAlign:"center"}}>Welcome to Streamverse</Title>
            <Title level={4} style={{textAlign:"center"}}>Login/Register using your twitch account</Title>
            <MyTwitchLoginButton/>
        </Card>
    )
}

export default LoginCard