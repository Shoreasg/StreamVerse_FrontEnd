import React, { useEffect, useState } from "react";
import { Layout, Row, Divider } from 'antd';
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import axios from "axios";
import FollowedLiveCard from "../components/FollowedLiveCard";
import UserVideoCard from "../components/UserVideoCard";
import UserClipsCard from "../components/UserClipsCard";
import PostStatus from "../components/PostStatus";
import NewsFeed from "../components/NewsFeed";
const { Content, Sider } = Layout;


const Home = ({ userName, TwitchId }) => {
    const [FollowedLoading, setFollowedLoading] = useState(false);
    const [VideoLoading, setVideoLoading] = useState(false);
    const [ClipsLoading, setClipsLoading] = useState(false);
    const [GetLiveChannels, setGetLiveChannels] = useState([]);
    const [GetVideo, setGetVideo] = useState([]);
    const [GetClips, setGetClips] = useState([]);
    const [Feed, setFeed] = useState([]);

    const getFeed= () =>
    {
        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFeed`, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setFeed(res.data)
            })
    }


    const getFollowedChannels = () => {
        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowedChannels`, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setGetLiveChannels([...res.data.data])
                setFollowedLoading(false);
            }).catch(() => {
                setFollowedLoading(false);
            })
    }

    const getUserVideos = () => {
        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserVideos`, { withCredentials: true })
            .then((res) => {
                setGetVideo([...res.data.data])
                setVideoLoading(false);
            }).catch(() => {
                setVideoLoading(false);
            })
    }

    const getUserClips = () => {
        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserClips`, { withCredentials: true })
            .then((res) => {
                setGetClips([...res.data.data])
                setClipsLoading(false);
            }).catch(() => {
                setClipsLoading(false);
            })
    }

    const loadMoreData = () => {
        if (FollowedLoading) {
            return;
        }
        setFollowedLoading(true);
        getFollowedChannels()
    }

    const loadMoreVideoData = () => {
        if (VideoLoading) {
            return;
        }
        setVideoLoading(true);
        getUserVideos()
    }

    const loadMoreClipsData = () => {
        if (ClipsLoading) {
            return;
        }
        setClipsLoading(true);
        getUserClips()
    }

    useEffect(() => {
        loadMoreData()
        loadMoreVideoData()
        loadMoreClipsData()
        getFeed()
    }, []);

    console.log(Feed)

    return (
        <Layout style={{ height: "100vh" }}>
            <PageHeader />
            <Layout>
                <Sider width={"20%"}>
                    <h1 style={{ textAlign: "center" }}>Live Channels that you Followed</h1>
                    <FollowedLiveCard liveChannels={GetLiveChannels} loadMoreData={loadMoreData} />
                </Sider>
                <Content>
                    <Divider />
                    <Row justify="center" align="middle" >
                        <PostStatus userName={userName} TwitchId={TwitchId} />
                    </Row>
                    <Divider />
                    <NewsFeed Feed={Feed}/>
                </Content>
                <Sider width={"20%"}>
                    <h1 style={{ textAlign: "center" }}>Your Highlights</h1>
                    <UserVideoCard Videos={GetVideo} loadMoreVideoData={loadMoreVideoData} />
                    <Divider />
                    <h1 style={{ textAlign: "center" }}>Your Clips</h1>
                    <UserClipsCard Clips={GetClips} loadMoreClipsData={loadMoreClipsData} />

                </Sider>
            </Layout>
            <PageFooter />
        </Layout>

    )
}
export default Home