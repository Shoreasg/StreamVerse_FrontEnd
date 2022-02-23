import React, { useEffect, useState } from "react";
import { Layout, Typography, Spin } from 'antd';
import UsersPostList from "../components/UsersPostList";
import axios from "axios";
import UserList from "../components/UserList";
const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const [GetAllFeed, setAllFeed] = useState([]);
    const [GetAllUser, setAllUser] = useState([]);
    const [UpdatedFeed, setUpdatedFeed] = useState(false);
    const [Loading, setLoading] = useState(true);



    useEffect(() => {
        const getFeed = async () => {
            const Feed = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetAllFeed`, { withCredentials: true })
            setAllFeed(Feed.data)
            setLoading(false)
        }
        const getUserList = async () => {
            const User = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/AllUser`, { withCredentials: true })
            setAllUser(User.data)
            setLoading(false)
        }
        getFeed()
        getUserList()
        setLoading(true)
    }, [UpdatedFeed]);

    return (
        <Layout style={{ height: "100vh" }}>
            <Content className="grid grid-flow-col">
                <div className="flex flex-col items-center ">
                    <Title level={2}>All Users Post</Title>
                    {Loading ? <Spin size="large" tip={"Loading..."} /> : <UsersPostList GetAllFeed={GetAllFeed} setUpdatedFeed={setUpdatedFeed} />}
                </div>
                <div className="flex flex-col items-center">
                    <Title level={2}>All Users</Title>
                    {Loading ? <Spin size="large" tip={"Loading..."} /> : <UserList GetAllUser={GetAllUser} setUpdatedFeed={setUpdatedFeed} />}
                </div>

            </Content>
        </Layout>
    )
}
export default Dashboard