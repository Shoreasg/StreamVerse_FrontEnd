import React from "react";
import { Collapse } from 'antd';
const { Panel } = Collapse


const FaqCard = () => {
    return (
        <Collapse style={{ width: 400, marginTop: -200 }} >
            <Panel header="What is StreamVerse?" key="1">
                <p>StreamVerse is an app that allow you to keep your viewers updated on the latest news!</p>
            </Panel>
            <Panel header="Do i need a Twitch account to access this website?" key="2">
                <p>Yes! You need a Twitch account in order to access this page</p>
            </Panel>
        </Collapse>
    )
}

export default FaqCard