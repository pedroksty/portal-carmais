'use client'

import Image from 'next/image';
import useWindowWidth from '@/src/useWindowWidth';

import './index.css'

export default function ContactUsBanner() {
	const windowWidth = useWindowWidth();
	const isMobile = windowWidth <= 800;

	return (
		<div className='banner-container-contact-us'>
			{!isMobile
				? <Image
						alt='capa' 
            className='banner-about-us'
						src='/banner-contact-us.png' 
						width={1216} 
						height={360}
					/>
				: <Image
            className='banner-about-us'
						alt='capa' 
						src='/banner-contact-us-mobile.png' 
						width={312} 
						height={209}
					/>
			}
		</div>
	)
}