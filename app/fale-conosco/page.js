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

      <div className={stylesPage.containerLimit}>
        <div className={styles.storesListContactus}>
          <div className={styles.headerList}>
            <div className={styles.headerContentList}>
              <h3 className={`${styles.listTitle} desktopOnly`}>Nossas lojas</h3>
              <div className={`${styles.listTitle} mobileOnly`}>Lojas e contatos</div>
              <div className={styles.listSubtitle}>Busque a loja desejada e configura as formas de contato.</div>
            </div>

            {/* aqui vai o select de estado */}
          </div>
        </div>

        <div className="store-contact-list">
          {units.entries.slice(0, 3).map((item, index) => (
            <div key={index} className="store-contact-card">
              <div className="store-contact-title">{item.display_name}</div>
              <div className="store-contact-subtitle">{item.complete}</div>

              <div className="space-divider">
                <div className="contact-page-divider"></div>

                <div
                  className="title-section-card"
                >Atendimento</div>
              </div>

              <div className='product-page-details'>
                {item.item_phones.map((phone, indexPhone) => (
                  <>
                    <div key={indexPhone} className='label-value'>
                      <div className='product-page-text-light'>{phone.name}</div>
                      <div className='text-bold'>{phone.number}</div>
                    </div>

                    {item.item_phones.length !== indexPhone + 1 && <div className='product-page-side-divider'></div>}
                  </>
                ))}
              </div>

              <div className='product-page-text-light'>Dias úteis: 9h às 17h</div>
              <div className='product-page-text-light'>Sábados: 8h às 12h</div>

              <div className='link-map'>
                <Link
                  href={item.map_url}
                  target='_blank'
                >
                  Ver no mapa
                </Link>

                <MapPin size={20}/>
              </div>
            </div>
          ))}
          <Link href='/nossas-lojas'>
            <div className="viewMoreButton">
              Ver mais
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
