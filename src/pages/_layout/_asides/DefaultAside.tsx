import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../contexts/themeContext';
import useDarkMode from '../../../hooks/useDarkMode';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';
import Brand from '../../../layout/Brand/Brand';
import Navigation, { NavigationLine } from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import { PagesMenu, filterLobbyBISMenu, filterLobbyHIKMenu } from '../../../utils/filterMenus';
import { dashboardPagesMenu } from '../../../menu';
import AuthContext from '../../../contexts/authContext';

const DefaultAside = () => {
	const { menu } = useContext(AuthContext);
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(
		localStorage.getItem('facit_asideDocStatus') === 'true' || false,
	);

	const { t } = useTranslation(['translation', 'menu']);

	const { darkModeStatus } = useDarkMode();
	const permissions: string[] = menu
		? menu?.filter((menu) => menu.cmpDcTarget !== '').map((menu) => menu.cmpDcTarget)
		: [];
	let filteredLobbyMenu: PagesMenu = {};

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{
					<>
						<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
						<NavigationLine />
					</>
				}
			</AsideBody>
			<AsideFoot>
				<User />
			</AsideFoot>
		</Aside>
	);
};

export default DefaultAside;
