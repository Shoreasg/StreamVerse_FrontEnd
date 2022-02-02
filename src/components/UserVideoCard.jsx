import { List, Card, Skeleton, Divider } from "antd";
import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
const { Meta } = Card;
const UserVideoCard = ({Videos,loadMoreVideoData}) => {
    return (
        <div
            id="scrollableDiv"
            style={{
                height: "40%",
                overflow: 'auto'
            }}
        >
            <InfiniteScroll
                dataLength={Videos.length}
                next={loadMoreVideoData}
                hasMore={Videos.length > 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain><h1>End of your Highlights</h1></Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={Videos}
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

export default UserVideoCard