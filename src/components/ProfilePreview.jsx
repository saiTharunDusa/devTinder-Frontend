import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { addRequests } from '../utils/requestsSlice';

const ProfilePreview = ({ _id, firstName, lastName, age, gender, about, skills, photoUrl, isFeed }) => {

    const dispatch = useDispatch();

    const sendRequests = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/send/request/" + status + "/" + _id, {}, {
                withCredentials: true
            })
            dispatch(removeUserFromFeed(_id));
            dispatch(addRequests(res?.data?.data));
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <div className="flex justify-center my-1 ml-6">
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure className="relative w-full">
                    <img
                        src={photoUrl || ''}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </figure>

                <div className="card-normal p-4">
                    <div className="h-auto">
                        {/* Basic Info */}
                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold">
                                {firstName} {lastName}
                            </h2>
                            <div className="text-sm text-gray-600">
                                <p>Age: {age}</p>
                                <p>Gender: {gender}</p>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-1">
                            <h3 className="font-medium">About</h3>
                            <div className="bg-base-100 rounded-lg p-2">
                                <p className="text-sm break-words overflow-y-auto max-h-32" style={{ overflowWrap: 'anywhere' }}>
                                    {about}
                                </p>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-1">
                            <h3 className="font-medium">Skills</h3>
                            <div className="flex flex-wrap gap-1">
                                {skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-base-100 text-sm px-2 py-1 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {isFeed && (
                            <div className="flex justify-center mt-2">
                                <button
                                    className="btn btn-primary mx-2"
                                    onClick={() => sendRequests("ignored", _id)}
                                >
                                    Ignore
                                </button>
                                <button
                                    className="btn btn-secondary mx-2"
                                    onClick={() => sendRequests("interested", _id)}
                                >
                                    Interested
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ProfilePreview;