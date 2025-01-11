import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestsSlice'

const ConnectionRequest = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [actionInProgress, setActionInProgress] = useState(false)

    const reviewRequests = async (status, _id) => {
        if (!_id || actionInProgress) return;

        setActionInProgress(true);
        try {
            await axios.post(
                `${BASE_URL}/review/request/${status}/${_id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequests(_id));
        } catch (err) {
            console.error('Error reviewing request:', err);
            setError(`Failed to ${status} request. Please try again.`);
        } finally {
            setActionInProgress(false);
        }
    }

    const getConnectionRequests = async () => {
        if (Array.isArray(requests) && requests.length > 0) return;

        try {
            setLoading(true);
            const res = await axios.get(
                `${BASE_URL}/user/requests/received`,
                { withCredentials: true }
            );

            if (res?.data?.data) {
                dispatch(addRequests(res.data.data));
            }
        } catch (err) {
            console.error('Error fetching requests:', err);
            setError('Failed to load connection requests. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getConnectionRequests();
    }, [])

    if (loading) {
        return <div className="flex justify-center my-10">Loading requests...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center my-10 text-red-600">
                {error}
            </div>
        );
    }

    if (!Array.isArray(requests) || requests.length === 0) {
        return <h1 className="flex justify-center my-10">No new connection requests!</h1>;
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-Black text-3xl">Connection Requests</h1>

            {requests.map((request) => {
                if (!request?.fromUserId) {
                    return null;
                }

                const {
                    _id,
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                    skills
                } = request.fromUserId || {};

                if (!_id || !firstName) return null;

                return (
                    <div
                        key={_id}
                        className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img
                                alt={`${firstName}'s photo`}
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoUrl || '/default-avatar.png'}
                            />
                        </div>
                        <div className="text-left mx-4 w-full overflow-hidden">
                            <h2 className="font-bold text-xl">
                                {`${firstName} ${lastName || ''}`}
                            </h2>
                            {age && gender && <p>{`${age}, ${gender}`}</p>}
                            {about && <p className="break-words whitespace-normal">{about}</p>}
                            {skills && <p>{skills.join(', ')}</p>}
                            <div className='flex my-4'>
                                <button
                                    className={`btn btn-info mx-2 justify-end ${actionInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => reviewRequests("rejected", request._id)}
                                    disabled={actionInProgress}
                                >
                                    {actionInProgress ? 'Processing...' : 'Reject'}
                                </button>
                                <button
                                    className={`btn btn-secondary justify-end ${actionInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => reviewRequests("accepted", request._id)}
                                    disabled={actionInProgress}
                                >
                                    {actionInProgress ? 'Processing...' : 'Accept'}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ConnectionRequest