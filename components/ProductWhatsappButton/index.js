'use client'

import Whatsapp from "@/public/Whatsapp"

const ProductWhatsappButton = ({ link }) => {

  const redirect = (link) => {
    window.open(
      link,
      '_blank'
    );
  }

  return (
    <div className="whatsapp-button" onClick={() => redirect(link)} >
      Enviar mensagem
      <Whatsapp />
    </div>
  )
}
export default ProductWhatsappButton