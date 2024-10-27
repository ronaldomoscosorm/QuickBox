import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authPagesMenu, homePageMenu } from '../../menu';
import Login from '../../pages/presentation/auth/Login';
import contents from '../../routes/contentRoutes';

const PAGE_HOME = lazy(() => import('../../pages/Home'));
const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const ContentRoutes = () => {
	return (
		<Routes>
			<Route path={authPagesMenu.login.path} element={<Login />} />
			<Route path={homePageMenu.home.path} element={<PAGE_HOME />} />
			{contents.map((page) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<Route key={page.path} {...page} />
			))}
			<Route path='*' element={<PAGE_404 />} />
		</Routes>
	);
};

export default ContentRoutes;
