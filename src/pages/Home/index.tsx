import useDarkMode from '../../hooks/useDarkMode';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import femsaLogo from '../../assets/logos/logo-femsa.png';
import { homePageMenu } from '../../menu';

const Home = () => {
	/**
	 * Contexts
	 */
	const { darkModeStatus } = useDarkMode();

	/**
	 * Utilities
	 */
	// const stylesConfig = config.stylesConfig[0];
	// const logo = darkModeStatus ? stylesConfig.homeDarkModeLogo : stylesConfig.homeLogo;
	// const homeLogoHeight = stylesConfig.homeLogoHeight ? stylesConfig.homeLogoHeight : '25';

	return (
		<PageWrapper title={homePageMenu.home.text}>
			<Page>
				<div className='row d-flex align-items-center justify-content-center h-100'>
					<div
						className={`col-lg-12 col-md-12 col-sm-9 d-flex justify-content-center h-auto`}>
						<img src={femsaLogo} className='img-fluid' alt='Logo' />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Home;
