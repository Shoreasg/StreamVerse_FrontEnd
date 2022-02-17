import React, { useEffect, useState } from "react";
import PostStatus from "../components/PostStatus";
import PageFooter from "../components/PageFooter";
import axios from "axios";
import { Layout, Image, Spin, Typography } from 'antd';
import ProfileFeed from "../components/ProfileFeed";
import { useParams } from "react-router";
import FollowersList from "../components/FollowerList";
const { Content, Sider } = Layout;
const { Title } = Typography;



const Profile = ({ userName, TwitchId, profileImage }) => {
    const [UserProfile, setUserProfile] = useState([]);
    const [UserFeed, setUserFeed] = useState([]);
    const [UpdatedFeed, setUpdatedFeed] = useState(false);
    const [Loading, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        const getUserData = async () => {
            const UserData = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/getuser/${id}`, { withCredentials: true })
            setUserProfile(...UserData.data)
        }
        const getProfileFeed = async () => {

            const ProfileFeed = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserFeed/${UserProfile.id}`, { withCredentials: true })
            setUserFeed(ProfileFeed.data)
            setLoading(false)
        }

        getUserData()
        getProfileFeed()
        setLoading(true)
        setUpdatedFeed(false)
    }, [UserProfile.id, id, UpdatedFeed]);
    return (
        <Layout style={{ height: "100vh" }}>
            <Layout>
                <Sider width="40%" className="relative flex flex-col items-center mt-1">
                    <FollowersList UserId={UserProfile.id} id={id} />
                </Sider>
                <Content className="flex flex-col items-center ">
                    <div className="flex flex-col items-center ">
                        <Image
                            width={100}
                            src={UserProfile.profile_image_url}
                            preview={{ src: `${UserProfile.profile_image_url}` }} />
                        <Title level={2}>{UserProfile.display_name}</Title>
                    </div>
                    <div className="flex flex-col items-center w-3/4 h-2">
                        {TwitchId === UserProfile.id ? <PostStatus userName={userName} TwitchId={TwitchId} profileImage={profileImage} setUpdatedFeed={setUpdatedFeed} Loading={Loading} /> : ""}

                        <h1>News Feed</h1>
                        {Loading ? <Spin size="large" tip={"Loading..."} /> : <ProfileFeed ProfileFeed={UserFeed} TwitchId={TwitchId} setUpdatedProfileFeed={setUpdatedFeed} />}
                    </div>

                </Content>
            </Layout>
            <PageFooter />
        </Layout>

    )
}
export default Profile