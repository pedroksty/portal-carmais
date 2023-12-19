'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react';
import './index.css'

const cardsStore = [

  {
    Image: 'https://i.imgur.com/CEs96f4.jpg',
    Titulo: 'Nissan Jangada Júlio Ventura',
    SubTitulo: 'Av. Júlio Ventura, 200 - Aldeota, Fortaleza - CE, 60140-230',
    Telefone: '(85) 3391-6000',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda a sexta 08h às 18h e sábado 08h às 15h',
    Mapa: 'https://maps.app.goo.gl/tqc73MKcKfuAe2Ff6'
  },

  {
    Image: 'https://i.imgur.com/Th2bSal.jpg',
    Titulo: 'Nissan Jangada Washington Soares',
    SubTitulo: 'Av. Washington Soares, 2055 - Edson Queiroz, Fortaleza - CE, 60811-341',
    Telefone: '(85) 3306-8686',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda a sexta 08h às 18h e sábado 08h às 15h',
    Mapa: 'https://maps.app.goo.gl/XiKn3n72yEJ6cgjm6'
  },

  {
    Image: 'https://i.imgur.com/Ux2dZDV.jpg',
    Titulo: 'Jangada Renault',
    SubTitulo: 'Av. Júlio Ventura, 100 - Aldeota, Fortaleza - CE, 60150-050',
    Telefone: '(85) 3306-8600',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda a sexta 08h às 18h e sábado 08h às 13h',
    Mapa: 'https://maps.app.goo.gl/snXwS4iUbGV2qacZA~'
  },

  {
    Image: 'https://i.imgur.com/fFcOVZS.jpg',
    Titulo: 'Vouga Fiat',
    SubTitulo: 'Av. Júlio Ventura, 101 - Aldeota, Fortaleza - CE, 60140-231',
    Telefone: '(85) 3306.8800',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/qL4fQD8AJxXSjP2A7'
  },

  {
    Image: 'https://i.imgur.com/OlNxXwv.jpg',
    Titulo: 'Sanauto',
    SubTitulo: 'Av. Barão de Studart, 1630 - Aldeota, Fortaleza - CE, 60120-001',
    Telefone: '(85) 3306-7700',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'Atualizar horário de Funcionamento: segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/ofKu5z2etTjG1Ho89'
  },

  {
    Image: 'https://i.imgur.com/gJb5iMo.jpg',
    Titulo: 'Carmais Seminovos Júlio Ventura',
    SubTitulo: 'Av. Júlio Ventura, 201 - Aldeota, Fortaleza - CE, 60140-231',
    Telefone: '(85) 3306-8889',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/eJ94SGpWzWY9hCa46'
  },

  {
    Image: 'https://i.imgur.com/wyDYWjV.jpg',
    Titulo: 'Honda Novaluz Barão de Studart',
    SubTitulo: 'Av. Barão de Studart, 345 - Aldeota, Fortaleza - CE, 60120-000',
    Telefone: '(85) 3306-8400',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/1QnmNfHScHLkNgy57'
  },

  {
    Image: 'https://i.imgur.com/loeIDMg.jpg',
    Titulo: 'Honda Novaluz Santos Dumont',
    SubTitulo: 'Av. Santos Dumont, 6610 - Cocó, Fortaleza - CE, 60192-022',
    Telefone: '(85) 3306-8484',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/D42zNAtYhfStD1Ft5'
  },

  {
    Image: 'https://i.imgur.com/9mcdcbK.jpg',
    Titulo: 'Honda Novaluz Água Fria',
    SubTitulo: 'Av. Washington Soares, 2891 - Edson Queiroz, Fortaleza - CE, 60811-341',
    Telefone: '(85) 3306-8300',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/NXrZfsNXELqpMSsz5'
  },

  {
    Image: 'https://i.imgur.com/J21Dnb8.jpg',
    Titulo: 'Honda Novaluz Cariri',
    SubTitulo: 'Km3 - Av. Padre Cícero, 3017 - Triângulo, Juazeiro do Norte - CE, 63041-145',
    Telefone: '(88) 3102.4200',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/ccJ39cZQXRQc4LAM8'
  },

  {
    Image: 'https://i.imgur.com/VpSgnNT.jpg',
    Titulo: 'Carmais Seminovos Matriz',
    SubTitulo: 'Av. Barão de Studart, 1846 B - Aldeota, Fortaleza - CE, 60415-510',
    Telefone: '(85) 3306-8889',
    Wpp: '(85) 98126-3833',
    Funcionamento: 'segunda à sexta-feira 08h às 18h e sábado 08h às 14h',
    Mapa: 'https://maps.app.goo.gl/ofKu5z2etTjG1Ho89'
  },
  
]

export const StoreCard = ({ map_url}) => {

  const [dadosCardStore] = useState(cardsStore)

  return (
    <>
      {dadosCardStore.map((item, index) => (
        <div key={index} className='store-page-card'>
          <Image
            src={item.Image}
            alt='car'
            width={382}
            height={200}
            className="width-image-mobile"
            style={{ 
              cursor: 'pointer', 
            borderTopLeftRadius: '8px', 
            borderTopRightRadius: '8px' 
          }}
          />
          <div className='store-details-card'>
            <div>
              <h2 className='text-extra-bold-store'>{item.Titulo}</h2>
              <h3 className='text-light-store subtitle-limit-store'>{item.SubTitulo}</h3>
            </div>

            <div className='store-card-divider'></div>

            <div className='store-card-details'>
              <div className='label-value-store' style={{ width: '100%' }}>
                <div className='text-light-store'> TELEFONE: {item.Telefone}</div>
                <div className='text-light-store'> WHATSAPP: {item.Wpp}</div>
              </div>
            </div>

            <div>
              <div className='text-light-store'>{item.Funcionamento}</div>
            </div>

            <div className='link-map-store'>
              <Link
                href={item.Mapa}
                target='_blank'
              >
                Ver no mapa
              </Link>

              <MapPin color='#c00d0d' size={20} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
