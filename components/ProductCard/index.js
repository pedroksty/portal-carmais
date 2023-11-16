import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin, Gauge } from 'lucide-react'
import './index.css'

export const ProductCard = ({carousel = false, brand, model, imageUrl, subtitle, price, oldPrice, km, exchange, badge, address, slug}) => {
  const addressData = address.split(' - ');
  const [city, state] = addressData[addressData.length - 1].split('-'); 
  return (
    <Link href={`/seminovos/${slug}`} className={`card ${carousel ? 'used-in-carousel' : ''}`}>
      <Image 
        src={imageUrl} 
        alt='car' 
        width="280" 
        height="180"
        className='image-product-card'
        style={{cursor: 'pointer', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', objectFit: 'cover'}}
      />

      <div className='product-details-container'>
        <div>
          <div className='text-extra-bold'>{`${brand} ${model}`}</div>
          <div className='text-light subtitle-limit'>{subtitle}</div>
        </div>

        <div className='product-details'>
          <div className='label-value'>
            {oldPrice ? <div className='text-light'>{`R$ ${oldPrice}`}</div> : <div style={{height: '18px'}}></div>}
            <div className='text-extra-bold' style={{ width: '150px' }}>{`R$ ${price}`}</div>
          </div>
        </div>

        <div className='product-card-divider'></div>

        <div className='product-details'>
          <div className='icon-text'>
            <Gauge size={14} />
            <div className='text-bold'>{`${km} km`}</div>
          </div>

          <div className='icon-text'>
            <Image
              src="/Transmission.svg"
              alt="transmission"
              height={16}
              width={16}
            />
            <div className='text-bold'>{exchange}</div>
          </div>
        </div>

        <div className='product-details'>
          <div className='icon-text'>
            <CalendarDays size={14} />
            <div className='text-bold'>{badge}</div>
          </div>

          <div className='icon-text'>
            <MapPin size={14} />
            <div className='text-bold'>{`${city} - ${state}`}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
