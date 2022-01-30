import React from "react";
import { Layout, Row, Input } from 'antd';
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
const { Content, Sider } = Layout;
const { TextArea } = Input;




const Home = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            <PageHeader />
            <Layout>
                <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={"20%"}>Sider</Sider>
                <Content>
                    <Row>
                        <TextArea showCount autoSize={{ minRows: 5, maxRows: 8 }} style={{  width: "60%", position: "absolute", top: 62 }} placeholder="What's up!" />
                    </Row>
                </Content>
                <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={"20%"}>Sider</Sider>
            </Layout>
            <PageFooter />
        </Layout>

    )
}
export default Home