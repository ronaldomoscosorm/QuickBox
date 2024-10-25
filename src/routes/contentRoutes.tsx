import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
// import { authPagesMenu, lobbyBISPagesMenu, lobbyHIKPagesMenu } from '../menu';

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};

const REGISTER = {
	REGISTER: lazy(() => import('../pages/RegisterProduct/')),
};

const SALE = {
	SALE: lazy(() => import('../pages/Sale/')),
}

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
		path: '/cadastro-produtos',
		element: <REGISTER.REGISTER />,
	},

	/**
	 * Sales
	 */
	{
		path: '/venda',
		element: <SALE.SALE />,
	},
];

const contents = [...appPages];

export default contents;
