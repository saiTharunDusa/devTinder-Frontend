import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addFeed } from '../utils/feedSlice'
import ProfilePreview from './ProfilePreview'

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getFeed = async () => {
        if (Array.isArray(feed) && feed.length > 0) return;

        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/user/feed`, {
                withCredentials: true,
            });

            if (res?.data?.data) {
                dispatch(addFeed(res.data.data));
            }
        } catch (err) {
            console.error("Feed fetch error:", err);
            setError(err.message || "Failed to load feed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeed();
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center my-10">
                Loading feed...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center my-10 text-red-600">
                {error}
            </div>
        );
    }

    if (!Array.isArray(feed) || feed.length === 0) {
        return (
            <h1 className="flex justify-center my-10">
                No new users found!
            </h1>
        );
    }

    const currentFeedItem = feed[0] || {};
    const {
        _id,
        firstName,
        lastName,
        age,
        gender,
        about,
        skills,
        photoUrl
    } = currentFeedItem;

    if (!_id || !firstName) {
        return (
            <div className="flex justify-center my-10">
                Invalid feed data. Please refresh.
            </div>
        );
    }

    return (
        <div className='flex justify-center my-5'>
            <ProfilePreview
                _id={_id}
                firstName={firstName}
                lastName={lastName || ''}
                age={age}
                gender={gender}
                about={about}
                skills={skills}
                photoUrl={photoUrl}
                isFeed={true}
            />
        </div>
    );
}

export default Feed