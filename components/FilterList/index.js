'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import axios from 'axios'
import { ChevronDown } from 'lucide-react'

import { ProductCard } from '../ProductCard'
import ProductCardSkeleton from '../ProductCard/skeleton'
import { useStore } from "@/src/filtersStore"
import { isClickInside } from '@/src/helpers'

import './index.css'

const queryClient = new QueryClient()

const FilterList = () => {
  const filterStore = useStore();
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [orderLabel, setOrderLabel] = useState('Mais relevantes')
  const orderModalRef = useRef(null);
  const openOrderModalButtonRef = useRef(null);

  const backDropHandler = (e) => {
    if (!isClickInside(e, orderModalRef.current) && !isClickInside(e, openOrderModalButtonRef.current)) {
      setOrderModalOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', backDropHandler);
    return () => window.removeEventListener('click', backDropHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error
  } = useInfiniteQuery(
    ['vehicleList', filterStore],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_apiBaseUrl}/v1/groups/${process.env.NEXT_PUBLIC_apiChannel}/used_models`, {
        params: {
          'q[active_eq]': true,
          'q[new_vehicle_eq]': false,
          'per_page': 16,
          // 'sort': `-pictures_count,${filterStore.sort}`, 
          'sort': `${filterStore.sort}`, 
          'q[unit_id_in]': filterStore.cities.length ? [...filterStore.cities, ...filterStore.units] : [...filterStore.states, ...filterStore.units],
          'q[brand_in]': filterStore.brands,
          'q[model_in]': filterStore.models,
          'q[price_value_gteq]': filterStore.minPrice,
          'q[price_value_lteq]': filterStore.maxPrice,
          'q[fabrication_year_gteq]': filterStore.minYear,
          'q[fabrication_year_lteq]': filterStore.maxYear,
          'q[brand_or_name_or_version_or_model_or_plate_cont]': filterStore.textSearch, 
          'q[exchange_in]': filterStore.shifts,
          'q[color_in]': filterStore.colors,
          page: pageParam
        },
        headers: {
          Authorization: process.env.NEXT_PUBLIC_apiToken
        }
      });
      return data
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if(!lastPage.last_page){
          return pages.length + 1
        }else {
          return undefined
        }
      },
    }
  )

  const handleChangeOrder = (label, value) => {
    setOrderLabel(label);
    useStore.setState({...filterStore, sort: value});
    setOrderModalOpen(false);
  }

  return (
    <div>
      <div className='number-and-order-container' >
        <p className='found-vehicles-number desktopOnly'>
          Veículos encontrados {!(data?.pages?.length == 1 && data?.pages[0].entries.length == 0) ? (data?.pages[0].total || '...') : '0'}
        </p>
        <p className='found-vehicles-number mobileOnly'>{data?.pages[0].total || 0} veículos</p>
        <div className='list-order-select'>
          <span className='desktopOnly'>Ordenar por</span>
          <button ref={openOrderModalButtonRef} onClick={() => setOrderModalOpen(!orderModalOpen)}>{orderLabel} <ChevronDown /> </button>
          <div className={`order-modal ${orderModalOpen ? 'order-modal-open' : ''}`} ref={orderModalRef}>
            <button className='button-order' onClick={() => handleChangeOrder('Mais relevantes', '-ordination')}>Mais relevantes</button>
            <button className='button-order' onClick={() => handleChangeOrder('Menor preço', 'price_value')}>Menor preço</button>
            <button className='button-order' onClick={() => handleChangeOrder('Maior preço', '-price_value')}>Maior preço</button>
            <button className='button-order' onClick={() => handleChangeOrder('Menor quilometragem', 'km_value')}>Menor quilometragem</button>
            <button className='button-order' onClick={() => handleChangeOrder('Adicionados recentemente', '-created_at')}>Adicionados recentemente</button>
          </div>
        </div>
      </div>
      {status === 'loading' ? (
        <div className='vehicles-container'>
          {new Array(16).fill(0).map((x, idx) => <ProductCardSkeleton key={idx} />)}  
        </div>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className='vehicles-container'>
            {
              (data?.pages?.length == 1 && data?.pages[0].entries.length == 0)
              ? <div>
                <p style={{fontWeight: '600'}}>Ops! No momento não encontramos nenhuma oferta com esses parâmetros.</p>
              </div>
              : data.pages.map((page) => (
                <React.Fragment key={page.nextId}>
                  {page.entries.map((vehicle) => (
                    <ProductCard 
                      key={vehicle.id}
                      {...vehicle}
                      imageUrl={vehicle.profile_image.url}
                      address={vehicle.item_unit.address}
                      oldPrice={vehicle.old_price}
                    />
                  ))}
                </React.Fragment>
              ))
            }
          </div>
          <div className='load-more-container'>
            {hasNextPage && 
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Carregando mais...'
                  : 'Ver mais veiculos'}
              </button>
            }
            {(!(data?.pages?.length == 1 && data?.pages[0].entries.length == 0) && !hasNextPage) && <div>Fim da busca</div>}
          </div>
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterList />
    </QueryClientProvider>
  )
}