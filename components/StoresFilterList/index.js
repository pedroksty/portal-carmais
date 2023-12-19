'use client'

import axios from 'axios';
import stylesPage from '../../app/page.module.css';
import { StoreCard } from '@/components/StoreCard';
import { Search } from 'lucide-react';
import './index.css'
import { useState } from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import StoreCardSkeleton from './skeleton';

const queryClient = new QueryClient()

const StoresList = () => {
  const [search, setSearch] = useState('')
  const [isMore, setIsMore] = useState(false)

  const fetchUnits = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_apiBaseUrl}/v1/groups/${process.env.NEXT_PUBLIC_apiChannel}/units`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_apiToken
      }
    })

    return data
  }

  const { isLoading, data } = useQuery({
    queryKey: ['stores'],
    queryFn: () => fetchUnits()
  })

  const filteredList = () => {
    if (!search.length) return data.entries

    const newList = data.entries.filter((item) => item.display_name.toLowerCase().includes(search.toLocaleLowerCase()))

    return newList
  }

  return (
    <main className={stylesPage.containerLimit} style={{ paddingTop: '48px' }}>
      <div className='section-header-stores'>
        <h1>Nossas Lojas</h1>

        <div className='inputHeaderContainerStores' >
          <Search style={{ marginLeft: '12px', marginRight: '12px' }} />
          <input type='text' placeholder='Buscar' onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {isLoading
        ? <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '32px',
            paddingBottom: '120px',
            flexWrap: 'wrap'
          }}
        >
          <StoreCardSkeleton />
          <StoreCardSkeleton />
          <StoreCardSkeleton />
        </div>
        : <><div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '32px',
            paddingBottom: '36px',
            flexWrap: 'wrap'
          }}
        >
          {filteredList().slice(0, 1).map((store) => (
            <StoreCard
              display_name={store.display_name}
              map_url={store.map_url}
              complete={store.complete}
              profile_image={store.item_image.url}
              item_phones={store.item_phones}
              item_hours={store.item_hours}
            />
          ))
          }
        </div>

          <div
            onClick={() => {
              if (isMore) {
                const element = document.body;

                element.scrollTop = 0;
              }
              setIsMore(!isMore)
            }}
            className="viewMoreButtonStores"
          >
            {isMore ? 'Ver menos' : 'Ver mais'}
          </div></>
      }
    </main>
  )
}

export default function StoresFilterList() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoresList />
    </QueryClientProvider>
  )
}
