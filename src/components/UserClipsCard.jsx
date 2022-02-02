import { List, Card, Skeleton, Divider } from "antd";
import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
const { Meta } = Card;
const UserClipsCard = ({Clips,loadMoreClipsData}) => {
    return (
        <div
            id="scrollableDiv"
            style={{
                height: "47%",
                overflow: 'auto'
            }}
        >
            <InfiniteScroll
                dataLength={Clips.length}
                next={loadMoreClipsData}
                hasMore={Clips.length > 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain><h1>End of your Clips</h1></Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={Clips}
                    renderItem={item => (
                        <a href={item.url}>
                            <List.Item key={item.id}>
                                <Card style={{ width: "100%" }}
                                    cover={<img alt={item.title} src={item.thumbnail_url.replace('%{width}', '600').replace('%{height}', '600')} />}
                                >
                                    <Meta
                                        title={item.title}
                                        description={`ViewCount:${item.view_count}`} />
                                </Card>
                            </List.Item>
                            <Divider />
                        </a>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default UserClipsCard