import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Poppins } from 'next/font/google';

import StoreInitializer from '@/components/StoreInitializer';
import { useStore } from '@/src/store';
import SearchInput from '@/components/SearchInput';
import Footer from '@/components/Footer';

import './globals.css'
import styles from './page.module.css'; 
import { ContactModal } from '@/components/ContactModal';
import { ContactModalPhone } from '@/components/ContactModalPhone';
import MobileNavBar from '@/components/MobileNavBar';
// import { StateModal } from '@/components/StateModal';

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Seminovos é no Grupo Carmais',
  description: 'Seminovos com as melhores taxas e ofertas, você só encontra na Carmais. Clique aqui e confira!',
  alternates: {
    canonical: '/'
  }
}

async function fetchData() {

  const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/groups/${process.env.apiChannel}`, {
    headers: {
      Authorization: process.env.apiToken
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

async function fetchWhatsapp() {


    const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/channel_whatsapps?q[channel_id_eq]=${process.env.apiChannel}`,  {
      headers: {
        Authorization: process.env.apiToken
      }
    })
    return data


}

export default async function RootLayout({ children }) {

  const [dealerInfo, units, whatsappInfo] = await Promise.all([fetchData(), fetchUnits(), fetchWhatsapp()]);

  useStore.setState({
    name: dealerInfo.name, 
    aboutUsTitle: dealerInfo.about_us_title, 
    privacyPolicy: dealerInfo.privacy_policy,
    aboutUsText: dealerInfo.about_us_text,
  });

  return (
    <html lang="en" className={poppins.className}>
      <link rel="shortcut icon" href="/favicon.png" />
      <head>
        <Script src='./gtm.js'></Script>
        <noscript>
          <Image alt='gtm' height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=4914073118647269&amp;ev=PageView&amp;noscript=1" />
        </noscript>
        <meta name="facebook-domain-verification" content="011pqymcxb969sst41xx4fa1frfthy" />
        <noscript>
          <Image alt='gtm' height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=396629405219841&amp;ev=PageView&amp;noscript=1" />
        </noscript>
        <noscript>
          <Image alt='gtm' height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=2063642747133950&amp;ev=PageView&amp;noscript=1" />
        </noscript>
        <meta name="facebook-domain-verification" content="zuvw6z1cc28vf1bwfy7zdd7hgpn5yy"></meta>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-10952882271" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-10952882271" />
      </head>
      <body>
        <StoreInitializer 
          privacyPolicy={dealerInfo.privacy_policy} 
          indexBanners={dealerInfo.index_banners.map((bannerObject) => ({
            desktopUrl: bannerObject.item_image.main_image,
            mobileUrl: bannerObject.item_image.mobile_image,
            title: bannerObject.title,
          }))}
          whatsappInfo={whatsappInfo.entries}
          phoneInfo={dealerInfo.item_phones}
          aboutUsTextHTML={dealerInfo.about_us_text}
        />
        <div className={`${styles.preHeader}`}>
          <div className={`${styles.containerLimit} ${styles.preHeaderContent}`} >
            {/* <StateModal units={units.entries} /> */}

            <div className={styles.socialLinksContainer}>
              <ContactModal />
              <ContactModalPhone />
            </div>
          </div>
        </div>
        <header className={`${styles.headerContainer}`} >
          <div className={`${styles.headerContent} ${styles.containerLimit}`} >
            <Link href='/' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Image 
                src='/logo-principal.png' 
                alt='Imagem logo'
                width={130}
                height={48}
              />
            </Link>
            <ul className='desktopOnly'> 
              <li className={`${styles.headerLink}`}>
                <Link href='/seminovos'>Quero Comprar</Link>
              </li>
              <li className={`${styles.headerLink}`}>
                <Link href='/nossas-lojas'>Nossas Lojas</Link>
              </li>
              <li className={`${styles.headerLink}`}>
                <Link href='/fale-conosco'>Fale Conosco</Link>
              </li>
            </ul>
            <SearchInput />
            <MobileNavBar />
          </div>
        </header>
        {children}
        <Footer />
        <div id='modal-root'></div>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52QPWRD\%22\r\nheight=\%220\"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          ></iframe>
        </noscript>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52QPWRD"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}>
          </iframe>
        </noscript>
      </body>
    </html>
  )
}
