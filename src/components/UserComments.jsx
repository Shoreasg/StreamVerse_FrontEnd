import { Card, Avatar, Comment, Tooltip, Badge } from 'antd';
import React, { useContext } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContextProvider';
import { toast } from 'react-toastify';
import Linkify from 'linkify-react';
import moment from 'moment';
import Swal from 'sweetalert2'
import axios from "axios";


const UserComments = ({ comment, setUpdatedFeed }) => {
    const userSession = useContext(AuthContext)

    const handleEdit = async (e) => {

        await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetComment/${e.currentTarget.id}`, { withCredentials: true })
            .then((res) => {
                Swal.fire({
                    title: "Edit your Comment!",
                    input: 'textarea',
                    inputValue: res.data.comment,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return "Comment Cannot be empty!"
                        }
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/EditComment/${res.data._id}`,
                            { comment: result.value }
                            , { withCredentials: true }).then((res) => {
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

        await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetComment/${e.currentTarget.id}`, { withCredentials: true })
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
                        await axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/DeleteComment/${res.data._id}`,
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
    const handleUpdateLULCount = async (e) => {
        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/LULComment/${e.currentTarget.id}`, { twitchId: userSession.twitchId }, { withCredentials: true })
        setUpdatedFeed(true)
    }
    const handleUpdateGOODCount = async (e) => {
        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/GOODComment/${e.currentTarget.id}`, { twitchId: userSession.twitchId }, { withCredentials: true })
        setUpdatedFeed(true)
    }
    const handleUpdateKAPPACount = async (e) => {
        await axios.put(`${process.env.REACT_APP_DEV_BACKEND_URL}/KAPPAComment/${e.currentTarget.id}`, { twitchId: userSession.twitchId }, { withCredentials: true })
        setUpdatedFeed(true)
    }
    const mapComments = comment.map((data) => {
        return (<>
            {userSession.followers.includes(data.twitchId) || userSession.twitchId === data.twitchId ? <Card
                className="w-full"

            >
                <Comment
                    actions={
                        userSession.twitchId === data.twitchId ?
                            [
                                <a onClick={handleUpdateLULCount} id={data._id}><Badge count={data.lul.length} size={"small"} offset={[0, 2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/425618/static/light/1.0"} /></Badge></a>,
                                <a onClick={handleUpdateGOODCount} id={data._id}><Badge count={data.good.length} size={"small"} offset={[0, 2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/64138/static/light/1.0"} /></Badge></a>,
                                <a onClick={handleUpdateKAPPACount} id={data._id}><Badge count={data.kappa.length} size={"small"} offset={[0, 2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/25/static/light/1.0"} /></Badge></a>,
                                <EditOutlined key="edit" onClick={handleEdit} id={data._id} />,
                                <DeleteOutlined key="delete" onClick={handleDelete} id={data._id} />,
                            ] : [
                                <a onClick={handleUpdateLULCount} id={data._id}><Badge count={data.lul.length} size={"small"} offset={[0, 2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/425618/static/light/1.0"} /></Badge></a>,
                                <a onClick={handleUpdateGOODCount} id={data._id}><Badge count={data.good.length} size={"small"} offset={[0, 2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/64138/static/light/1.0"} /></Badge></a>,
                                <a onClick={handleUpdateKAPPACount} id={data._id}><Badge count={data.kappa.length} size={"small"} offset={[0, 2]}><Avatar size={"small"} src={"https://static-cdn.jtvnw.net/emoticons/v2/25/static/light/1.0"} /></Badge></a>,
                            ]}
                    author={`${data.userName} commented`}
                    avatar={<Avatar src={data.profileImage} />}
                    content={
                        <p>
                            <Linkify options={{ target: '_blank' }}><br />{data.comment}</Linkify>
                        </p>
                    }
                    datetime={
                        data.createdAt === data.updatedAt ?
                            <Tooltip title={moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                                <span>{moment(data.createdAt).startOf().fromNow()}</span>
                            </Tooltip> :
                            <Tooltip title={moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
                                <span>{moment(data.updatedAt).startOf().fromNow()} (Edited)</span>
                            </Tooltip>
                    } />
            </Card> : ""}

        </>)
    })

    return (
        <>
            {mapComments}
        </>
    )
}


export default UserComments