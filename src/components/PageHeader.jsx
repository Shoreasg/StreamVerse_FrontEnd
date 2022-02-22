import React, { useContext } from "react";
import { Button, Layout, Input } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/AuthContextProvider';
import Swal from 'sweetalert2'
const { Header } = Layout;
const { Search } = Input;

const PageHeader = () => {
    let navigate = useNavigate();
    const userSession = useContext(AuthContext)


    const handleLogOut = async () => {
        const LogOut = await axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/logout`, { withCredentials: true })
        if (LogOut.status === 200) {
            navigate(0)
        }
    }

    const handleDeleteAccount = async () => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this and you will be redirect to our register page",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6441a5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/DeleteOwnUser/${userSession.twitchId}`,
                    { withCredentials: true }).then((res) => {
                        if (res.status === 200) {
                            navigate(0)
                        }
                    })
            }
        })
    }
    return (
        <Header>
            {userSession.userName === "shoreasg" ?
                <div className="flex flex-row">
                    <div className="relative right-4">
                        <Button type="link" onClick={() => navigate("/home")}>Home</Button></div>
                    <div className="relative right-4">
                        <Button type="link" onClick={() => navigate(`/profile/${userSession.userName}`)}>Profile</Button>
                    </div>
                    <div className="relative right-4">
                        <Button type="link" onClick={() => navigate(`/dashboard/`)}>Dashboard</Button>
                    </div>
                    <div className="flex items-center mx-auto">
                        <Search placeholder="input search text" enterButton size="large" className="relative right-20" />
                    </div>
                    <div className="relative left-6">
                        <Button type="link" onClick={handleLogOut}>Logout</Button>
                    </div>
                </div> : <div className="flex flex-row">
                    <div className="relative right-4">
                        <Button type="link" onClick={() => navigate("/home")}>Home</Button></div>
                    <div className="relative right-4">
                        <Button type="link" onClick={() => navigate(`/profile/${userSession.userName}`)}>Profile</Button>
                    </div>
                    <div className="flex items-center mx-auto">
                        <Search placeholder="input search text" enterButton size="large" className="relative left-10" />
                    </div>
                    <div className="relative left-6">
                        <Button type="link" onClick={handleDeleteAccount}>Delete My Account</Button>
                    </div>
                    <div className="relative left-6">
                        <Button type="link" onClick={handleLogOut}>Logout</Button>
                    </div>
                </div>}
        </Header>
    )
}

export default PageHeader