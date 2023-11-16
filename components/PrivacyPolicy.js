'use client'

import { useStore } from '@/src/store';

export default function PrivacyPolicy() {
  const { privacyPolicy } = useStore();
  return (
    <>
        <h1>Politicas de privacidade</h1>
        {privacyPolicy}
    </>
  )
}