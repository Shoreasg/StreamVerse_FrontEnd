import React, { useEffect, useState } from "react";
import { Layout, Divider, Spin } from 'antd';
import axios from "axios";
import FollowedLiveCard from "../components/FollowedLiveCard";
import UserVideoCard from "../components/UserVideoCard";
import UserClipsCard from "../components/UserClipsCard";
import PostStatus from "../components/PostStatus";
import NewsFeed from "../components/NewsFeed";
const { Content, Sider } = Layout;


const Home = () => {
    const [GetLiveChannels, setGetLiveChannels] = useState([]);
    const [GetVideo, setGetVideo] = useState([]);
    const [GetClips, setGetClips] = useState([]);
    const [Feed, setFeed] = useState([]);
    const [UpdatedFeed, setUpdatedFeed] = useState(false);
    const [Loading, setLoading] = useState(true);



    const getFeed = async () => {
        const Feed = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFeed`, { withCredentials: true })
        setFeed(Feed.data)
        setLoading(false)
    }



    const getFollowedChannels = async () => {
        const FollowedChannels = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowedChannels`, { withCredentials: true })
        setGetLiveChannels([...FollowedChannels.data.data])
    }

    const getUserVideos = async () => {
        const UserVideos = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserVideos`, { withCredentials: true })
        setGetVideo([...UserVideos.data.data])
    }

    const getUserClips = async () => {
        const UserClips = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserClips`, { withCredentials: true })
        setGetClips([...UserClips.data.data])
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
        <Layout >
            <Sider width={"20%"}>
                <h1 style={{ textAlign: "center" }}>Live Channels that you Followed</h1>
                <FollowedLiveCard liveChannels={GetLiveChannels} />
            </Sider>
            <Content className="flex flex-col items-center pt-10">
                <PostStatus setUpdatedFeed={setUpdatedFeed} Loading={Loading} />
                <h1>News Feed</h1>
                {Loading ? <Spin size="large" tip={"Loading..."} /> : <NewsFeed Feed={Feed} setUpdatedFeed={setUpdatedFeed} />}
            </Content>
            <Sider width={"20%"}>
                <h1 style={{ textAlign: "center" }}>Your Latest Highlights</h1>
                <UserVideoCard Videos={GetVideo} />
                <Divider />
                <h1 style={{ textAlign: "center" }}>Your Latest Clips</h1>
                <UserClipsCard Clips={GetClips} />
            </Sider>
        </Layout>
    )
}
export default Home