'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react';
import './index.css'

export const StoreCard = ({ display_name, map_url, complete, profile_image, item_phones, item_hours }) => {

  return (
    <div className='store-page-card'>
      <Image 
        src={profile_image} 
        alt='car'
        width={382}
        height={200}
        className="width-image-mobile"
        style={{ cursor: 'pointer', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
      />

      <div className='store-details-card'>
        <div>
          <h2 className='text-extra-bold-store'>{display_name}</h2>
          <h3 className='text-light-store subtitle-limit-store'>{complete}</h3>
        </div>

        <div className='store-card-divider'></div>

        <div className='store-card-details'>
          {item_phones.map((item, index) => (
            <>
              <div key={index} className='label-value-store'>
                <div className='text-light-store'>{item.name}</div>
                <div className='text-bold-store'>{item.number}</div>
              </div>

              {item_phones.length !== index + 1 && <div className='side-divider-store'></div>}
            </>
          ))}
        </div>

        
        {item_hours.map((item, index) => (
          <div key={index}>
            <div className='text-light-store'>{item.title}</div>
            <div className='text-light-store'>{item.description}</div>
          </div>
        ))}

        <div className='link-map-store'>
          <Link
            href={map_url}
            target='_blank'
          >
            Ver no mapa
          </Link>

          <MapPin color='#c00d0d' size={20}/>
        </div>
      </div>
  </div>
  )
}
