import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileView = () => {
    const user = useSelector((store) => store.user);

    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [age, setAge] = useState(user?.age || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [about, setAbout] = useState(user?.about || '');
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        if (user) {
            setPhotoUrl(user?.photoUrl || '');
            setFirstName(user?.firstName || '');
            setLastName(user?.lastName || '');
            setAge(user?.age || '');
            setGender(user?.gender || '');
            setAbout(user?.about || '');
            setSkills(user?.skills || []);
        }
    }, [user]);


    return (
        user && (<div className="flex justify-center my-10 ml-10">
            <div className="card bg-base-300 w-96 shadow-xl justify-center">
                <figure className="relative w-full ">
                    <img
                        src={user?.photoUrl || ''}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </figure>

                <div className="card-body p-6">
                    <div className="space-y-4">
                        {/* Basic Info */}
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">
                                {firstName} {lastName}
                            </h2>
                            <div className="text-sm text-gray-600">
                                <p>Age: {age}</p>
                                <p>Gender: {gender}</p>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-2">
                            <h3 className="font-medium">About</h3>
                            <div className="bg-base-100 rounded-lg p-4">
                                <p className="text-sm break-words overflow-y-auto max-h-48" style={{ overflowWrap: 'anywhere' }}>
                                    {about}
                                </p>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-base-100 text-sm px-3 py-1 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link to="/edit"> <button
                            className="btn btn-secondary my-6"

                        >
                            Edit Profile
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>)

    );
}

export default ProfileView

