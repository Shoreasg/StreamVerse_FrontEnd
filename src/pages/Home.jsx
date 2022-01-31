import React, { useEffect, useState } from "react";
import { Layout, Row, Input } from 'antd';
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import axios from "axios";
import FollowedLiveCard from "../components/FollowedLiveCard";
const { Content, Sider } = Layout;
const { TextArea } = Input;


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [getLiveChannels, setgetLiveChannels] = useState([]);


    const getFollowedChannels = async () => {
        await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowedChannels`, { withCredentials: true })
            .then((res) => {
                setgetLiveChannels([...res.data.data])
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            })
    }

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        getFollowedChannels()
    }

    useEffect(() => {
        loadMoreData()
    }, []);

    console.log(getLiveChannels)

    return (
        <Layout style={{ height: "100vh" }}>
            <PageHeader />
            <Layout>
                <Sider width={"20%"}>
                    <FollowedLiveCard liveChannels={getLiveChannels} loadMoreData={loadMoreData} />
                </Sider>
                <Content>
                    <Row>
                        <TextArea showCount autoSize={{ minRows: 5, maxRows: 8 }} style={{ width: "100%" }} placeholder="What's up!" />
                    </Row>
                </Content>
                <Sider style={{ border: '1px solid rgba(38, 38, 38, 1)' }} width={"20%"}>Sider</Sider>
            </Layout>
            <PageFooter />
        </Layout>

    )
}
export default Home