import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
	const [emailId, setEmailId] = useState('surekha@gmail.com');
	const [password, setPassword] = useState('Surekha@12345');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoginForm, setIsLoginForm] = useState(false);

	const handleLoginClick = async () => {
		try {
			const res = await axios.post(BASE_URL + '/login', {
				emailId, password
			}, { withCredentials: true })

			dispatch(addUser(res?.data?.data));
			return navigate("/");
		}
		catch (err) {
			setError(err?.response?.data);
		}
	}
	const handleSignUpClick = async () => {
		try {
			const res = await axios.post(BASE_URL + "/signUp", {
				firstName, lastName, emailId, password
			}, { withCredentials: true })
			dispatch(addUser(res?.data?.data));
			const res1 = await axios.post(BASE_URL + "/login", {
				emailId, password
			}, {
				withCredentials: true
			})
			dispatch(addUser(res1?.data?.data));
			setIsLoginForm(true);
			return navigate("/edit");
		}
		catch (err) {
			console.log(err);
			setError(err?.response?.data);
		}
	}

	return (
		<div className='flex justify-center my-10'>
			<div className="card bg-base-100 w-96 shadow-xl ">
				<div className="card-body">
					<h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
					{!isLoginForm && <div>
						<label className="input input-bordered flex items-center gap-2 my-6">
							<input type="text" className="grow" placeholder="FirstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
						</label>

						<label className="input input-bordered flex items-center gap-2 my-2">
							<input type="text" className="grow" placeholder="LastName" value={lastName} onChange={e => setLastName(e.target.value)} />
						</label>
					</div>}
					<label className="input input-bordered flex items-center gap-2 my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70">
							<path
								d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
							<path
								d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
						</svg>
						<input type="text" className="grow" placeholder="Email" value={emailId} onChange={e => setEmailId(e.target.value)} />
					</label>

					<label className="input input-bordered flex items-center gap-2 my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70">
							<path
								fillRule="evenodd"
								d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
								clipRule="evenodd" />
						</svg>
						<input type="password" className="grow" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
					</label>
					<p className='text-red-500 font-semibold'>{error}</p>
					<div className="card-actions justify-center m-2">
						<button
							className="btn btn-primary"
							onClick={isLoginForm ? handleLoginClick : handleSignUpClick}
						>
							{isLoginForm ? "Login" : "Sign Up"}
						</button>
					</div>
					<p
						className="m-auto cursor-pointer py-2"
						onClick={() => setIsLoginForm((value) => !value)}
					>
						{isLoginForm
							? "New User? Signup Here"
							: "Existing User? Login Here"}
					</p>

				</div>
			</div>
		</div>
	)
}

export default Login