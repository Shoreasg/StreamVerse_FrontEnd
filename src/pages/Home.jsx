import React from "react";
import { Layout, Col, Row } from 'antd';

const { Footer, Content, Header, Sider } = Layout;



const Home = () => {
    return (
        <Layout>
            <Header>
                <Row>
                    <Col span={8}>logo be here</Col>
                    <Col span={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>search bar goes here</Col>
                    <Col span={8} style={{ textAlign: "right" }}>Logout</Col>
                </Row>
            </Header>
            <Layout>
                <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={200}>Sider</Sider>
                <Content style={{ height: "100vh" }}>
                    Hello
                </Content>
                {/* <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={400}>Sider</Sider> */}
            </Layout>
            <Footer style={{ textAlign: "center" }}>
                StreamVerse©2022
            </Footer>
        </Layout>

    )
}
export default Home