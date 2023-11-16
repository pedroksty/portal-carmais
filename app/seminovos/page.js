import axios from 'axios'

import GeneralFilters from '@/components/GeneralFilters';
import FilterList from '@/components/FilterList';

import styles from '../page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: {
    canonical: '/seminovos'
  }
}

async function fetchFilters() {
  const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/groups/${process.env.apiChannel}/used_models_filter?new_vehicle=false`, {
    headers: {
      Authorization: process.env.apiTokenFilters
    }
  })

  return data
}

async function fetchUnits() {
  
  const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/groups/${process.env.apiChannel}/units`,  {
    headers: {
      Authorization: process.env.apiToken
    }
  })

  return data
}

export default async function Home() {
  const [filters, {entries: units}] = await Promise.all([fetchFilters(), fetchUnits()]);

  return (
    <main className={styles.containerLimit}>
      <h1 style={{ display: "none" }}>Busque seu veículo na Carmais</h1>
      <h2 style={{ display: "none" }}>Quero comprar</h2>
      <h3 style={{ display: "none" }}>Veículos encontrados</h3>
      <GeneralFilters filters={filters} units={units} />
      <FilterList />
    </main>
  )
}