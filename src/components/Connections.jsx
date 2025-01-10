import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();
    const getConnections = async () => {
        if (connections) return;
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            })
            console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data));
        }
        catch (err) {
            console.log('null-errror')

            console.log(err);
        }
    }
    useEffect(() => {
        getConnections();
    }, []);

    if (!connections) return;

    if (connections.length == 0) return <h1 className="flex justify-center my-10">No Connections Found!</h1>


    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-Black text-3xl">Connections</h1>

            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
                    connection;

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
                            {skills && <p>{skills + ", "}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Connections