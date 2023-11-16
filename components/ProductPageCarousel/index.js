import axios from 'axios';

import ProductCarousel from '@/components/ProductCarousel';

async function fetchData(slugList) {
	const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/groups/${process.env.apiChannel}/used_models?q[active_eq]=true&q[new_vehicle_eq]=false&page=1&per_page=9&sort=-pictures_count`, {
		headers: {
			Authorization: process.env.apiToken
		},
		params: {
			'q[slug_in]': slugList
		}
	})

	if(data.entries){
		return data.entries
	}

	return []
}

export default async function ProductPageCarousel ({ slugList }) {
	const vehicleList = await fetchData(slugList);

	return (
		<ProductCarousel title='Ofertas semelhantes' vehicleList={vehicleList} />
	)
}