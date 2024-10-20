import React, { SVGProps } from 'react';

const SvgFilter3 = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' fill='currentColor' className='svg-icon' {...props}>
			<path d='M0 0h24v24H0V0z' fill='none' />
			<path
				d='M7 17h14V3H7v14zm4-4h4v-2h-2V9h2V7h-4V5h4a2 2 0 012 2v1.5c0 .83-.67 1.5-1.5 1.5.83 0 1.5.67 1.5 1.5V13a2 2 0 01-2 2h-4v-2z'
				opacity={0.3}
			/>
			<path d='M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-4-4v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7a2 2 0 00-2-2h-4v2h4v2h-2v2h2v2h-4v2h4a2 2 0 002-2zm2 10v-2H3V5H1v16c0 1.1.9 2 2 2h16z' />
		</svg>
	);
};

export default SvgFilter3;
