import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import ProfilePreview from './ProfilePreview'

const ProfileEdit = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()


    const [photoUrl, setPhotoUrl] = useState();
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [age, setAge] = useState(user?.age || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [about, setAbout] = useState(user?.about || '');
    const [newSkill, setNewSkill] = useState();
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState();
    const [showToast, setShowToast] = useState(false);

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

    const handleEditProfile = async () => {
        setError('');
        try {
            const res = await axios.put(BASE_URL + '/profile/edit', {
                firstName, lastName, age, gender, about, skills
            }, {
                withCredentials: true
            });
            console.log(res?.data?.data);
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            // Detailed error logging
            console.log(err?.response?.data);
            setError(err?.response?.data);
        }

    }

    return (
        user && <div className="flex justify-center my-20">
            {/* Edit Form */}
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img src={user.photoUrl} alt="photo" />
                </figure>

                <div className="card-body">

                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <strong>Photo URL:</strong>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Photo URL"
                            value={photoUrl || ''}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <strong>First Name:</strong>
                        <input
                            type="text"
                            className="grow"
                            placeholder="First Name"
                            value={firstName || ''}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <strong>Last Name:</strong>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Last Name"
                            value={lastName || ''}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <strong>Age:</strong>
                        <input
                            type="number"
                            className="grow"
                            placeholder="Age"
                            value={age || ''}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <strong>Gender:</strong>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Gender"
                            value={gender || ''}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </label>
                    <strong>About:</strong>
                    <label className="input input-bordered flex flex-col gap-2 my-2">

                        <textarea
                            className="grow h-96 p-2 resize-none"
                            placeholder="About"
                            value={about || ''}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <strong>Skills:</strong>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Add Skill"
                            value={newSkill || ''}
                            onChange={(e) => setNewSkill(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                if (newSkill.trim()) {
                                    setSkills([...skills, newSkill.trim()]);
                                    setNewSkill('');
                                }
                            }}
                        >
                            Add
                        </button>
                    </label>
                    <div className="flex flex-wrap gap-2 my-2">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-1 bg-gray-200 text-sm px-2 py-1 rounded"
                            >
                                {skill}
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() =>
                                        setSkills(skills.filter((_, i) => i !== index))
                                    }
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    {error ? (
                        <p className="text-red-500 font-semibold">
                            {" Please enter valid gender type [male, female, others]"}
                        </p>
                    ) : (
                        ''
                    )}
                    <button className="btn btn-secondary" onClick={handleEditProfile}>
                        Save Profile
                    </button>
                </div>
            </div>
            <ProfilePreview
                user={user}
                firstName={firstName}
                lastName={lastName}
                age={age}
                gender={gender}
                about={about}
                skills={skills}
            />
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ProfileEdit