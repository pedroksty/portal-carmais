'use client'

import Image from 'next/image';
import useWindowWidth from '@/src/useWindowWidth';

import './index.css'

export default function AboutUsBanner() {
	const windowWidth = useWindowWidth();
	const isMobile = windowWidth <= 800;

	return (
		<div className='bannerAbout'>
			{!isMobile
				? <Image
						alt='capa' 
						src='/Banner_Site_Quem_Somos.jpg'
						className='banner-about-desktop'
						width={1216} 
						height={304}
					/>
				: <Image
						alt='capa' 
						src='/Banner_Site_Quem_Somos.jpg'
						className='banner-aboout-mobile'
						width={312} 
						height={160}
					/>
			}
		</div>
	)
}