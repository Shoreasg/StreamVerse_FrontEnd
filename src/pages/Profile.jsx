import React, { useEffect, useState, useContext } from "react";
import PostStatus from "../components/PostStatus";
import axios from "axios";
import { Layout, Image, Spin, Typography, Empty } from 'antd';
import ProfileFeed from "../components/ProfileFeed";
import { useParams } from "react-router";
import FollowersList from "../components/FollowerList";
import { AuthContext } from '../context/AuthContextProvider';
const { Content, Sider } = Layout;
const { Title } = Typography;



const Profile = () => {
    const [UserProfile, setUserProfile] = useState([]);
    const [UpdatedFeed, setUpdatedFeed] = useState(false);
    const [Loading, setLoading] = useState(true);
    const { id } = useParams();
    const userSession = useContext(AuthContext)



    useEffect(() => {
        const getUserData = async () => {
            const UserData = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/getuser/${id}`, { withCredentials: true })
            setUserProfile(...UserData.data)
            setLoading(false)
        }

        getUserData()
        setLoading(true)
        setUpdatedFeed(false)
    }, [id, UpdatedFeed]);
    return (
        <>
            {UserProfile ? <Layout>
                <Sider width="40%" className="relative flex flex-col items-center mt-1">
                    <FollowersList id={id} />
                </Sider>
                <Content className="flex flex-col items-center ">
                    <Image
                        width={100}
                        src={UserProfile.profile_image_url}
                        preview={{ src: `${UserProfile.profile_image_url}` }} />
                    <Title level={2}>{UserProfile.display_name}</Title>
                    <div className="flex flex-col items-center w-3/4">
                        {userSession.twitchId === UserProfile.id ? <PostStatus setUpdatedFeed={setUpdatedFeed} Loading={Loading} /> : ""}

                        <h1>News Feed</h1>
                        <ProfileFeed UserProfile={UserProfile.id} setUpdatedFeed={setUpdatedFeed} UpdatedFeed={UpdatedFeed} />
                    </div>
                </Content>
            </Layout> : <Layout className="h-screen">
                <Sider width="40%" className="relative flex flex-col items-center mt-1">
                    <Empty />
                </Sider>
                <Content className="flex flex-col items-center ">
                    <Empty />
                </Content>
            </Layout>}

        </>
    )
}
export default Profile