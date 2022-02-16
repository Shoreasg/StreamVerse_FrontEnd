import React, { useEffect, useState } from "react";
import PageFooter from "../components/PageFooter";
import axios from "axios";
import { Layout, Image, Spin, Typography } from 'antd';
import ProfileFeed from "../components/ProfileFeed";
import { useParams } from "react-router";
import OtherFollowersList from "../components/OtherFollowersList";
const { Content, Sider } = Layout;
const { Title } = Typography;



const OtherUserProfile = () => {
    const [UserProfile, setUserProfile] = useState([]);
    const [UserFeed, setUserFeed] = useState([]);
    const [Loading, setLoading] = useState(true);
    const { id } = useParams();

    const getUserData = async () => {
        const UserData = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/getuser/${id}`, { withCredentials: true })
        setUserProfile(...UserData.data)
    }

    const getProfileFeed = async () => {

        const ProfileFeed = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetUserFeed/${UserProfile.id}`, { withCredentials: true })
        setUserFeed(ProfileFeed.data)
        setLoading(false)
    }


    useEffect(() => {
        getUserData()
        getProfileFeed()
    }, [UserProfile.id,id]);
    return (
        <Layout style={{ height: "100vh" }}>
            <Layout>
                <Sider width="40%" className="relative flex flex-col items-center mt-1">
                    <OtherFollowersList UserId={UserProfile.id} id={id}/>
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
                        <h1>News Feed</h1>
                        {Loading ? <Spin size="large" tip={"Loading..."} /> : <ProfileFeed  ProfileFeed={UserFeed}/>}
                    </div>

                </Content>
            </Layout>
            <PageFooter />
        </Layout>

    )
}
export default OtherUserProfile