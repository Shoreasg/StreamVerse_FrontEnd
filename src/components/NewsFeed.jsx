import React from "react";
import { Card, Avatar, List,Comment, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import Linkify from 'linkify-react';
import moment from 'moment';


const NewsFeed = ({ Feed }) => {
    console.log(Feed)
    return (
        <List style={{ left: 180, width: 800 }}>
            <VirtualList
                data={Feed}
                height={400}
                itemHeight={300}
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
                             <Comment 
                         author={item.userName}
                         avatar={<Avatar src={item.profileImage}/>}
                         content={
                            <p>
                             <Linkify options={{target:'_blank'}}><br/>{item.status}</Linkify>
                            </p>
                          }
                          datetime={
                            <Tooltip title={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                              <span>{moment(item.createdAt).startOf().fromNow()}</span>
                            </Tooltip>
                          }/>
                        </Card>
                    </List.Item>
                )}

            </VirtualList>
        </List>)
}


export default NewsFeed