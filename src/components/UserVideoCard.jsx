import { List, Card } from "antd";
import React from "react";
import VirtualList from 'rc-virtual-list';
const UserVideoCard = ({ Videos }) => {
    return (
        <List>
            {Videos.length !== 0 ?
                <VirtualList
                    data={Videos}
                    height={350}
                    itemHeight={10}
                    itemKey="id"
                >

                    {item => (
                        <List.Item key={item._id}>
                            <Card style={{ width: "100%" }}
                                cover={<img alt={item.title} src={item.thumbnail_url.replace('%{width}', '600').replace('%{height}', '600')} />}
                            >
                                <a href={item.url} target="_blank" rel="noreferrer">
                                    <List.Item.Meta
                                        title={item.title}
                                        description={`ViewCount:${item.view_count}`} />
                                </a>
                            </Card>
                        </List.Item>
                    )}
                </VirtualList> : ""}
        </List>
    );
};

export default UserVideoCard