'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Sliders, ChevronDown } from 'lucide-react';

import SideOverlay from '../SideOverlay';
import SideOptions from '../SideOptions';
import { useStore } from "@/src/filtersStore"
import { useStore as inputStore } from '@/src/inputLabelStore';
import SelectButton from '../SelectButton';
import { isClickInside } from '@/src/helpers';
import './index.css'
import { CurrencyInput } from '../CurrencyInput';

export default function GeneralFilters({ filters, units }) {
	const filterStore = useStore();
	const router = useRouter();
	const pathName = usePathname();

	const [filtersOpen, setFiltersOpen] = useState(false);
	const [brandsSideOptions, setBrandsSideOptions] = useState(false)
	const [stateSideOptions, setStateSideOptions] = useState(false)
	const [citySideOptions, setCitySideOptions] = useState(false)
	const [unitsSideOptions, setUnitsSideOptions] = useState(false)
	const [modelsSideOptions, setModelsSideOptions] = useState(false)

	useEffect(() => {
		const textSearchParam = filterStore.textSearch.length ? `textSearch=${filterStore.textSearch}&` : '';
		const minYearParam = filterStore.minYear ? `minYear=${filterStore.minYear}&` : '';
		const maxYearParam = filterStore.maxYear ? `maxYear=${filterStore.maxYear}&` : '';
		const minPriceParam = filterStore.minPrice ? `minPrice=${filterStore.minPrice}&` : '';
		const maxPriceParam = filterStore.maxPrice ? `maxPrice=${filterStore.maxPrice}&` : '';
		const brandsParam = filterStore.brands.length ? `brands=${filterStore.brands.join(',')}&` : '';
		const unitsParam = filterStore.units.length ? `units=${filterStore.units.join(',')}&` : '';
		const modelsParam = filterStore.models.length ? `models=${filterStore.models.join(',')}&` : '';
		const statesParam = filterStore.states.length ? `states=${filterStore.states.join(',')}&` : '';
		const citiesParam = filterStore.cities.length ? `cities=${filterStore.cities.join(',')}&` : '';
		const stateStringsParam = filterStore.stateStrings.length ? `stateStrings=${filterStore.stateStrings.join(',')}&` : '';
		const shiftsParam = filterStore.shifts.length ? `shifts=${filterStore.shifts.join(',')}&` : '';
		const colorsParam = filterStore.colors.length ? `colors=${filterStore.colors.join(',')}&` : '';
		const selectedPriceRangeParam = filterStore.selectedPriceRange > 0 ? `selectedPriceRange=${filterStore.selectedPriceRange}&` : '';

		router.replace(`${pathName}?${textSearchParam}${minYearParam}${maxYearParam}${minPriceParam}${maxPriceParam}${brandsParam}${unitsParam}${modelsParam}${statesParam}${citiesParam}${stateStringsParam}${shiftsParam}${colorsParam}${selectedPriceRangeParam}`)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterStore])

	const closeSideBarHandler = () => {
		setBrandsSideOptions(false)
		setUnitsSideOptions(false)
		setStateSideOptions(false)
		setCitySideOptions(false)
		setModelsSideOptions(false)
		setFiltersOpen(false)
	}

	const [priceRangeModalOpen, setPriceRangeModalOpen] = useState(false);
	const priceRangeButtonRef = useRef(null)
	const priceRangeModalRef = useRef(null)
	const backDropPriceRangeHandler = (e) => {
		if(!isClickInside(e, priceRangeModalRef.current) && !isClickInside(e, priceRangeButtonRef.current)){
			setPriceRangeModalOpen(false)
		}
	}

	const [colorsModalOpen, setColorsModalOpen] = useState(false);
	const colorsButtonRef = useRef(null)
	const colorsModalRef = useRef(null)
	const backDropColorsHandler = (e) => {
		if(!isClickInside(e, colorsModalRef.current) && !isClickInside(e, colorsButtonRef.current)){
			setColorsModalOpen(false)
		}
	}

	const [shiftsModalOpen, setShiftsModalOpen] = useState(false);
	const shiftsButtonRef = useRef(null)
	const shiftsModalRef = useRef(null)
	const backDropShiftsHandler = (e) => {
		if(!isClickInside(e, shiftsModalRef.current) && !isClickInside(e, shiftsButtonRef.current)){
			setShiftsModalOpen(false)
		}
	}

	useEffect(() => {
		window.addEventListener('click', backDropPriceRangeHandler);
		window.addEventListener('click', backDropColorsHandler);
		window.addEventListener('click', backDropShiftsHandler);
		return () => {
			window.removeEventListener('click', backDropPriceRangeHandler)
			window.removeEventListener('click', backDropColorsHandler)
			window.removeEventListener('click', backDropShiftsHandler)
		};
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	//Espera um tempo para fazer a requisicao
	const [awaitSearchInput, setAwaitSearchInput] = useState('')
	useEffect(() => {
		const timeOutId = setTimeout(() => {
			useStore.setState({...filterStore, 'textSearch': awaitSearchInput})
		}, 1500);
		return () => clearTimeout(timeOutId)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [awaitSearchInput]);

	// const [selectedPriceRange, setSelectedPriceRange] = useState(0);
	const handleSelectPriceRange = (option) => {
		if(option === filterStore.selectedPriceRange){
			useStore.setState({...filterStore, minPrice: '', maxPrice: '', selectedPriceRange: 0})
			return;
		}
		if(option > 2) {
			useStore.setState({...filterStore, minPrice: '100000', maxPrice: '', selectedPriceRange: option})
		}else{
			useStore.setState({...filterStore, maxPrice: option === 1 ? '50000' : '100000', minPrice: '', selectedPriceRange: option})
		}
	}

	const [awaitMinPriceInput, setAwaitMinPriceInput] = useState('')
	useEffect(() => {
		if(awaitMinPriceInput !== ''){
			if(filterStore.selectedPriceRange > 0){
				useStore.setState({...filterStore, selectedPriceRange: 0, minPrice: '', maxPrice: ''})
			}
			const timeOutId2 = setTimeout(() => {
				useStore.setState({...filterStore, minPrice: awaitMinPriceInput})
			}, 1500);
			return () => clearTimeout(timeOutId2)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [awaitMinPriceInput])

	const [awaitMaxPriceInput, setAwaitMaxPriceInput] = useState('')
	useEffect(() => {
		if(awaitMaxPriceInput) {
			if(filterStore.selectedPriceRange > 0){
				useStore.setState({...filterStore, selectedPriceRange: 0, minPrice: '', maxPrice: ''})
			}
			const timeOutId = setTimeout(() => {
				useStore.setState({...filterStore, maxPrice: awaitMaxPriceInput})
			}, 1500);
			return () => clearTimeout(timeOutId)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [awaitMaxPriceInput])


	//Usado para todos os checkox
	const handleChangeCheckbox = (e) => {
		if(e.target.checked){
			useStore.setState({...filterStore, [e.target.name]: [...filterStore[e.target.name], e.target.value]})
		}else{
			useStore.setState({
				...filterStore, 
				[e.target.name]: filterStore[e.target.name].filter((x) => x !== e.target.value),
			})
		}
	}
	
	const handleChangeCheckboxInBatch = (e, stateString = '') => {
		const values = e.target.value.split(',')
		if(e.target.checked){
			useStore.setState({
				...filterStore, 
				[e.target.name]: [...filterStore[e.target.name], ...values],
				stateStrings: stateString ? [...filterStore.stateStrings, stateString] : filterStore.stateStrings
			})
		}else{
			useStore.setState({
				...filterStore, 
				[e.target.name]: filterStore[e.target.name].filter((x) => !values.includes(x)),
				stateStrings: stateString ? filterStore.stateStrings.filter((x) => x !== stateString) :  filterStore.stateStrings
			})
		}
	}

	const getIdsFromState = (citiesObj) => {
		return Object.entries(citiesObj).reduce((acc, curr) => {
			return [...acc, curr[1]]
		}, [])
	}

	//Monta o objeto de busca por estado e cidade
	const locationFilters = useMemo(() => {
		return units.reduce((acc, curr) => {
			if(curr.state == ''){
				return acc
			}
			if(!(curr.state in acc)){
				return {
					...acc,
					[curr.state]: {
						[curr.city]: [curr.id]
					}
				}
			}
			if(!(curr.city in acc[curr.state])){
				return {
					...acc,
					[curr.state]: {
						...acc[curr.state],
						[curr.city]: [curr.id]
					}
				}
			}
			return {
				...acc,
				[curr.state]: {
					...acc[curr.state],
					[curr.city]: [...acc[curr.state][curr.city], curr.id]
				}
			}
		}, {})
	}, [units])

	const fixedBrands = filters.brands.reduce((acc, curr) => {
		if (acc.map((brand) => brand.title).includes(curr.title)) return acc

		return [
			...acc,
			curr
		]
	}, [])

	const handleOpenBrandOptions = () => {
		setFiltersOpen(true)
		setBrandsSideOptions(true)
	}

	const handleChangeYear = (e, field) => {
		const year = e.target.value
		if(year.length == 4) {
			useStore.setState({...filterStore, [field]: year})
		}
	}

	const handleClearFilters = () => {
		useStore.setState({...filterStore, 
			sort: '-created_at',
			brands: [],
			units: [],
			models: [],
			textSearch: '',
			states: [],
			cities: [],
			stateStrings: [],
			shifts: [],
			minYear: '',
			maxYear: '',
			minPrice: '',
			maxPrice: '',
			colors: [],
			selectedPriceRange: 0
		});
		inputStore.setState({
			minPriceLabel: '',
			maxPriceLabel: '',
		})
		setFiltersOpen(false);
	}

	useEffect(() => {
		return handleClearFilters
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
    <div>
		<div className='filters-list-container'>
			<div className='filters-search-input-container-list'>
				<Search size={16} style={{ marginLeft: '12px', marginRight: '12px' }} />
				<input type='text' value={awaitSearchInput} onChange={(e) => setAwaitSearchInput(e.target.value)} placeholder='Buscar' />
			</div>
			<div className='more-filters-button' onClick={() => setFiltersOpen(true)}> 
				<p className='desktopOnly'>Mais filtros</p>
				<p className='mobileOnly'>Filtros</p>
				<Sliders size={16} />
			</div>
			<div ref={priceRangeButtonRef} className='filter-generic-button desktopOnly' style={{width: '164px'}} onClick={() => setPriceRangeModalOpen(!priceRangeModalOpen)}>
				<p>{filterStore.selectedPriceRange === 1 ? 'R$ 50.000' :  filterStore.selectedPriceRange === 2 ? 'R$ 100.000' : filterStore.selectedPriceRange === 3 ? 'R$ +100.000' : 'Faixa de preço'}</p>
				<ChevronDown size={20} />
			</div>
			<div id='price-range-quick-filter-modal' ref={priceRangeModalRef} className={`generic-filter-modal price-range-quick-filter-modal ${priceRangeModalOpen ? 'generic-filter-modal-open' : ''} desktopOnly`} >
				<h4>Faixa de preço</h4>
				<div className='price-range-quick-filter-modal-buttons-container'>
					<button 
						className={`filter-price-range-button ${filterStore.selectedPriceRange === 1 ? 'filter-price-range-button-selected' : ''}`} 
						onClick={() => handleSelectPriceRange(1)}	
					>Até R$ 50.000</button>
					<button 
						className={`filter-price-range-button ${filterStore.selectedPriceRange === 2 ? 'filter-price-range-button-selected' : ''}`}
						onClick={() => handleSelectPriceRange(2)}	
					>Até R$ 100.000</button>
					<button 
						className={`filter-price-range-button ${filterStore.selectedPriceRange === 3 ? 'filter-price-range-button-selected' : ''}`}
						onClick={() => handleSelectPriceRange(3)}	
					>Acima de R$ 100.000</button>
				</div>
				<div className='price-range-quick-filter-modal-inputs-container' >
					<div className='price-range-quick-filter-modal-input-container'>
						<div>
							<label htmlFor='minor-price-input' className='filter-default-label' >Menor preço</label>
							<CurrencyInput
								id='minor-price-input'
								onChange={(e) => setAwaitMinPriceInput(e)}
							/>
						</div>
					</div>
					<div className='price-range-quick-filter-modal-input-container' >
						<div>
							<label htmlFor='major-price-input' className='filter-default-label' >Maior preço</label>
							<CurrencyInput
								id='major-price-input'
								onChange={(e) => setAwaitMaxPriceInput(e)}
								max
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='filter-generic-button desktopOnly' style={{width: '180px'}} onClick={handleOpenBrandOptions}>
				<p>{filterStore?.brands?.length === 0 ? 'Marca e Modelo' : filterStore?.brands?.length === 1  ?  `${filterStore?.brands[0]}` : `${filterStore?.brands[0]} +${filterStore?.brands?.length - 1}`}</p>
				<ChevronDown size={20} />
			</div>
			{!!filters.kinds.length && <div className='filter-generic-button desktopOnly' style={{width: '148px'}}>
				<p>Categorias</p>
				<ChevronDown size={20} />
			</div>}
			<div ref={colorsButtonRef} onClick={() => setColorsModalOpen(!colorsModalOpen)} className='filter-generic-button desktopOnly' style={{width: '130px'}}>
				<p>{filterStore?.colors?.length === 0 ? 'Cor' : filterStore?.colors?.length === 1  ?  `${filterStore?.colors[0]}` : `${filterStore?.colors[0]} +${filterStore?.colors?.length - 1}`}</p>
				<ChevronDown size={20} />
			</div>
			<div ref={colorsModalRef} className={`generic-filter-modal color-quick-filter-modal ${colorsModalOpen ? 'generic-filter-modal-open' : ''} desktopOnly`}>
				{
					filters.colors
					? filters.colors.map(({ title }) => (
						<label key={title} style={{ display: 'flex' }} className='checkbox-container'>{title}
							<input type='checkbox' value={title} className='checkbox' name='colors' onChange={handleChangeCheckbox} checked={filterStore.colors.includes(title)} />
							<span className='checkmark' ></span>
						</label>
					))
					: null
				}
			</div>
			<div ref={shiftsButtonRef} onClick={() => setShiftsModalOpen(!shiftsModalOpen)} className='filter-generic-button desktopOnly' style={{width: '200px'}}>
				<p>{filterStore?.shifts?.length === 0 ? 'Câmbio' : filterStore?.shifts?.length === 1  ?  `${filterStore?.shifts[0]}` : `${filterStore?.shifts[0]} +${filterStore?.shifts?.length - 1}`}</p>
				<ChevronDown size={20} />
			</div>
			<div ref={shiftsModalRef} className={`generic-filter-modal shift-quick-filter-modal ${shiftsModalOpen ? 'generic-filter-modal-open' : ''} desktopOnly`}>
				{
					filters.shifts
					? filters.shifts.map(({ title }) => (
						<label key={title} style={{ display: 'flex' }} className='checkbox-container'>{title}
							<input type='checkbox' value={title} className='checkbox' name='shifts' onChange={handleChangeCheckbox} checked={filterStore.shifts.includes(title)} />
							<span className='checkmark' ></span>
						</label>
					))
					: null
				}
			</div>
		</div>
		<SideOverlay open={filtersOpen} onClose={closeSideBarHandler} title='Filtros' >
			<div className='side-filters-container' >
				<div className='filters-search-input-container'>
					<Search size={16} style={{ marginLeft: '12px', marginRight: '12px' }} />
					<input type='text' value={awaitSearchInput} onChange={(e) => setAwaitSearchInput(e.target.value)} placeholder='Buscar' />
				</div>
				<div className='location-filters-container' >
					<div style={{width: '30%'}} >
						<SelectButton current={filterStore?.stateStrings?.length === 0 ? 'Estado' : filterStore?.stateStrings?.length === 1  ?  `${filterStore?.stateStrings[0]}` : `${filterStore?.stateStrings[0]} +${filterStore?.stateStrings?.length - 1}`} onClick={() => setStateSideOptions(true)} />
					</div>
					<div style={{width: '65%'}} >
						<SelectButton 
							current='Cidade' 
							onClick={() => {
								if(filterStore.stateStrings?.length){
									setCitySideOptions(true)
								}
							}} 
							disabled={!filterStore.stateStrings?.length}
						/>
					</div>
				</div>
				<div>
					<SelectButton 
						current={filterStore?.units?.length === 0 ? 'Unidades' : filterStore?.units?.length === 1  ?  `${units.find(unit => unit.id === Number(filterStore?.units[0])).display_name}` : `${units.find(unit => unit.id === Number(filterStore?.units[0])).display_name} +${filterStore?.units?.length - 1}`}
						onClick={() => setUnitsSideOptions(true)}
					/>
				</div>
				<h4>Marcas</h4>
				<div className='brand-cards-button-container'>
					{
						fixedBrands.slice(0, 9).map((brand, idx) => (
							<label key={`${brand.title} - ${idx}`} className='brand-button-checkbox-container'>
								<input 
									type='checkbox' 
									value={brand.title} 
									className='hidden-checkbox' 
									name='brands' 
									onChange={handleChangeCheckbox} 
									checked={filterStore.brands.includes(brand.title)}	
								/>
								<div className='brand-card-button'>
									<Image 
										src={`/makes/${brand.title
											.toLowerCase()
											.replace(/\s+/g, '-')}.png`}
										alt={brand.title}
										width={40}
										height={40}
									/>
									<p>{brand.title}</p>
								</div>
							</label>
						))
					}
				</div>
				<button className='show-brands-button' onClick={() => setBrandsSideOptions(true)} >Ver todas</button>
				<SelectButton 
					current='Selecionar modelos' 
					onClick={() => {
						if(filterStore.brands?.length){
							setModelsSideOptions(true)
						}
					}} 
					disabled={!filterStore.brands?.length}
				/>
				<div className='general-filters-divider'></div>
				<h4>Faixa de preço</h4>
				<div>
					<div className='initial-price-range-container' >
						<button 
							className={`filter-price-range-button ${filterStore.selectedPriceRange === 1 ? 'filter-price-range-button-selected' : ''}`} 
							style={{width: '45%'}}
							onClick={() => handleSelectPriceRange(1)}	
						>Até R$ 50.000</button>
						<button 
							className={`filter-price-range-button ${filterStore.selectedPriceRange === 2 ? 'filter-price-range-button-selected' : ''}`}
							style={{width: '45%'}}
							onClick={() => handleSelectPriceRange(2)}	
						>Até R$ 100.000</button>
					</div>
					<button 
						className={`filter-price-range-button ${filterStore.selectedPriceRange === 3 ? 'filter-price-range-button-selected' : ''}`}
						style={{width: '100%'}}
						onClick={() => handleSelectPriceRange(3)}	
					>Acima de R$ 100.000</button>
					<div className='price-range-inputs-container' >
						<div className='filter-generic-input-container'>
							<div>
								<label htmlFor='minor-price-input' className='filter-default-label' >Menor preço</label>
								<CurrencyInput
									id='minor-price-input'
									onChange={(e) => setAwaitMinPriceInput(e)}
								/>
							</div>
						</div>
						<div className='filter-generic-input-container filter-generic-input-container-right' >
							<div>
								<label htmlFor='major-price-input' className='filter-default-label' >Maior preço</label>
								<CurrencyInput
									id='major-price-input'
									onChange={(e) => setAwaitMaxPriceInput(e)}
									max
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='general-filters-divider'></div>
				<h4>Ano</h4>
				<div className='year-range-inputs-container' >
					<div className='filter-generic-input-container'>
						<div>
							<label htmlFor='initial-year-input' className='filter-default-label' >Ano inicial</label>
							<input 
								type='number'
								className='filter-default-input' 
								id='initial-year-input' 
								placeholder='2015'
								maxLength={4}
								onChange={(e) => handleChangeYear(e, 'minYear')}
							/>
						</div>
					</div>
					<div className='filter-generic-input-container filter-generic-input-container-right' >
						<div>
							<label htmlFor='final-year-input' className='filter-default-label' >Ano final</label>
							<input 
								type='number'
								className='filter-default-input' 
								id='final-year-input' 
								placeholder='2020'
								maxLength={4}
								onChange={(e) => handleChangeYear(e, 'maxYear')}
							/>
						</div>
					</div>
				</div>
				<div className='general-filters-divider'></div>
				<div>
					<h4 className='checkboxes-title' >Câmbio</h4>
					{
						filters.shifts
						? filters.shifts.map(({ title }) => (
							<label key={title} style={{ display: 'flex' }} className='checkbox-container'>{title}
								<input type='checkbox' value={title} className='checkbox' name='shifts' onChange={handleChangeCheckbox} checked={filterStore.shifts.includes(title)} />
								<span className='checkmark' ></span>
							</label>
						))
						: null
					}
				</div>
				<div className='general-filters-divider'></div>
				<div>
					<h4 className='checkboxes-title'>Cores</h4>
					{
						filters.colors
						? filters.colors.map(({ title }) => (
							<label key={title} style={{ display: 'flex' }} className='checkbox-container'>{title}
								<input type='checkbox' value={title} className='checkbox' name='colors' onChange={handleChangeCheckbox} checked={filterStore.colors.includes(title)} />
								<span className='checkmark' ></span>
							</label>
						))
						: null
					}
				</div>
				<div className='general-filters-clear-filters'>
					<button onClick={handleClearFilters}>Limpar filtros</button>
					<button onClick={closeSideBarHandler} className='mobileOnly applyFiltersButton'> Aplicar filtros </button>
				</div>
			</div>
			<SideOptions title='Marcas' onClose={() => setBrandsSideOptions(false)} open={brandsSideOptions}>
				{
					fixedBrands
					? fixedBrands.map(({ title }, idx) => (
						<label key={`${title} - ${idx}`} style={{ display: 'flex' }} className='checkbox-container'>{title}
							<input 
								type='checkbox' 
								value={title} 
								name='brands' 
								onChange={handleChangeCheckbox} 
								className='checkbox'
								checked={filterStore.brands.includes(title)}	
							/>
							<span className='checkmark' ></span>
						</label>
					))
					: null
				}
			</SideOptions>
			<SideOptions title='Estados' onClose={() => setStateSideOptions(false)} open={stateSideOptions}>
				{
					locationFilters
					? Object.entries(locationFilters).map((state) => (
						<label key={state[0]} style={{ display: 'flex' }} className='checkbox-container'>{state[0]}
						<input 
							type='checkbox' 
							value={getIdsFromState(state[1])}
							name='states' 
							onChange={(e) => handleChangeCheckboxInBatch(e, state[0])}
							checked={filterStore.stateStrings.includes(state[0])}
							className='checkbox'
						/>
						<span className='checkmark' ></span>
					</label>
					))
					: null
				}
			</SideOptions>
			<SideOptions title='Cidades' onClose={() => setCitySideOptions(false)} open={citySideOptions}>
				{
					filterStore.stateStrings.map((stateString) => (
						<React.Fragment key={stateString}>
							{Object.entries(locationFilters[stateString]).map((city) => (
								<label key={city[0]} style={{ display: 'flex' }} className='checkbox-container'>{city[0]}
									<input 
										type='checkbox' 
										value={city[1]}
										name='cities' 
										onChange={handleChangeCheckboxInBatch}
										className='checkbox'
									/>
									<span className='checkmark' ></span>
								</label>
							))}
						</React.Fragment>
					))
				}
			</SideOptions>
			<SideOptions title='Unidades' onClose={() => setUnitsSideOptions(false)} open={unitsSideOptions}>
				{
					units.map((unit, index) => (
						<React.Fragment key={index}>
							<label key={unit.display_name} style={{ display: 'flex' }} className='checkbox-container'>{unit.display_name}
								<input 
									type='checkbox' 
									value={unit.id}
									name='units' 
									onChange={handleChangeCheckbox}
									className='checkbox'
									checked={filterStore.units.includes(unit.id.toString())}
								/>
								<span className='checkmark'></span>
							</label>
						</React.Fragment>
					))
				}
			</SideOptions>
			<SideOptions title='Modelos' onClose={() => setModelsSideOptions(false)} open={modelsSideOptions}>
				{
					filterStore.brands.map((brand) => (
						<React.Fragment key={brand} >
							{filters.models[brand].map(({ title }) => (
								<label key={title} style={{ display: 'flex' }} className='checkbox-container'>{title}
									<input 
										type='checkbox' 
										value={title} 
										name='models' 
										onChange={handleChangeCheckbox} 
										checked={filterStore.models.includes(title)}
										className='checkbox'
									/>
									<span className='checkmark' ></span>
								</label>
							))}
						</React.Fragment>
					))
				}
			</SideOptions>
		</SideOverlay>
    </div>
)}