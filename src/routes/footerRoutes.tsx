import React from 'react';
import { RouteProps } from 'react-router-dom';
import { authPagesMenu, demoPagesMenu, pageLayoutTypesPagesMenu } from '../menu';
import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';

const footers: RouteProps[] = [
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null },
	{ path: authPagesMenu.login.path, element: null },
	{ path: demoPagesMenu.signUp.path, element: null },
	{ path: demoPagesMenu.page404.path, element: null },
	{ path: demoPagesMenu.knowledge.subMenu.grid.path, element: null },
	{ path: '*', element: <DefaultFooter /> },
];

export default footers;
