/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Glider from 'react-glider';

import { useStore } from '@/src/filtersStore';

import Hatch from '@/public/Hatch'
import Sedan from '@/public/Sedan'
import SUV from '@/public/SUV'
import Pickup from '@/public/Pickup'
import useWindowWidth from '@/src/useWindowWidth';

import 'glider-js/glider.min.css';
import './index.css'
import styles from './styles.module.css'

export default function IndexFilters({ brands, kinds }) {
	const { push } = useRouter();
	const windowWidth = useWindowWidth();
	const filterStore = useStore();
	const [selectedSearch, setSelectedSearch] = useState('brands')
	
	const handleClickBrand = (brand) => {
		useStore.setState({...filterStore, brands: [brand]});
		push('/seminovos');
	}

	const handleSelectPriceRange = (option, value, selectedPriceRange) => {
		if(option == 1) {
			useStore.setState({...filterStore, maxPrice: value, selectedPriceRange: selectedPriceRange})
		}else{
			useStore.setState({...filterStore, minPrice: value, selectedPriceRange: selectedPriceRange})
		}
		push(`/seminovos`);
	}

	const fixedBrands = brands.reduce((acc, curr) => {
		if (acc.map((brand) => brand.title).includes(curr.title)) return acc

		return [
			...acc,
			curr
		]
	}, [])

	const [isMoreBrand, setIsMoreBrand] = useState(false)

	function handleOpenFilterList() {
		useStore.setState({...filterStore, sideBarOpen: true});
		push('/seminovos');

	}

  return (
    <div className='index-filters-container' >
			<h2>Pesquise por marca ou faixa de preço</h2>
			<h1 style={{ display: "none" }}>Seminovos é no Grupo Carmais</h1>
			<div className='index-filters-select-button-container'>
				{
					brands.length 
					? (<button  
							className={`index-filters-select-button ${selectedSearch == 'brands' ? 'index-filters-select-button-selected' : ''}`}
							onClick={() => setSelectedSearch('brands')} 
						>
							Marcas
						</button>)
					: null
				}
				<button 
					className={`index-filters-select-button ${selectedSearch == 'priceRange' ? 'index-filters-select-button-selected' : ''}`}
					onClick={() => setSelectedSearch('priceRange')} 
				>
					Faixas de preço
				</button>
				<button 
					className={`index-filters-select-button ${selectedSearch == 'priceRange' ? 'index-filters-select-button-selected' : ''}`}
					onClick={handleOpenFilterList} 
				>
					Filtros avançados
				</button>
			</div>
			<div className='fildadsters-container' >
				{
					selectedSearch == 'brands'
					?	(
						<div >
						<div className='brand-cards-button-container'>
						{
							fixedBrands.filter((x, idx) => idx < (isMoreBrand ? 50 : 9) || windowWidth > 1023).map((brand) => (
								<div key={brand.title} className='brand-card-button' onClick={() => handleClickBrand(brand.title)}>
									<Image 
										src={`/makes/${brand.title
											.toLowerCase()
											.replace(/\s+/g, '-')}.png`}
										alt={brand.title}
										width={36}
										height={36}
									/>
									<p>{brand.title}</p>
								</div>
							))
						}
						</div>
						{windowWidth < 1023 ? (
							<div className={`${styles.isMoreBrandContainer}`} > 
								<p className={`${styles.isMoreBrand}`} onClick={() => setIsMoreBrand(!isMoreBrand)}  >{isMoreBrand ? 'Ver menos': 'Ver mais'}</p>
							</div>

							) : null}
						</div>
					)
					: null
				}
				{/* {
					selectedSearch == 'categories'
					? (
						<div className='car-figures-container'>
							<div className='car-figure-card'>
								<Hatch className='car-figure' />
								<p>Hatch</p>
							</div>
							<div className='car-figure-card'>
								<Sedan className='car-figure' />
								<p>Sedan</p>
							</div>
							<div className='car-figure-card'>
								<SUV className='car-figure' />
								<p>SUV</p>
							</div>
							<div className='car-figure-card'>
								<Pickup className='car-figure' />
								<p>Pickup</p>
							</div>
						</div>
					)
					: null
				} */}
				{
					selectedSearch == 'priceRange'
					? (
						<div className='price-range-container' >
							<button className='index-filters-select-button price-range-button' onClick={() => handleSelectPriceRange(1, '50000', 1)}>
								Até R$50.000
							</button>
							<button className='index-filters-select-button price-range-button' onClick={() => handleSelectPriceRange(1, '100000', 2)}>
								Até R$100.000
							</button> 
							<button className='index-filters-select-button price-range-button' onClick={() => handleSelectPriceRange(1, '200000', 3)}>
								Até R$200.000
							</button>
							<button className='index-filters-select-button price-range-button' onClick={() => handleSelectPriceRange(2, '200000', 0)}>
								Acima de R$200.000
							</button>
						</div>
					)
					: null
				}
			</div>
			
    </div>
  )
}