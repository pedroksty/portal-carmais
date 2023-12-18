'use client'

import Glider from 'react-glider';
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useStore } from '@/src/store';
import useWindowWidth from '@/src/useWindowWidth';

import 'glider-js/glider.min.css';
import './index.css'

const ArrowIcon = ({left = true}) => {
	return (
		<div className={`arrow-button arrow-button-${left ? 'left' : 'right'}`}>
			{left ? <ChevronLeft /> : <ChevronRight />}
		</div>
	)
}

export default function Banners() {
	const { indexBanners } = useStore();
	const windowWidth = useWindowWidth();

	return (
		<Glider
			draggable
			hasArrows={windowWidth > 1023 && indexBanners.length > 1}
			hasDots={indexBanners.length > 1}
			slidesToShow={1}
			scrollLock
			iconLeft={<ArrowIcon />}
			iconRight={<ArrowIcon left={false} />}
		>
			{indexBanners.map((banner) => (
				<Image 
					key={banner.title}
					src={windowWidth > 1023 ? banner.desktopUrl : banner.mobileUrl}
					alt={banner.title}
					width={windowWidth > 1023 ? 1231 : 312}
					height={windowWidth > 1023 ? 451 : 312}
					className='bannerImage'
				/>
			))}
		</Glider>
	)
}