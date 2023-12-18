'use client'

import React, { useState } from 'react'

import { useStore } from '@/src/store'
import Whatsapp from '@/public/Whatsapp'
import stylesPage from '../../app/page.module.css'
import styles from './styles.module.css'
import SideRightOverlay from '../SideRightOverlay'

export const ContactModal = () => {
  const [open, setOpen] = useState(false)
  const { whatsappInfo } = useStore();

  const redirect = (link) => {
    window.open(
      link,
      '_blank'
    );
  }

  return (
    <>
      <div className={stylesPage.socialLinkButton} style={{backgroundColor: '#25D366'}} onClick={() => setOpen(true)}>
        <Whatsapp />
      </div>
      <SideRightOverlay open={open} onClose={() => setOpen(false)} title='Contatos'>
      {whatsappInfo.map((item, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #CED4DA',
            padding: '16px',
            marginBottom: whatsappInfo.length == index + 1 ? '72px': ''
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
            <div className={styles.textBold}>{item.number.substring(4)}</div>
          </div>

          <div onClick={() => redirect(`https://wa.me/${item.number.replace(/[^A-Z0-9]/ig, "")}?text=${item.message}`)} className={styles.buttonToTalk}>Conversar</div>
        </div>
      ))}
      </SideRightOverlay>
    </>
  )
}
