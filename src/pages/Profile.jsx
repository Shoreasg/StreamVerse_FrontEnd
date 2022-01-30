import React from "react";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import { Layout } from 'antd';
const { Content, Sider } = Layout;



const Profile = () => {
    return (
        <Layout style={{ height: "100vh" }}>
        <PageHeader />
        <Layout>
            <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={"20%"}>Sider</Sider>
            <Content>
                Profile page
            </Content>
            <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={"20%"}>Sider</Sider>
        </Layout>
        <PageFooter />
    </Layout>
    )
}
export default Profile