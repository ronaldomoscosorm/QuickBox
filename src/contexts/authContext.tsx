import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserDataWithUsername, IUserProps } from '../common/data/userDummyData';
import { BSMenu } from '../classes/BSMenu';
import { BSUserInfo } from '../classes/BSUserInfo';

export interface IAuthContextProps {
	user: string;
	setUser?(...args: unknown[]): unknown;
	userData: Partial<IUserProps>;
	menu?: BSMenu[];
	setMenu?(...args: unknown[]): unknown;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>(localStorage.getItem('facit_authUsername') || '');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});
	const [menu, setMenu] = useState<BSMenu[]>(() => {
		const storedMenu = localStorage.getItem('user_menu');
		return storedMenu ? JSON.parse(storedMenu) : [];
	});
	const [curUser, setCurUser] = useState<BSUserInfo>(new BSUserInfo());

	/**
	 * Functions
	 */
	const login = async (username: string, password: string) => {
		curUser.UserName = username.trim() || '';
		curUser.Password = password || '';

		try {
			// const requestData = await getUserClientsFromLogin(curUser);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		localStorage.setItem('facit_authUsername', user);
	}, [user]);

	useEffect(() => {
		if (user !== '') {
			setUserData(getUserDataWithUsername(user));
		} else {
			setUserData({});
		}
	}, [user]);
	useEffect(() => {
		localStorage.setItem('user_menu', JSON.stringify(menu));
	}, [menu]);

	const value = useMemo(
		() => ({
			user,
			setUser,
			userData,
			menu,
			setMenu,
		}),
		[user, userData],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
