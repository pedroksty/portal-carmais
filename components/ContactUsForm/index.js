'use client'

import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import { IMaskInput } from 'react-imask';

import './index.css';
import getUTM from '@/src/utils/utm';

const pillOptions = [
  {label: 'Whatsapp', value: 'whatsapp'}, 
  {label: 'Telefone', value: 'phoning'}, 
  {label: 'Email', value: 'mailing'}
]

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

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

export default function ContactUsForm({ units }) {

  const [viewForm, setViewForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    mailing: false,
    phoning: false,
    whatsapp: false,
    category: 'UsedModel',
    'data-permissions': true, 
    bait: '-3',
    product: 'Fale conosco', 
    brand: '-', 
    utmz: getUTM(),
    unit: '',
    origin: process.env.apiChannelOrigin
  })
  const [error, setError] = useState('')
  const [leadSent, setLeadSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeValues = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async () => {
    if(!viewForm){
      setViewForm(true);
      return;
    }
    const errorMessage = validateForm(form);
    if(!errorMessage.length){
      try {
        setLoading(true);
        await axios.post(`https://api.autodromo.app/v1/autoracing`, form, {
          headers: {
            Authorization: process.env.apiTokenForm
          }
        })
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          mailing: false,
          phoning: false,
          whatsapp: false,
          category: 'UsedModel',
          'data-permissions': true, 
          bait: '-3',
          product: 'Fale conosco', 
          brand: '-', 
          unit: '',
          utmz: getUTM(),
          origin: process.env.apiChannelOrigin
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

  const handleSelectChange = (e) => {
    setForm({...form, unit: e.target.value})
  }

	return (
		<div className='cardForm'>
          <div className='titleCardContactus'>Fale conosco</div>
          <div className='subtitleCardContactus'>Entraremos em contato assim que possível.</div>

          {viewForm &&
            <>
              <div className="inputs-box-contactus">
                <input 
                  className="input-form-sale-contactus" 
                  placeholder="Nome" 
                  name="name" 
                  value={form.name}
                  onChange={handleChangeValues} 
                  onFocus={() => {setError(''); setLeadSent(false)}}
                />
                <input 
                  className="input-form-sale-contactus" 
                  placeholder="Seu melhor e-mail" 
                  value={form.email}
                  name="email" 
                  onChange={handleChangeValues} 
                  onFocus={() => {setError(''); setLeadSent(false)}}
                />
                <PhoneMask 
                  className="input-form-sale-contactus" 
                  placeholder="Telefone" 
                  value={form.phone}
                  name="phone"
                  onChange={handleChangeValues} 
                  onFocus={() => {setError(''); setLeadSent(false)}}
                />
                {!!units.entries.length &&
                  <select className='locationContainerContentContact' onChange={handleSelectChange}>
                    <option value='' >Unidade</option>
                    {units.entries.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.display_name}
                      </option>
                    ))}
                  </select>
                }
                <textarea className="input-form-sale-area-contactus" placeholder="Sua mensagem" value={form.message} name="message" onChange={handleChangeValues} />
              </div>

              <div className="contact-box-contactus">
                <div className="title-contact-contactus">Quero receber contato por</div>

                <div className="pill-box-contactus">
                {pillOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {setForm({...form, [item.value]: !form[item.value]}); setError(false)}}
                    className={form[item.value] ? "selected-pill-contact-contactus" : "pill-contact-contactus"}
                  >{item.label}</div>
                ))}
                </div>

                <div className="terms-text-contactus">Ao informar meus dados, eu concordo com a Política de privacidade.</div>
              </div>
            </>
          }
          {error.length > 0 && <span className="contact-error-message">{error}</span>}
          {leadSent && <span className="contact-lead-sent-message">Sua solicitação foi realizada com sucesso</span>}
          <div onClick={handleSubmit} className='sendMessageButton'>{loading ? <LoadingSpin /> : 'Enviar mensagem'}</div>
        </div>
	)
}