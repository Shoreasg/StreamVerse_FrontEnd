import React from "react";
import { Card, Avatar, List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import Linkify from 'linkify-react';

const { Meta } = Card;



const NewsFeed = ({ Feed }) => {
    console.log(Feed)
    return (
        <List style={{ left: 150, width: 800 }}>
            <VirtualList
                data={Feed}
                height={450}
                itemHeight={100}
                itemKey="id"
            >
                {item => (
                    <List.Item key={item.id}>
                        <Card style={{width: 800,textAlign: "left"}}
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src={item.profileImage}/>}
                                title={item.userName}
                                
                            />
                          <Linkify options={{target:'_blank'}}><br/>{item.status}</Linkify>
                        </Card>
                    </List.Item>
                )}

            </VirtualList>
        </List>)
}


export default NewsFeed