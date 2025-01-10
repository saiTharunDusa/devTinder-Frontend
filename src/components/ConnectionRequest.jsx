import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestsSlice'

const ConnectionRequest = () => {

    const requests = useSelector((store) => store.requests)

    const dispatch = useDispatch();

    const reviewRequests = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + '/review/request/' + status + '/' + _id, {}, {
                withCredentials: true
            })
            dispatch(removeRequests(_id));
        }
        catch (err) {
            console.log(err);
        }
    }

    const getConnectionRequests = async () => {
        if (requests) return;
        try {
            const res = await axios.get(BASE_URL + '/user/requests/received', {
                withCredentials: true
            })
            dispatch(addRequests(res?.data?.data));

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getConnectionRequests();
    }, [])

    if (!requests) return;

    if (requests.length <= 0)
        return <h1 className="flex justify-center my-10">No new users founds!</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-Black text-3xl">Connection Requests</h1>

            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
                    request?.fromUserId;

                return (
                    <div
                        key={_id}
                        className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-4 w-full overflow-hidden">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p className="break-words whitespace-normal">{about}</p>
                            {skills && <p>{skills}</p>}
                            <div className='flex my-4'>
                                <button className="btn btn-info mx-2 justify-end" onClick={() => reviewRequests("rejected", request._id)} >
                                    Reject
                                </button><button className="btn btn-secondary justify-end" onClick={() => reviewRequests("accepted", request._id)}  >
                                    Accept
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