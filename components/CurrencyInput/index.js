'use client'

import React from 'react';
import { useStore } from '@/src/inputLabelStore';
import './index.css';

export const CurrencyInput = ({ onChange, max = false }) => {
  const filterStore = useStore();

  const formatValue = (event) => {
		const eventValue = event.target.value.replace(/\D/g, '')
		const eventValueNumber = eventValue === '' ? 0 : parseFloat(eventValue) / 100

    const newCurrency = new Intl.NumberFormat('pt-BR', {
			currency: 'BRL',
			style: 'currency'
		}).format(eventValueNumber)

    useStore.setState({...filterStore, [max ? 'maxPriceLabel' : 'minPriceLabel']: `R$ ${newCurrency}`})

		event.target.value = `R$ ${eventValueNumber.toString()}`;

		if (onChange !== undefined) onChange(eventValueNumber.toString())
	}

  return (
    <input
      className='filter-default-input-currency'
      type='text'
      prefix='R$'
      placeholder='R$ 50.000,00'
      onChange={(event) => {
				formatValue(event);
			}}
      value={filterStore[max ? 'maxPriceLabel' : 'minPriceLabel'].substring(3)}
    />
  )
}
