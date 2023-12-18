'use client'

import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useStore } from "@/src/filtersStore"
import './index.css'

export default function SearchInput({ showMobile = false }) {
	const filterState = useStore();
	const { push } = useRouter();

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			useStore.setState({...filterState, textSearch: event.target.value});
			push('/seminovos');
			event.target.value = ''
		}
	}

	return (
		<div className={`searchInputContainer ${showMobile ? '' : 'desktopOnly'}`} >
			<Search style={{ marginLeft: '12px', marginRight: '12px' }} />
			<input type='text' onKeyDown={handleKeyDown} placeholder='Busque seu veículo' />
		</div>
	)
}