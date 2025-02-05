import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });

            if (res?.data?.data) {
                dispatch(addConnections(res.data.data));
            }
        }
        catch (err) {
            console.error('Connection error:', err);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getConnections();
    }, []);

    if (loading) {
        return <div className="flex justify-center my-10">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center my-10 text-red-600">Error: {error}</div>;
    }

    if (!Array.isArray(connections)) {
        return <div className="flex justify-center my-10">No connection data available</div>;
    }

    if (connections.length === 0) {
        return <h1 className="flex justify-center my-10">No Connections Found!</h1>;
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-Black text-3xl">Connections</h1>

            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
                    connection || {};  // Add default empty object

                if (!_id || !firstName) return null;  // Skip invalid connections

                return (
                    <div
                        key={_id}
                        className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img
                                alt={`${firstName}'s photo`}
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoUrl || '/default-avatar.png'}  // Add fallback image
                            />
                        </div>
                        <div className="text-left mx-4 w-full overflow-hidden">
                            <h2 className="font-bold text-xl">
                                {`${firstName} ${lastName || ''}`}
                            </h2>
                            {age && gender && <p>{`${age}, ${gender}`}</p>}
                            {about && <p className="break-words whitespace-normal">{about}</p>}
                            {skills && <p>{`${skills}, `}</p>}
                        </div>
                        <Link to={"/chat/" + _id}><button className='btn btn-primary'>Chat</button></Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Connections