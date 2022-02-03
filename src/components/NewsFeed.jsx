import React from "react";
import { Card, Avatar, List } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';

const { Meta } = Card;



const NewsFeed = ({ Feed }) => {
    console.log(Feed)
    return (
        <List style={{ left: 150, width: 800 }}>
            <VirtualList
                data={Feed}
                height={500}
                itemHeight={500}
                itemKey="id"
            >
                {item => (
                    <List.Item key={item.id}>
                        <Card style={{ width: "80%", height: 400, left: 100 }}
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src={item.profileImage}/>}
                                title={item.userName}
                                description={item.status}
                                style={{ width: 400, height: 300 }}
                            />
                        </Card>
                    </List.Item>
                )}

            </VirtualList>
        </List>)
}


export default NewsFeed