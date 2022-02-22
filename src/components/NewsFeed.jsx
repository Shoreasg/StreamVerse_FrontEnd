import React, { useContext } from "react";
import { AuthContext } from '../context/AuthContextProvider';
import { Card, Avatar, List, Comment, Tooltip, Empty, Badge, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import Linkify from 'linkify-react';
import moment from 'moment';
import Swal from 'sweetalert2'
import axios from "axios";
import UserComments from "./UserComments";

const NewsFeed = ({ Feed, setUpdatedFeed }) => {
    const userSession = useContext(AuthContext)
    const handleEdit = async (e) => {

        await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetPost/${e.currentTarget.id}`, { withCredentials: true })
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
    const handleDelete = async (e) => {

        await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetPost/${e.currentTarget.id}`, { withCredentials: true })
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
    const handleCreate = async (e) => {
        await Swal.fire({
            title: "Enter your Comment!",
            input: 'textarea',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Status Cannot be empty!"
                }
            }
        }).then(async (result) => {
            console.log(result)
            if (result.isConfirmed) {
                await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/CreateComment`,
                    { userName: userSession.userName, twitchId: userSession.twitchId, profileImage: userSession.profileImage, comment: result.value, statusID: e.target.id }, { withCredentials: true }).then((res) => {
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
        })
    }

    const handleUpdateLULCount = async (e) => {
        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/LUL/${e.currentTarget.id}`, { twitchId: userSession.twitchId }, { withCredentials: true })
        setUpdatedFeed(true)
    }
    const handleUpdateGOODCount = async (e) => {
        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/GOOD/${e.currentTarget.id}`, { twitchId: userSession.twitchId }, { withCredentials: true })
        setUpdatedFeed(true)
    }
    const handleUpdateKAPPACount = async (e) => {
        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/KAPPA/${e.currentTarget.id}`, { twitchId: userSession.twitchId }, { withCredentials: true })
        setUpdatedFeed(true)
    }

    return (
        <>
            {Feed.length !== 0 ? <List className="w-3/4"
                dataSource={Feed}
                renderItem={item => (
                    <List.Item key={item._id}>
                        <Card
                            className="w-full"

                        >
                            <Comment
                                actions={
                                    userSession.twitchId === item.twitchId ?
                                        [
                                            <span key="comment-basic-reply-to" onClick={handleCreate} id={item._id}>Comment</span>,
                                            <a onClick={handleUpdateLULCount} id={item._id}><Badge count={item.lul.length} size={"small"} offset={[0,2]}><Avatar  size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/425618/static/light/1.0"} /></Badge></a>,
                                            <a onClick={handleUpdateGOODCount} id={item._id}><Badge count={item.good.length} size={"small"} offset={[0,2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/64138/static/light/1.0"} /></Badge></a>,
                                            <a onClick={handleUpdateKAPPACount} id={item._id}><Badge count={item.kappa.length} size={"small"} offset={[0,2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/25/static/light/1.0"} /></Badge></a>,
                                            <EditOutlined key="edit" onClick={handleEdit} id={item._id} />,
                                            <DeleteOutlined key="delete" onClick={handleDelete} id={item._id} />,
                                      

                                        ] : [
                                            <span key="comment-basic-reply-to" onClick={handleCreate} id={item._id}>Comment</span>,
                                            <a onClick={handleUpdateLULCount} id={item._id}><Badge count={item.lul.length} size={"small"} offset={[0,2]}><Avatar  size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/425618/static/light/1.0"} /></Badge></a>,
                                            <a onClick={handleUpdateGOODCount} id={item._id}><Badge count={item.good.length} size={"small"} offset={[0,2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/64138/static/light/1.0"} /></Badge></a>,
                                            <a onClick={handleUpdateKAPPACount} id={item._id}><Badge count={item.kappa.length} size={"small"} offset={[0,2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/25/static/light/1.0"} /></Badge></a>,
                                        ]}
                                author={item.userName}
                                avatar={<Avatar src={item.profileImage} />}
                                content={
                                    <p>
                                        <Linkify options={{ target: '_blank' }}><br />{item.status}</Linkify>

                                    </p>
                                }
                                datetime={
                                    item.editedOn ?
                                        <Tooltip title={moment(item.editedOn).format('MMMM Do YYYY, h:mm:ss a')}>
                                            <span>{moment(item.editedOn).startOf().fromNow()} (Edited)</span>
                                        </Tooltip>
                                        : <Tooltip title={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                                            <span>{moment(item.createdAt).startOf().fromNow()}</span>
                                        </Tooltip>

                                } />

                            <UserComments comment={item.comment} setUpdatedFeed={setUpdatedFeed} />
                        </Card>

                    </List.Item>
                )}>



            </List> : <Empty />}

        </>)
}


export default NewsFeed