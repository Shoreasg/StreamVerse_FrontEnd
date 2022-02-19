import React, {useContext} from "react";
import { toast } from 'react-toastify';
import { Button, Input, Form, Card, Comment, Avatar } from 'antd';
import { AuthContext } from '../context/AuthContextProvider';
import axios from "axios";
const { TextArea } = Input;



const PostStatus = ({ setUpdatedFeed,Loading }) => {
    const userSession = useContext(AuthContext)
    const [form] = Form.useForm();

    const onPostStatus = (data) => {

        axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/postStatus`, { userName: userSession.userName, twitchId: userSession.twitchId, profileImage: userSession.profileImage, ...data }, { withCredentials: true }).then((res) => {
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
            {Loading ? <Form.Item
                name="status"
                rules={[{ required: true, message: "Status cannot be empty" }]}>
                <Card
                    actions={[
                        <Button type="primary" htmlType="submit" block disabled={true}>
                            Submit
                        </Button>
                    ]}
                >
                    <Comment
                        avatar={<Avatar src={userSession.profileImage} alt={userSession.userName} />}
                        content={
                            <TextArea

                                showCount
                                autoSize={{ minRows: 3, maxRows: 4 }}
                                maxLength={280}
                                placeholder="What's up!"
                                bordered={false}
                                disabled={true} />
                        } />
                </Card>
            </Form.Item> : <Form.Item
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
                        avatar={<Avatar src={userSession.profileImage} alt={userSession.userName} />}
                        content={
                            <TextArea

                                showCount
                                autoSize={{ minRows: 3, maxRows: 4 }}
                                maxLength={280}
                                placeholder="What's up!"
                                bordered={false} />
                        } />
                </Card>
            </Form.Item>}
        </Form>

    )
}

export default PostStatus