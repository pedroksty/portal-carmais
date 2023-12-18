import axios from 'axios'

const autodromo = axios.create({
  baseURL: 'https://api.autodromo.app',
})

autodromo.defaults.headers.Authorization = `${process.env.NEXT_PUBLIC_apiTokenForm}`

export { autodromo }