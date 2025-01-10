import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addFeed } from '../utils/feedSlice'
import ProfilePreview from './ProfilePreview'

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const getFeed = async () => {
        if (feed) return
        try {
            const res = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true,
            });
            console.log(res?.data?.data);
            dispatch(addFeed(res?.data?.data));
        }
        catch (err) {
            console.log("err" + err.message);
        }
    }

    useEffect(() => {
        getFeed();
    }, [])

    if (!feed) return;
    if (feed.length <= 0)
        return <h1 className="flex justify-center my-10">No new users founds!</h1>;

    return (
        feed && (
            <div className='flex justify-center my-10'>
                <ProfilePreview user={feed[0]} isFeed={true} />
            </div>)
    )
}

export default Feed