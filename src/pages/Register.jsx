import React from "react";
import { Col, Layout, Row } from 'antd';
import LoginCard from "../components/LoginCard";
import { Link } from "react-router-dom";
const { Footer, Content } = Layout;


const Register = () => {
    return (
        <Layout>
            <Content style={{ height: "100vh" }}>
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }} >
                    <LoginCard />
                </Row>
            </Content>
            <Footer>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8} style={{ textAlign: "center" }}>StreamVerse©2022</Col>
                    <Col span={8} style={{ textAlign: "right" }}><Link to={"/faq"}>FAQ</Link></Col>
                </Row>

            </Footer>
        </Layout>

    )
}
export default Register