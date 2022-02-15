import { List, Card, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
const { Title } = Typography;

const FollwersList = () => {
    const [Followers, setFollowers] = useState([]);
    const [Following, setFollowing] = useState([]);
    const [Loading, setLoading] = useState(true);
    const getFollowing = async () => {
        const GetFollowersList = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowers`, { withCredentials: true })
        setFollowing(GetFollowersList.data.followings)
    }

    const getFollowers = async () => {
        const GetFollowersList = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowers`, { withCredentials: true })
        setFollowers(GetFollowersList.data.followers)
        setLoading(false)
    }



    useEffect(() => {
        getFollowing()
        getFollowers()
        setLoading(true)
    }, []);

    return (
        <>
            {Loading ? <Spin size="large" tip={"Loading..."} /> :
                <>
                    <List
                        grid={{ gutter: 8 }}
                        pagination={{ position: "", total: Followers.length, pageSize: 5, simple: true }}
                        dataSource={Followers}
                        header={<Title>Followers</Title>}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Link to={`/profile/${item.display_name}`}>
                                    <Card
                                        cover={<img alt={item.title} src={item.profile_image_url} />}
                                        hoverable={true}
                                        style={{ width: 150 }}
                                    >
                                        <List.Item.Meta
                                            title={item.display_name} />
                                    </Card>
                                </Link>
                            </List.Item>
                        )}>
                    </List>
                    <List
                        grid={{ gutter: 8 }}
                        pagination={{ position: "", total: Followers.length, pageSize: 5, simple: true }}
                        dataSource={Following}
                        header={<Title>Following</Title>}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Link to={`/profile/${item.display_name}`}>
                                    <Card
                                        cover={<img alt={item.title} src={item.profile_image_url} />}
                                        hoverable={true}
                                        style={{ width: 150 }}
                                    >
                                        <List.Item.Meta
                                            title={item.display_name} />
                                    </Card>
                                </Link>

                            </List.Item>
                        )}>
                    </List>


                </>}
        </>
    );
};


export default FollwersList