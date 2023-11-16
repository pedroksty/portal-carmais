'use client'

import Glider from 'react-glider';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ProductCard } from '../ProductCard';
import useWindowWidth from '@/src/useWindowWidth';

import 'glider-js/glider.min.css';
import './index.css';

const ArrowIcon = ({left = true}) => {
	return (
		<div className={`product-carousel-arrow-button ${left ? 'product-carousel-arrow-button-left' : 'product-carousel-arrow-button-right'}`}>
			{left ? <ChevronLeft color='var(--gray-1)' /> : <ChevronRight color='var(--gray-1)' />}
		</div>
	)
}

export default function ProductCarousel({ title, vehicleList }) {
	const windowWidth = useWindowWidth();
	return (
		<div>
			<div className='carousel-info-container' >
				<h2 style={{ display: "none" }}>Seminovos é no Grupo Carmais</h2>
				<h3>{title}</h3>
				<Link href='/seminovos'>
					<button>{windowWidth > 800 ? 'Ver mais ofertas' : 'Ver ofertas'}</button>
				</Link>
			</div>
			<Glider
				className='margin-left-glider'
				hasArrows={windowWidth > 1023 && vehicleList.length > 4}
				slidesToShow={windowWidth > 1023 ? 4 : 'auto'}
				itemWidth={280}
				exactWidth={windowWidth < 1023}
				iconLeft={<ArrowIcon />}
				iconRight={<ArrowIcon left={false} />}
			>
				{vehicleList.map((vehicle) => (
					<ProductCard 
						key={vehicle.id}
						{...vehicle}
						imageUrl={vehicle.profile_image.url}
						address={vehicle.item_unit.address}
						oldPrice={vehicle.old_price}
						carousel
					/>
				))}
			</Glider>
		</div>
    )
}