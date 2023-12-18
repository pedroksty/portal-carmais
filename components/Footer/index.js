'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

import styles from './styles.module.css'; 
import stylesPage from '../../app/page.module.css'; 
import useWindowWidth from '@/src/useWindowWidth';

export default function Footer() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 800

  return ( 
    <footer className={`${styles.footerContainer}`}>
      <div className={`${styles.preFooter}`}>
        <div className={`${styles.preFooterContent} ${stylesPage.containerLimit}`}>
          <div className={`${styles.titleBoldWhite}`}>
            Para comprar ou vender, conte com os serviços exclusivos da Carmais.
          </div>

          <div className={`${styles.preFooterButtons}`}>
            <div className={`${styles.iconButton}`}>
              Compre ou Financie

              <Link href='/seminovos'>
                <div className={`${styles.circleIcon}`}>
                  <ChevronRight color='white'/>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.footerContent}`}>
        <div className={`${stylesPage.containerLimit}`}>
          {/* parte de cima */}
          <div className={`${styles.footerFirstContent}`}>
            <div className={`${styles.brandContent}`}>
              <div className={`${styles.brandSocialMedia}`}>
                <Link href='/' style={{display: 'flex', justifyContent: 'left', alignItems: 'left'}}>
                  <Image 
                    src='/logo-principal.png' 
                    alt='Imagem logo'
                    width={130}
                    height={48}
                  />
                </Link>

                <div className={`${styles.iconsBox}`}>
                  <a href='https://www.facebook.com/carmaisseminovos'>
                    <div className={`${styles.circleSocialIcon}`}>
                      <Image src='/Facebook.svg' alt='social-icon' width={16} height={16}/>
                    </div>
                  </a>
                  <a href='https://www.instagram.com/carmaisseminovos/'>
                    <div className={`${styles.circleSocialIcon}`}>
                      <Image src='/instagram.svg' alt='social-icon' width={16} height={16}/>
                    </div>
                  </a>
                </div>
              </div>

              <div className={`${styles.footerDivider} mobileOnly`}></div>

              <div className={`${styles.contactUs}`}>
                <div className={`${styles.titleBoldBlack}`}>Tem alguma dúvida? Fala com a gente</div>

                <Link href='/fale-conosco'>
                  <div className={`${styles.contactUsButton}`}>
                    Fale conosco
                  </div>
                </Link>
              </div>

            </div>

            <div className={`${styles.quickLinks} desktopOnly`}>
              <div className={`${styles.linksBox}`}>
                <div className={`${styles.titleLight}`}>Negocie com a gente</div>

                <Link href='/seminovos' className={`${styles.linkText}`}>
                  Comprar
                </Link>

                {/* <Link href='/' className={`${styles.linkText}`}>
                  Vender
                </Link>

                <Link href='/' className={`${styles.linkText}`}>
                  Financiar
                </Link> */}
              </div>

              <div className={`${styles.linksBox} desktopOnly`}>
                <div className={`${styles.titleLight}`}>Links rápidos</div>

                <Link href='/fale-conosco' className={`${styles.linkText}`}>
                  Fale Conosco
                </Link>

                {/* <Link href='/' className={`${styles.linkText}`}>
                  Como Funciona 
                </Link> */}

                {/* <Link href='/' className={`${styles.linkText}`}>
                  Politica de Privacidade 
                </Link> */}
              </div>
            </div>
          </div>

          <div className={`${styles.footerDivider} desktopOnly`}></div>

          <div className={`${styles.mobileQuickLinks} mobileOnly`}>
            <div className={styles.labelMobileQuickLinks}>
              Links úteis
            </div>
            <Link href='/seminovos' className={`${styles.linkText}`}>
              Comprar
            </Link>

            <Link href='/fale-conosco' className={`${styles.linkText}`}>
              Fale Conosco
            </Link>
          </div>

          {/* parte de baixo */}
          {/* <div className={`${styles.footerSecondContent} desktopOnly`}>
            <Link href='https://kantam.com.br/' target='_blank'>
              <Image alt='logo' src='/KantamLogo.svg' width={127} height={20}/>
            </Link>
            <Link href='https://viasuljeep.com.br/' target='_blank'>
              <Image alt='logo' src='/JeepLogo.svg' width={114} height={32}/>
            </Link>
            <Link href='https://interviakia.com.br/' target='_blank'>
              <Image alt='logo' src='/KiaLogo.svg' width={148} height={32}/>
            </Link>
            <Link href='https://www.eurovia.com.br/' target='_blank'>
              <Image alt='logo' src='/EuroviaRenaultLogo.svg' width={114} height={32}/>
            </Link>
            <Link href='https://www.eurovianissan.com.br/' target='_blank'>
              <Image alt='logo' src='/EuroviaNissanLogo.svg' width={105} height={32}/>
            </Link>
            <Link href='https://www.granvia.com.br/' target='_blank'>
              <Image alt='logo' src='/Granvia.svg' width={129} height={32}/>
            </Link>
            <Link href='https://www.viasul.com.br/' target='_blank'>
              <Image alt='logo' src='/FiatLogo.svg' width={102} height={32}/>
            </Link>
          </div> */}

          <div className={`${styles.footerTextLight} ${styles.textCNPJ}`}>CNPJ: 08.543.039/0001-67  - Endereço Matriz: Av. Barão de Studart, 1846 B - Aldeota, Fortaleza - CE, 60415-510</div>
        </div>

        <div className={`${styles.autocommerceFooter}`}>
          <div className={`${styles.autocommerceFooter} ${styles.containerLimit}`}>
            <div className={`${styles.autocommerceText}`}>
              Essa loja foi desenvolvida com a tecnologia <b>AutoCommerce</b> feita pela <b>AutoForce</b>
            </div>
            <a href='https://autoforce.com/?utm_source=rodapé+site&utm_medium=site&utm_campaign=carmais' target='blank' >
              <Image alt='autoforce-logo' src='/AutoforceLogo.svg' width={36} height={24}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
