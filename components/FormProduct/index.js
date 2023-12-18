'use client'

import React, { useState, forwardRef } from "react";
import "./styles.css";
import getUTM from '@/src/utils/utm';
import { IMaskInput } from 'react-imask';
import { autodromo } from '@/services/autodromo';


// eslint-disable-next-line react/display-name
const PhoneMask = forwardRef((props, ref) => {
	const { onchange, ...other } = props

	return (
		<IMaskInput
			{...other}
			mask='(##) #####-####'
			definitions={{
				'#': /[0-9]/,
			}}
			inputRef={ref}
			overwrite
		/>
	)
})

const pillOptions = [
  {label: 'Whatsapp', value: 'whatsapp'}, 
  {label: 'Telefone', value: 'phoning'}
]

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const validateForm = (form) => {
  if(!(form.name.length > 0 && form.name.length > 0 && form.name.length > 0 && (form.mailing || form.phoning || form.whatsapp))){
    return 'Preencha todos os campos.'
  }
  if(!emailRegex.test(form.email)){
    return 'Preencha um e-mail válido.'
  }
  if(form.phone.length < 10){
    return 'Preencha um telefone válido.'
  }
  return ''
} 

const LoadingSpin = () => (<div class="lds-ring-button"><div></div><div></div><div></div><div></div></div>)

export default function FormProduct({ title, subtitle, price, plate, unit, brand,  }) {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: 'UsedModel',
    mailing: false,
    phoning: false,
    whatsapp: false,
    'data-permissions': true, 
    bait: '-3',
    product: title, 
    brand: brand, 
    unit: unit,
    plate: plate,
    utmz: getUTM(),
    origin: process.env.NEXT_PUBLIC_apiChannelOrigin
  })
  const [error, setError] = useState('')
  const [leadSent, setLeadSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeValues = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async () => {
    const errorMessage = validateForm(form);
    if(!errorMessage.length){
      try {
        setLoading(true)

        await autodromo.post(`/v1/autoracing`, form)
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          category: 'UsedModel',
          mailing: false,
          phoning: false,
          whatsapp: false,
          'data-permissions': true, 
          bait: '-3',
          product: title, 
          brand: brand,
          utmz: getUTM(),
          unit: unit,
          plate: plate,
          origin: process.env.NEXT_PUBLIC_apiChannelOrigin
        })
        setLoading(false);
        setLeadSent(true);
      } catch (error) {
        setError('Erro ao enviar seus dados.')
      }
    }else{
      setError(errorMessage)
    }
  }

  return (
    <>
      <div className="sale-container-form desktopOnly" id="form-div" >
        <div className="header-sale-card">
          {/* BADGES NAO RECEBIDAS DA API */}
          {/* <div className="label-special-offer">Oferta especial</div>
          <div className="label-premium">Premium</div> */}
          {/* <div className="text-light" style={{ width: 'max-content' }}>Cód. 6EMT7</div> */}
        </div>

        <div className="product-infos">
          <div className="product-title">{title}</div>
          <div className="product-subtitle">{subtitle}</div>
          {/* <div className="product-before-price">R$ 61.570</div> */}

          <div className="price-box">
            <div className="product-after-price">R$ {price}</div>
            {/* <div className="discount-label">10% OFF</div> */}
          </div>
        </div>

        <div className="divider-sale-card"></div>

        <div className="form-container">
          <div className="form-title">Preencha suas informações para entrarmos em contato.</div>

          <div className="inputs-box">
            <input 
              className="input-form-sale" 
              placeholder="Nome" 
              name="name" 
              value={form.name}
              onChange={handleChangeValues} 
              onFocus={() => {setError(''); setLeadSent(false)}}
            />
            <input 
              className="input-form-sale" 
              placeholder="Seu melhor e-mail" 
              value={form.email}
              name="email" 
              onChange={handleChangeValues} 
              onFocus={() => {setError(''); setLeadSent(false)}}
            />
            <PhoneMask 
              className="input-form-sale" 
              placeholder="Telefone" 
              value={form.phone}
              name="phone" 
              onChange={handleChangeValues} 
              onFocus={() => {setError(''); setLeadSent(false)}}
            />
            <textarea className="input-form-sale-area" placeholder="Sua mensagem" value={form.message} name="message" onChange={handleChangeValues} />
          </div>
        </div>

        <div className="contact-box">
          <div className="title-contact">Quero receber contato por</div>

          <div className="pill-box">
            {pillOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => {setForm({...form, [item.value]: !form[item.value]}); setError(false)}}
                className={form[item.value] ? "selected-pill-contact" : "pill-contact"}
              >{item.label}</div>
            ))}
          </div>

          <div className="terms-text">Ao informar meus dados, eu concordo com a Política de privacidade.</div>
          {error.length > 0 && <span className="product-page-error-message">{error}</span>}
          {leadSent && <span className="product-page-lead-sent-message">Sua solicitação foi realizada com sucesso</span>}
          <div className="send-form-button" onClick={handleSubmit}>{loading ? <LoadingSpin /> : 'Enviar'}</div>
        </div>
      </div>

      <div className="sale-container-form-mobile mobileOnly">
        <div className="form-container">
          <div className="form-title">Preencha suas informações para entrarmos em contato.</div>

          <div className="inputs-box">
            <input 
              className="input-form-sale" 
              placeholder="Nome" 
              name="name" 
              value={form.name}
              onChange={handleChangeValues} 
              onFocus={() => {setError(''); setLeadSent(false)}}
            />
            <input 
              className="input-form-sale" 
              placeholder="Seu melhor e-mail" 
              value={form.email}
              name="email" 
              onChange={handleChangeValues} 
              onFocus={() => {setError(''); setLeadSent(false)}}
            />
            <PhoneMask 
              className="input-form-sale" 
              placeholder="Telefone" 
              value={form.phone}
              name="phone" 
              onChange={handleChangeValues} 
              onFocus={() => {setError(''); setLeadSent(false)}}
            />
            <textarea className="input-form-sale-area" placeholder="Sua mensagem" value={form.message} name="message" onChange={handleChangeValues} />
          </div>

          <div className="contact-box">
            <div className="title-contact">Quero receber contato por</div>

            <div className="pill-box">
            {pillOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => {setForm({...form, [item.value]: !form[item.value]}); setError(false)}}
                className={form[item.value] ? "selected-pill-contact" : "pill-contact"}
              >{item.label}</div>
            ))}
            </div>

            <div className="terms-text">Ao informar meus dados, eu concordo com a Política de privacidade.</div>

            {error.length > 0 && <span className="product-page-error-message">{error}</span>}
            {leadSent && <span className="product-page-lead-sent-message">Sua solicitação foi realizada com sucesso</span>}
            <div className="send-form-button" onClick={handleSubmit}>{loading ? <LoadingSpin /> : 'Enviar'}</div>
          </div>
        </div>
      </div>
    </>
  )
}
