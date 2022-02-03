import axios from "axios";
import React from "react";
import { Card } from 'antd';



const NewsFeed = ({ Feed }) => {

    const LatestFeed= Feed.reverse();

    const MapFeed = LatestFeed.map((data) => {
        return (<Card style={{ width: 300 }}>
            <p>{data.status}</p>
        </Card>)
    })


    return (
        <>
            {MapFeed}
        </>
    )
}

export default NewsFeed