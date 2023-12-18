'use client'

import React, { useState } from 'react'
import { Phone } from 'lucide-react'

import { useStore } from '@/src/store'
import stylesPage from '../../app/page.module.css'
import styles from './styles.module.css'
import SideRightOverlay from '../SideRightOverlay'

export const ContactModalPhone = ({ backgroundPrimary = false }) => {
  const [open, setOpen] = useState(false)
  const { phoneInfo } = useStore();

  const redirect = (link) => {
    window.open(
      link,
      '_blank'
    );
  }

  return (
    <>
      <div className={stylesPage.socialLinkButton} style={{backgroundColor: backgroundPrimary ? 'var(--primary)' : 'var(--gray-1)'}} onClick={() => setOpen(true)}>
        <Phone size={16} color={backgroundPrimary ? 'white' : 'black'} />
      </div>
      <SideRightOverlay open={open} onClose={() => setOpen(false)} title='Contatos'>
      <div style={{marginBottom: '76px'}}>
        {phoneInfo.map((item, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #CED4DA',
              padding: '16px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div className={styles.textLight}>{item.name}</div>
              <div className={styles.textBold}>{item.number}</div>
            </div>

            <div onClick={() => redirect(`tel:55${item.number.replace(/[^A-Z0-9]/ig, "")}`)} className={styles.buttonToTalk}>Ligar</div>
          </div>
        ))}
      </div>
      </SideRightOverlay>
    </>
  )
}