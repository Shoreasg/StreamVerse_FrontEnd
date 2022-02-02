import axios from "axios";
import React from "react";
import { Card } from 'antd';



const NewsFeed = ({ Feed }) => {



    const MapFeed = Feed.map((data, index) => {
        console.log(data.status)
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