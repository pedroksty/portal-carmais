'use client'

import axios from 'axios';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import ProductCarousel from '../ProductCarousel';
import ProductCarouselSkeleton from '../ProductCarousel/ProductCarouselSkeleton';
import { useStore } from '@/src/store';

const skeletonList = [1, 2, 3, 4]

const queryClient = new QueryClient()

async function fetchNewVehicles(unitsList) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_apiBaseUrl}/v1/groups/${process.env.NEXT_PUBLIC_apiChannel}/used_models?q[active_eq]=true&q[new_vehicle_eq]=false&page=1&per_page=15&q[pictures_count_gt]=0&sort=-created_at`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_apiToken
    },
		params: {
			'q[unit_id_in]': unitsList
		}
  })

  return data
}


async function fetchFeaturedVehicles(unitsList) {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_apiBaseUrl}/v1/groups/${process.env.NEXT_PUBLIC_apiChannel}/used_models?q[active_eq]=true&q[new_vehicle_eq]=false&page=1&per_page=15&sort=-featured&q[pictures_count_gt]=0`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_apiToken
    },
		params: {
			'q[unit_id_in]': unitsList
		}
  })

  return data
}

function FilteredIndexCaroulsel () {
	const { globalUnitIds } = useStore();

	const { isLoading: isNewVehiclesLoading, data: newVehicleData } = useQuery({
    queryKey: ['filteredNewVehicles', globalUnitIds],
    queryFn: () => fetchNewVehicles(globalUnitIds)
  })

	const { isLoading: isFeaturedVehiclesLoading, data: featuredVehicleData } = useQuery({
    queryKey: ['filteredFeaturedVehicles', globalUnitIds],
    queryFn: () => fetchFeaturedVehicles(globalUnitIds)
  })

	return (<>
		{
			isFeaturedVehiclesLoading
			? <ProductCarouselSkeleton title='Seminovos em destaque' />
			: <ProductCarousel title='Seminovos em destaque' vehicleList={featuredVehicleData.entries} />
		}
		{
			isNewVehiclesLoading
			? <ProductCarouselSkeleton title='Acabaram de chegar' />
			: <ProductCarousel title='Acabaram de chegar' vehicleList={newVehicleData.entries} />
		}
	</>)
	
  
}

export default function Stores() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilteredIndexCaroulsel />
    </QueryClientProvider>
  )
}
