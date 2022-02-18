import React from "react";
import { Card, Avatar, List, Comment, Tooltip, Typography, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import VirtualList from 'rc-virtual-list';
import Linkify from 'linkify-react';
import moment from 'moment';
import Swal from 'sweetalert2'
import axios from "axios";
const { Paragraph } = Typography;


const UsersPostList = ({ GetAllFeed, setUpdatedFeed }) => {
    console.log(GetAllFeed)
    const handleDelete = (e) => {

        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetPost/${e.currentTarget.id}`, { withCredentials: true })
            .then((res) => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#6441a5',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        console.log(result.value)
                        await axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/DeletePost/${res.data._id}`,
                            { withCredentials: true }).then((res) => {
                                toast.success(res.data, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                });
                                setUpdatedFeed(true)
                            })
                    }
                }).catch((err) => {
                    if (err) {
                        toast.error(err.response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                        });
                    }
                })


            })
    }
    return (
        <>
        {GetAllFeed.length !==0 ?   <List style={{ width: "50%" }}>
                <VirtualList
                    data={GetAllFeed}
                    height={810}
                    itemHeight={10}
                    itemKey="id"
                >
                    {item => (
                        <List.Item key={item._id}>
                            <Card
                                className="w-full"
                                actions={
                                    [
                                        <DeleteOutlined key="delete" onClick={handleDelete} id={item._id} />
                                    ]}

                            >

                                <Comment
                                    actions={
                                        [
                                            <Paragraph copyable={true} italic={true} type={"secondary"}>Post ID: {item._id}</Paragraph>
                                        ]}
                                    author={item.userName}
                                    avatar={<Avatar src={item.profileImage} />}
                                    content={
                                        <p>
                                            <Linkify options={{ target: '_blank' }}><br />{item.status}</Linkify>
                                        </p>
                                    }
                                    datetime={
                                        item.createdAt === item.updatedAt ?
                                            <>

                                                <Tooltip title={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                                                    <span>{moment(item.createdAt).startOf().fromNow()}</span>

                                                </Tooltip>

                                            </>
                                            :
                                            <>
                                                <span> Post ID: {item._id}</span>
                                                <Tooltip title={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                                                    <span> {moment(item.updatedAt).startOf().fromNow()} (Edited)</span>

                                                </Tooltip>
                                            </>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}

                </VirtualList>
            </List>:<Empty/>}
          
        </>)
};


export default UsersPostList