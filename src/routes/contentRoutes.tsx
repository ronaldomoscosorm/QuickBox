import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
// import { authPagesMenu, lobbyBISPagesMenu, lobbyHIKPagesMenu } from '../menu';

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};

const REGISTER = {
	REGISTER: lazy(() => import('../pages/RegisterProduct/')),
};

const appPages: RouteProps[] = [
	/**
	 * Auth
	 */
	{
		path: '/404',
		element: <AUTH.PAGE_404 />,
	},

	/**
	 * Register products
	 */
	{
		path: '/register',
		element: <REGISTER.REGISTER />,
	},
];

const contents = [...appPages];

export default contents;
