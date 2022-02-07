import React from "react";
import { toast } from 'react-toastify';
import { Button, Input, Form, Card, Comment, Avatar } from 'antd';
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
        <Form onFinish={onPostStatus} form={form} autoComplete="off" className="w-3/4">
            <Form.Item
                name="status"
                rules={[{ required: true, message: "Status cannot be empty" }]}>
                <Card
                    actions={[
                        <Button type="primary" htmlType="submit" block >
                            Submit
                        </Button>
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

            </Form.Item>
        </Form>

    )
}

export default PostStatus