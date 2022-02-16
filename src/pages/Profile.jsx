import React, { useEffect, useState } from "react";
import PageFooter from "../components/PageFooter";
import PostStatus from "../components/PostStatus";
import axios from "axios";
import { Layout, Image, Spin, Typography } from 'antd';
import ProfileFeed from "../components/ProfileFeed";
import FollwersList from "../components/FollwersList";
const { Content,Sider } = Layout;
const { Title } = Typography;



const Profile = ({ userName, TwitchId, profileImage }) => {
    const [UserFeed, setUserFeed] = useState([]);
    const [UpdatedFeed, setUpdatedFeed] = useState(false);
    const [Loading, setLoading] = useState(true);


    const getProfileFeed = async () => {

       const ProfileFeed = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserFeed`, { withCredentials: true })        
                setUserFeed(ProfileFeed.data)
                setLoading(false)
    }

 
    useEffect(() => {
        getProfileFeed()
        setUpdatedFeed(false)
        setLoading(true)
    }, [UpdatedFeed]);

    return (
        <Layout style={{ height: "100vh" }}>
            <Layout>
                <Sider width="40%" className="relative flex flex-col items-center mt-1">
                    <FollwersList/>
                </Sider>
            <Content className="flex flex-col items-center ">
                <div className="flex flex-col items-center ">
                    <Image
                        width={100}
                        src={profileImage}
                        preview={{ src: `${profileImage}` }} />
                    <Title level={2}>{userName}</Title>
                </div>
                <div className="flex flex-col items-center w-3/4 h-2">
                    <PostStatus userName={userName} TwitchId={TwitchId} profileImage={profileImage} setUpdatedFeed={setUpdatedFeed} Loading={Loading} />
                    <h1>News Feed</h1>
                    {Loading ? <Spin size="large" tip={"Loading..."} /> : <ProfileFeed ProfileFeed={UserFeed} setUpdatedProfileFeed={setUpdatedFeed} TwitchId={TwitchId} />}
                </div>

            </Content>
            </Layout>
            <PageFooter />
        </Layout>

    )
}
export default Profile