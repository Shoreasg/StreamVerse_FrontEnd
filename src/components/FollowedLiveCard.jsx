import { List, Avatar, Card } from "antd";
import React from "react";
import VirtualList from 'rc-virtual-list';


const FollowedLiveCard = ({ liveChannels }) => {
    return (

        <List>
            <VirtualList
                data={liveChannels}
                height={810}
                itemHeight={10}
                itemKey="id"
            >
                {item => (
                    <Card hoverable={true} style={{ height: 100 }}>
                        <a href={`https://www.twitch.tv/${item.user_login}`}>
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.thumbnail_url.replace('{width}', '70').replace('{height}', '70')} />}
                                    title={item.user_name}
                                    description={<p style={{ fontSize: "12px", whiteSpace: 'pre-wrap' }}>{item.game_name}</p>}
                                />
                                <div style={{ fontSize: "12px" }}>Viewers {item.viewer_count}</div>
                            </List.Item>
                        </a>
                    </Card>
                )}
            </VirtualList>
        </List>
    );
};


export default FollowedLiveCard