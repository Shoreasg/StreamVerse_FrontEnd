import React from "react";
import { Layout, Col, Row, Input } from 'antd';
import logo from "../logo/Streamverselogo.png"
const { Footer, Content, Header, Sider } = Layout;
const { Search, TextArea } = Input;




const Home = () => {
    return (
        <Layout>
            <Header>
                <Row>
                    <Col xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 8 }} ><img src={logo} width={"90"} style={{ position: "absolute", top: -10, left: -30 }} alt="Logo"></img></Col>
                    <Col xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 8 }} ><Search placeholder="input search text" enterButton style={{ position: "absolute", top: 20 }} /></Col>
                    <Col xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 8 }} style={{ textAlign: "right" }}>Logout</Col>
                </Row>
            </Header>
            <Layout>
                <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={"20%"}>Sider</Sider>
                <Content style={{ height: "100vh" }}>
                    <Row justify="space-around" align="middle">
                        test
                        <TextArea showCount maxLength={100} style={{ height: 120, width: "50%",  position: "absolute", top: 150, resize: "none" }} align="middle"/>
                    </Row>
                </Content>
                <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={"15%"}>Sider</Sider>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
                StreamVerse©2022
            </Footer>
        </Layout>

    )
}
export default Home