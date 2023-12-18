'use client'

import ProductCardSkeleton from '../ProductCard/skeleton';
import useWindowWidth from '@/src/useWindowWidth';
import './index.css';

const skeletonList = [1, 2, 3, 4];

export default function ProductCarouselSkeleton({ title }) {
	const windowWidth = useWindowWidth();
	return (
		<div>
			<div className='carousel-info-container' >
                <h2 style={{ display: "none" }}>Seminovos é no Grupo Carmais</h2>
				<h3>{title}</h3>
				<button>{windowWidth > 800 ? 'Ver mais ofertas' : 'Ver ofertas'}</button>
			</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {skeletonList.map((vehicle, idx) => {
                    if(windowWidth > 800 || idx < 1) {
                        return (
                            <ProductCardSkeleton 
                                key={vehicle}
                            />
                        )
                    }else{
                        return null
                    }
                })}
            </div>
		</div>
    )
}