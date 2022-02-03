import { List, Card, Divider } from "antd";
import React from "react";
import VirtualList from 'rc-virtual-list';
const { Meta } = Card;
const UserVideoCard = ({ Videos }) => {
    return (
        <List>
            <VirtualList
                data={Videos}
                height={350}
                itemHeight={47}
                itemKey="id"
            >
                {item => (
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
            </VirtualList>
        </List>
    );
};

export default UserVideoCard