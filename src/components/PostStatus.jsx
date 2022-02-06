import React from "react";
import { toast } from 'react-toastify';
import { Button, Input, Form, Card, Comment, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
const { TextArea } = Input;



const PostStatus = ({ userName, TwitchId, setUpdatedFeed, profileImage }) => {
    const [form] = Form.useForm();

    const onPostStatus = (data) => {

        axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/postStatus`, { userName: userName, twitchId: TwitchId, profileImage: profileImage, ...data }, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                toast.success('Post Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatedFeed(true)
            }
        })
            .catch((err) => {
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
        form.resetFields()
    }

    return (
        <Form onFinish={onPostStatus} form={form} autoComplete="off" style={{ width: "50%" }}>
            <Form.Item
                name="status"
                rules={[{ required: true, message: "Status cannot be empty" }]}>
                <Card
                    actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" />,
                    ]}
                >
                    <Comment
                        avatar={<Avatar src={profileImage} alt={userName} />}
                        content={
                            <TextArea

                                showCount
                                autoSize={{ minRows: 5, maxRows: 6 }}
                                maxLength={280}
                                placeholder="What's up!"
                                bordered={false} />
                        } />


                </Card>


            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" style={{ left: "87%" }}>
                    Submit
                </Button>
            </Form.Item>

        </Form>

    )
}

export default PostStatus