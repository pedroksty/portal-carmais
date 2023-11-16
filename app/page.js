import axios from 'axios'

import IndexFilters from '@/components/IndexFilters';
import Banners from '@/components/Banners';
import FilteredIndexCaroulsel from '@/components/FilteredIndexCaroulsel'

import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function fetchFilters() {
  const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/groups/${process.env.apiChannel}/used_models_filter?new_vehicle=false`, {
    headers: {
      Authorization: process.env.apiTokenFilters
    }
  })

  return data
}

export default async function Home() {

  const [filters] = await Promise.all([fetchFilters()])

  return (
    <main className={styles.containerLimit} style={{marginTop:'16px'}}>
      <Banners />
      <div style={{display: 'flex', flexDirection: 'column', gap: '50px', marginTop: '50px', marginBottom: '160px'}}>
        <IndexFilters brands={filters.brands} kinds={filters.kinds} />
        <FilteredIndexCaroulsel />
      </div>
    </main>
  )
}