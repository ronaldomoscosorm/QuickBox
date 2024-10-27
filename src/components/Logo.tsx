import { FC } from 'react';
import femsaLogo from '../assets/logos/logo-femsa.png';

interface ILogoProps {
	imgSource?: string;
	width?: string;
}
const Logo: FC<ILogoProps> = ({ imgSource = femsaLogo, width = '75' }) => {
	return (
		<div className={`brand-logo w-${width}`}>
			<img src={imgSource} className='img-fluid' alt='logo' />
		</div>
	);
};

export default Logo;
