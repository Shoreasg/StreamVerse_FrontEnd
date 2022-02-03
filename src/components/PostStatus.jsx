import React from "react";
import { toast } from 'react-toastify';
import { Button, Input, Form } from 'antd';
import axios from "axios";
const { TextArea } = Input;



const PostStatus = ({ userName, TwitchId, setnewPost, profileImage }) => {
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
                setnewPost(data)
            }
        })
            .catch((err) => {
                if (err) {
                    toast(err.response.data.message, {
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
                rules={[{ required: true }]}>
                <TextArea

                    showCount
                    autoSize={{ minRows: 5, maxRows: 8 }}
                    placeholder="What's up!" />

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