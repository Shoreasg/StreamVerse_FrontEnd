import { List, Card } from "antd";
import React from "react";
import VirtualList from 'rc-virtual-list';
const UserClipsCard = ({ Clips }) => {
    return (
        <List>
            {Clips.length !== 0 ?
                <VirtualList
                    data={Clips}
                    height={380}
                    itemHeight={10}
                    itemKey="id"
                >
                    {item => (
                        <List.Item key={item._id}>
                            <a href={item.url} target="_blank" rel="noreferrer">
                                <Card style={{ width: "100%" }}
                                    cover={<img alt={item.title} src={item.thumbnail_url.replace('%{width}', '600').replace('%{height}', '600')} />}
                                >
                                    <List.Item.Meta
                                        title={item.title}
                                        description={`ViewCount:${item.view_count}`} />

                                </Card>
                            </a>
                        </List.Item>
                    )}
                </VirtualList> : ""}
        </List>
    );
};


export default UserClipsCard