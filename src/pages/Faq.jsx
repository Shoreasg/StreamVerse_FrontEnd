import React from "react";
import { Col, Layout, Row,Typography} from 'antd';
import { Link } from "react-router-dom";
import FaqCard from "../components/FaqCard";
const { Footer, Content } = Layout;
const { Title } = Typography;


const Faq = () => {
    return (
        <Layout>
            <Title type="flex" justify="center" align="middle" style={{marginTop: 20, marginBottom: -130}}>FAQ</Title>
            <Content style={{ height: "100vh" }}>
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }} >
                    <FaqCard />
                </Row>
            </Content>
            <Footer>
                <Row>
                    <Col span={8} style={{ textAlign: "left" }}><Link to={"/"}>Back</Link></Col>
                    <Col span={8} style={{ textAlign: "center" }}>StreamVerse©2022</Col>
                    <Col span={8}> </Col>
                </Row>

            </Footer>
        </Layout>

    )
}
export default Faq