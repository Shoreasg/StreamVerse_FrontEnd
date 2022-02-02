import React from "react";
import { Col, Row, Button, Layout, Input } from 'antd';
import logo from "../logo/Streamverselogo.png"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
const { Header } = Layout;
const { Search } = Input;

const PageHeader = () => {
    let navigate = useNavigate();


    const handleLogOut = () => {
        axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/logout`, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.status)
                    navigate(0)
                }
            })
    }
    return (
        <Header>
            <Row>
                <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} ><Link to="/home"><img src={logo} width={"90"} style={{ position: "absolute", top: -10, left: -40 }} alt="Logo" ></img></Link></Col>
                <Col xxl={{ span: 4, pull: 2 }} xl={{ span: 4, pull: 2 }} lg={{ span: 4, pull: 2 }} md={{ span: 4, pull: 2 }} sm={{ span: 4, pull: 2 }} xs={{ span: 4, pull: 2 }}>
                    <Button type="link" onClick={() => navigate("/profile")} style={{ top: 10 }}>Profile</Button>
                </Col>
                <Col xxl={{ span: 4, push: 2 }} xl={{ span: 4, push: 2 }} lg={{ span: 4, push: 2 }} md={{ span: 4, push: 3 }} sm={{ span: 4, push: 2 }} xs={{ span: 4, push: 3 }} ><Search placeholder="input search text" enterButton size="large" style={{ position: "absolute", top: 15 }} /></Col>
                <Col xxl={{ span: 4, push: 8 }} xl={{ span: 4, push: 9 }} lg={{ span: 4, push: 9 }} md={{ span: 4, push: 9 }} sm={{ span: 4, push: 10 }} xs={{ span: 4, push: 11 }} style={{ textAlign: "right" }}>
                    <Button type="link" onClick={handleLogOut} style={{ top: 10 }}>Logout</Button>
                </Col>

            </Row>
        </Header>
    )
}

export default PageHeader