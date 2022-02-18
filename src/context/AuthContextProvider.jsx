import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});
const AuthContextProvider = (props) => {
	const [userSession, setUserSession] = useState({})



	useEffect(() => {
		const getUser = async () => {
			const User = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/getuser`, { withCredentials: true })
			setUserSession(User.data);

		}
		const getFollowers = async () =>
		{
			 await axios
			.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/GetFollowers`, { withCredentials: true })
		} 
		getUser()
		getFollowers()
	}, []);

	return (
		<AuthContext.Provider value={userSession}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;