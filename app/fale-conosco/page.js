import axios from 'axios';
import stylesPage from '../page.module.css';
import styles from './styles.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from "lucide-react";
import './index.css';
import ContactUsForm from "@/components/ContactUsForm";
import ContactUsBanner from '@/components/ContactUsBanner';

export const metadata = {
  alternates: {
    canonical: '/fale-conosco'
  }
}

const fetchUnits = async () => {
  const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/groups/${process.env.apiChannel}/units`,  {
    headers: {
      Authorization: process.env.apiToken
    }
  })

  return data
}

export default async function ContactUs() {
  const units = await fetchUnits();
  return (
    <div>
      <ContactUsBanner />

      <div className={styles.containerForm }>
        <h1 className={styles.titleContactus}>Como podemos te ajudar?</h1>
        <h2 className={styles.subtitleContactus}>Para entrar em contato, basta completar as informações abaixo e um de nossos representantes entrará em contato com você.</h2>
      
        <ContactUsForm units={units}/>
      </div>

    </div>
  )
}
