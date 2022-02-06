import React from "react";
import { Card, Avatar, List, Comment, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import VirtualList from 'rc-virtual-list';
import Linkify from 'linkify-react';
import moment from 'moment';
import Swal from 'sweetalert2'
import axios from "axios";

const NewsFeed = ({ Feed, setUpdatedFeed, TwitchId }) => {

    const handleEdit = (e) => {

        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetPost/${e.currentTarget.id}`, { withCredentials: true })
            .then((res) => {
                Swal.fire({
                    title: "Edit your Status!",
                    input: 'textarea',
                    inputValue: res.data.status,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return "Status Cannot be empty!"
                        }
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/EditPost/${res.data._id}`,
                            { status: result.value }
                            , { withCredentials: true }).then((res) => {
                                console.log(res)
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
        <List style={{ left: 180, width: 800 }}>
            <VirtualList
                data={Feed}
                height={400}
                itemHeight={300}
                itemKey="id"
            >
                {item => (
                    <List.Item key={item._id}>
                        <Card style={{ width: 800, textAlign: "left" }}
                            actions={
                                TwitchId === item.twitchId ?
                                    [
                                        <EditOutlined key="edit" onClick={handleEdit} id={item._id} />,
                                        <DeleteOutlined key="delete" onClick={handleDelete} id={item._id}/>,
                                    ] : ""}
                        >
                            <Comment
                                author={item.userName}
                                avatar={<Avatar src={item.profileImage} />}
                                content={
                                    <p>
                                        <Linkify options={{ target: '_blank' }}><br />{item.status}</Linkify>
                                    </p>
                                }
                                datetime={
                                    item.createdAt === item.updatedAt ?
                                        <Tooltip title={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                                            <span>{moment(item.createdAt).startOf().fromNow()}</span>
                                        </Tooltip> :
                                        <Tooltip title={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                                            <span>{moment(item.updatedAt).startOf().fromNow()} (Edited)</span>
                                        </Tooltip>
                                } />
                        </Card>
                    </List.Item>
                )}

            </VirtualList>
        </List>)
}


export default NewsFeed