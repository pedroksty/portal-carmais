'use client'

import React, { useState, useMemo, useRef, useEffect } from "react";
import CenterOverlay from "../CenterOverlay";
import { MapPin, ChevronDown } from 'lucide-react';
import './index.css';
import Image from "next/image";
import { useStore } from "@/src/filtersStore"
import { useStore as useGlobalStore } from "@/src/store";
import { createCookieUTM } from '@/src/utils/utm';

export const StateModal = ({ units }) => {
  const [open, setOpen] = useState(false);
  const filterStore = useStore();
  const filterGlobalStore = useGlobalStore();
  const firstRender = useRef(true);
  useEffect(() => {
    if(firstRender.current){
      createCookieUTM();
      setOpen(true);
      firstRender.current = false;
    }
  }, [])

  const [idsList, setIdsList] = useState([]);
  const [state, setState] = useState('');


  //Monta o objeto de busca por estado e cidade
	const locationFilters = useMemo(() => {
		return units.reduce((acc, curr) => {
      if(curr.state == '') {
        return acc
      }
      const alreadyHas = acc.find((obj) => obj.label == curr.state);
			if(alreadyHas){
        return acc.map((option) => {
          if(option.label == alreadyHas.label){
            return {label: option.label, value: [...option.value, curr.id]}
          }else{
            return option
          }
        })
      }else{
        return [...acc, { label: curr.state, value: [curr.id] }]
      }
		}, [])
	}, [units])

  const handleSelectState = () => {
    if(state.length > 0){
      useStore.setState({...filterStore, stateStrings: [state], states: [...idsList]});
      useGlobalStore.setState({...filterGlobalStore, globalUnitIds: [...idsList]});
    }else{
      useStore.setState({...filterStore, stateStrings: [], states: []});
      useGlobalStore.setState({...filterGlobalStore, globalUnitIds: []});
    }
    setOpen(false);
  }

  const handleSelectChange = (e) => {
    const fullValues = e.target.value.split(',');
    const state = fullValues[0];
    fullValues.shift();
    setIdsList(fullValues);
    setState(state);
  }


  return (
    <div>
      <div className='locationContainer' onClick={() => setOpen(true)}>
        <MapPin color='var(--gray-1)' size={16} />
        <p>{state == '' ? 'Selecione' : state}</p>
        <ChevronDown color='var(--gray-1)' size={18} />
      </div>

      <CenterOverlay open={open} onClose={() => setOpen(false)} title=''>
        <div className="modal-content-state">
          <Image
            src="/place-modal.svg"
            alt="place"
            width={72}
            height={72}
          />

          <div className="title-modal-state">Qual o seu estado?</div>
          <div className="subtitle-modal-state">Para oferecermos resultados mais próximos de você, preencha sua localização abaixo.</div>

          <select className='locationContainerContent' onChange={handleSelectChange}>
            <option value='' >Escolha o estado</option>
            {locationFilters.map((option) => (
              <option key={option.label} value={[option.label, ...option.value]}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="search-stores-button" onClick={handleSelectState}>
            Buscar loja mais próxima
          </div>
        </div>
      </CenterOverlay>
    </div>
  )
}
