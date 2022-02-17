import { List, Card, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
const { Title } = Typography;

const FollowersList = ({ id }) => {
    const [Followers, setFollowers] = useState([]);
    const [Following, setFollowing] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const getFollowing = async () => {

            await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/getuser/${id}`, { withCredentials: true })
                .then((res) => {
                    res.data.forEach(async element => {
                        const GetFollowersList = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowers/${element.id}`, { withCredentials: true })
                        setFollowing(GetFollowersList.data.followings)
                        setFollowers(GetFollowersList.data.followers)
                        setLoading(false)
                    });

                })
        }
        getFollowing()
        setLoading(true)
    }, [id]);

    return (
        <>
            {Loading ? <Spin size="large" tip={"Loading..."} /> :
                <>
                    <List
                        grid={{ gutter: 8 }}
                        pagination={{ position: "bottom", total: Followers.length, pageSize: 4, simple: true }}
                        dataSource={Followers}
                        header={<Title>Followers</Title>}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Link to={`/profile/${item.display_name}`}>
                                    <Card
                                        cover={<img alt={item.title} src={item.profile_image_url} />}
                                        hoverable={true}
                                        style={{ width: 180, textAlign: "center" }}
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
                        pagination={{ position: "bottom", total: Following.length, pageSize: 4, simple: true }}
                        dataSource={Following}
                        header={<Title>Following</Title>}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Link to={`/profile/${item.display_name}`}>
                                    <Card
                                        cover={<img alt={item.title} src={item.profile_image_url} />}
                                        hoverable={true}
                                        style={{ width: 180, textAlign: "center" }}
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


export default FollowersList