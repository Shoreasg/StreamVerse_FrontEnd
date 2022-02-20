import React, { useEffect, useState, useContext } from "react";
import PostStatus from "../components/PostStatus";
import axios from "axios";
import { Layout, Image, Spin, Typography } from 'antd';
import ProfileFeed from "../components/ProfileFeed";
import { useParams } from "react-router";
import FollowersList from "../components/FollowerList";
import { AuthContext } from '../context/AuthContextProvider';
const { Content, Sider } = Layout;
const { Title } = Typography;



const Profile = () => {
    const [UserProfile, setUserProfile] = useState([]);
    const [UserFeed, setUserFeed] = useState([]);
    const [UpdatedFeed, setUpdatedFeed] = useState(false);
    const [Loading, setLoading] = useState(true);
    const { id } = useParams();
    const userSession = useContext(AuthContext)



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
        <Layout>
            <Sider width="40%" className="relative flex flex-col items-center mt-1">
                <FollowersList UserId={UserProfile.id} id={id} />
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
                    {Loading ? <Spin size="large" tip={"Loading..."} /> : <ProfileFeed ProfileFeed={UserFeed} setUpdatedFeed={setUpdatedFeed} />}
                </div>

            </Content>
        </Layout>
    )
}
export default Profile