import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});
const AuthContextProvider = (props) => {
	const [userSession, setUserSession] = useState({})



	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/getuser`, { withCredentials: true })
			.then((res) => {
				setUserSession(res.data);
			});
	}, []);

	return (
		<AuthContext.Provider value={userSession}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;