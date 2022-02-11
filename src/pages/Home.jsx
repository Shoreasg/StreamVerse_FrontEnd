import React, { useEffect, useState } from "react";
import { Layout,Divider, Spin } from 'antd';
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import axios from "axios";
import FollowedLiveCard from "../components/FollowedLiveCard";
import UserVideoCard from "../components/UserVideoCard";
import UserClipsCard from "../components/UserClipsCard";
import PostStatus from "../components/PostStatus";
import NewsFeed from "../components/NewsFeed";
const { Content, Sider } = Layout;


const Home = ({ userName, TwitchId, profileImage }) => {
    const [GetLiveChannels, setGetLiveChannels] = useState([]);
    const [GetVideo, setGetVideo] = useState([]);
    const [GetClips, setGetClips] = useState([]);
    const [Feed, setFeed] = useState([]);
    const [UpdatedFeed, setUpdatedFeed] = useState(false);
    const [Loading, setLoading] = useState(true);



    const getFeed = async () => {

        await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFeed`, { withCredentials: true })
            .then((res) => {
                setFeed(res.data)
                setLoading(false)
            })
    }


    const getFollowedChannels = () => {
        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowedChannels`, { withCredentials: true })
            .then((res) => {
                setGetLiveChannels([...res.data.data])
            })
    }

    const getUserVideos = () => {
        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserVideos`, { withCredentials: true })
            .then((res) => {
                setGetVideo([...res.data.data])
            })
    }

    const getUserClips = () => {
        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserClips`, { withCredentials: true })
            .then((res) => {
                setGetClips([...res.data.data])
            })
    }


    useEffect(() => {
        getFollowedChannels()
        getUserVideos()
        getUserClips()
        getFeed()
        setUpdatedFeed(false)
        setLoading(true)
    }, [UpdatedFeed]);

    return (
        <Layout className="w-screen">
            <PageHeader />
            <Layout >
                <Sider width={"20%"}>
                    <h1 style={{ textAlign: "center" }}>Live Channels that you Followed</h1>
                    <FollowedLiveCard liveChannels={GetLiveChannels}  />
                </Sider>
                <Content className="flex flex-col items-center pt-10">
               <PostStatus userName={userName} TwitchId={TwitchId} profileImage={profileImage} setUpdatedFeed={setUpdatedFeed} Loading={Loading}/>
                    <h1>News Feed</h1>
                    {Loading ? <Spin size="large" tip={"Loading..."}/> : <NewsFeed Feed={Feed} setUpdatedFeed={setUpdatedFeed} TwitchId={TwitchId} />}
                </Content>
                <Sider width={"20%"}>
                    <h1 style={{ textAlign: "center" }}>Your Latest Highlights</h1>
                    <UserVideoCard Videos={GetVideo} />
                    <Divider />
                    <h1 style={{ textAlign: "center" }}>Your Latest Clips</h1>
                    <UserClipsCard Clips={GetClips} />
                </Sider>
            </Layout>
            <PageFooter />
        </Layout>

    )
}
export default Home