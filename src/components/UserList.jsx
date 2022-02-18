import React,{useContext} from "react";
import { Card, Avatar, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import VirtualList from 'rc-virtual-list';
import { AuthContext } from '../context/AuthContextProvider';
import moment from 'moment';
import Swal from 'sweetalert2'
import axios from "axios";
const { Meta } = Card;


const UserList = ({ GetAllUser, setUpdatedFeed }) => {
    const userSession = useContext(AuthContext)
    console.log(GetAllUser)
    console.log(userSession.twitchId)
    const handleDelete = (e) => {

        axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/AllUser/${e.currentTarget.id}`, { withCredentials: true })
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
                        await axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/DeleteUser/${res.data.twitchId}`,
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

        <List style={{ width: "50%" }}>
            <VirtualList
                data={GetAllUser}
                height={810}
                itemHeight={10}
                itemKey="id"
            >
                {item => (
                    <List.Item key={item._id}>
                        <Card
                            className="w-full"
                            actions={
                                userSession.twitchId !== item.twitchId ?
                                [
                                    
                                    <DeleteOutlined key="delete" onClick={handleDelete} id={item.twitchId} />
                                ]:""}

                        >
                            <Meta
                                avatar={<Avatar src={item.profileImage}/>}
                                title={item.userName}
                                description={`Created on: ${moment(item.createdAt).format('MMMM Do YYYY')}`}
                            />



                        </Card>
                    </List.Item>
                )}

            </VirtualList>
        </List>)
};


export default UserList