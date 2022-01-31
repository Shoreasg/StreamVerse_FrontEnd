import { List, Avatar, Skeleton, Divider } from "antd";
import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


const FollowedLiveCard = (props) => {
    return (
        <div
            id="scrollableDiv"
            style={{
                height: "95%",
                overflow: 'auto'
            }}
        >
            <InfiniteScroll
                dataLength={props.liveChannels.length}
                next={props.loadMoreData}
                hasMore={props.liveChannels.length > 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain><h1>End of Live Channels that you followed</h1></Divider>}
                scrollableTarget="scrollableDiv"
            >

                <List
                    dataSource={props.liveChannels}
                    renderItem={item => (
                        <a href={`https://www.twitch.tv/${item.user_login}`}>
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.thumbnail_url.replace('{width}', '70').replace('{height}', '70')} />}
                                    title={item.user_name}
                                    description={item.game_name}
                                />
                                <div>Viewers {item.viewer_count}</div>
                            </List.Item>
                            <Divider />
                        </a>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default FollowedLiveCard