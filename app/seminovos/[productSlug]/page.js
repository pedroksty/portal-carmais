import React from "react";
import axios from 'axios';
import { ChevronRight, Calendar, MapPin, Smile, PaintBucket, Fuel, Car, Gauge, Sliders, CreditCard } from "lucide-react";
import stylesPage from '../../page.module.css';
import "./style.css";
import Link from "next/link";
import Image from "next/image";
import ProductWhatsappButton from "@/components/ProductWhatsappButton";
import ProductPageCarousel from "@/components/ProductPageCarousel";
import FormProduct from "@/components/FormProduct";
import ProductItemList from "@/components/ProductItemList";
import { ProductGallery } from "@/components/ProductGallery";

async function fetchData(slug) {
  const { data } = await axios.get(`${process.env.apiBaseUrl}/v1/groups/${process.env.apiChannel}/used_models?q[active_eq]=true&q[new_vehicle_eq]=false&page=1&per_page=9&sort=-pictures_count&q[slug_eq]=${slug}`, {
    headers: {
      Authorization: process.env.apiToken
    }
  })

  if(data.entries && data.entries.length > 0){
    return data.entries[0];
  }
  return {}
}

async function fetchUnitData(unit_id) {
  const { data } = await axios.get(`https://api.autodromo.app/v1/groups/${process.env.apiChannel}/units?q[id_eq]=${unit_id}`, {
    headers: {
      Authorization: process.env.apiToken
    }
  })

  if(data.entries && data.entries.length > 0){
    return data.entries[0];
  }
  return {}
}

export async function generateMetadata({ params }) {
  const productData = await fetchData(params.productSlug);
  
  return {
    title: `${productData.name} por R$ ${productData.price} é na Carmais Seminovos`,
    description: `${productData.name} por R$ ${productData.price}. Entre e confira as facilidades para comprar na ${productData.item_unit?.name || 'Carmais Seminovos'}`,
    alternates: {
      canonical: '/'
    }
  }
}

export default async function Product({ params }) {
  const productData = await fetchData(params.productSlug);
  const unitData = await fetchUnitData(productData.unit_id)

  const galleryList = [
    {
      main_image: productData?.profile_image.url,
      middle_image: productData?.profile_image.url
    },
    ...productData?.item_gallery
  ]

  return (
    <main className={stylesPage.containerLimit}>
      <div className="breadcrumb desktopOnly">
        <Link href='/seminovos' className="breadcrumb-link">Seminovos</Link>

        <ChevronRight height="16px"/>

        <div className="vehicle-title">{productData.name}</div>
      </div>

      <div className="page-container">
        <div className="product-container">

          <ProductGallery galleryList={galleryList} />

          <div className="breadcrumb mobileOnly">
            <div className="vehicle-title">{productData.model}</div>
            <div className="vehicle-subtitle">{productData.version}</div>
          </div>

          <div className="product-page-title-divider mobileOnly"></div>

          <div className="price-box">
            <div className="product-after-price mobileOnly">R$ {productData.price}</div>
            {/* <div className="discount-label">10% OFF</div> */}
          </div>

          <div className="container-form-mobile mobileOnly">
            <FormProduct title={productData.name} subtitle={productData.subtitle} price={productData.price} brand={productData.brand} plate={productData.plate} unit={productData.item_unit.slug}/>
          </div>

          <div className="product-page-title-divider mobileOnly"></div>

          <div className="description">
            {!!productData.badge &&
              <div className="item-description">
                <div className="icon-description"><Calendar color="#c00d0d"/></div>
                <div className="text-description">
                  <div className="description-bold">{productData.badge}</div>
                  <div className="description-light">Ano / fabricação</div>
                </div>
              </div>
            }

            {!!productData.color &&
              <div className="item-description">
                <div className="icon-description"><PaintBucket color="#c00d0d"/></div>
                <div className="text-description">
                  <div className="description-bold">{productData.color}</div>
                  <div className="description-light">Cor</div>
                </div>
              </div>
            }

            {!!productData.fuel_text &&
              <div className="item-description">
                <div className="icon-description"><Fuel color="#c00d0d"/></div>
                <div className="text-description">
                  <div className="description-bold">{productData.fuel_text}</div>
                  <div className="description-light">Combustível</div>
                </div>
              </div>
            }

						{!!productData.kind &&
              <div className="item-description">
                <div className="icon-description"><Car color="#c00d0d"/></div>
                <div className="text-description">
                  <div className="description-bold">{productData.kind}</div>
                  <div className="description-light">Categoria</div>
                </div>
              </div>
            }

            {!!productData.km &&
              <div className="item-description">
                <div className="icon-description"><Gauge color="#c00d0d"/></div>
                <div className="text-description">
                  <div className="description-bold">{productData.km}</div>
                  <div className="description-light">Quilometragem</div>
                </div>
              </div>
            }

            {!!productData.doors &&
              <div className="item-description">
                <div className="icon-description"><Car color="#c00d0d"/></div>
                <div className="text-description">
                  <div className="description-bold">{productData.doors}</div>
                  <div className="description-light">Portas</div>
                </div>
              </div>
            }

            {!!productData.exchange &&
              <div className="item-description">
                <div className="icon-description">
                  <Image
                    src="/TransmissionRed.svg"
                    alt="transmission"
                    height={20}
                    width={20}
                  />
                </div>
                <div className="text-description">
                  <div className="description-bold">{productData.exchange}</div>
                  <div className="description-light">Câmbio</div>
                </div>
              </div>
            }

            {!!productData.plate &&
              <div className="item-description">
                <div className="icon-description"><CreditCard color="#c00d0d"/></div>
                <div className="text-description">
                  <div className="description-bold">{productData.plate.substring(4)}</div>
                  <div className="description-light">Final da placa</div>
                </div>
              </div>
            }
          </div>

          {!!productData.note?.length &&
            <>
              <div className="product-page-divider"></div>

              <div className="product-page-section-title">Descrição</div>

              <div className="text-long-description">
                {productData.note}
              </div>
            </>
          }

          <div className="product-page-divider"></div>

          <div className="product-page-section-title">Disponível em {productData.item_unit?.name}</div>

          <div className="store-card">
            <h1 className="store-title">{productData.item_unit?.name}</h1>
            <div className="store-subtitle">{productData.item_unit?.address}</div>

            <div className="product-page-divider"></div>

            <div className="title-section-card">Atendimento</div>

            <div className='product-page-details'>
              <div className='text-bold'>{productData.item_unit?.phone}</div>
            </div>

            <div>
              {unitData?.item_hours?.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px' }}>
                  <div className='product-page-text-light'>{item.title}:</div>
                  <div className='product-page-text-light'>{item.description}</div>
                </div>
              ))}
            </div>

            {/* retirado enquanto a propriedade da url do google maps nao vem do backend
            <div className='link-map'>
              <Link
                href={""}
                target='_blank'
              >
                Ver no mapa
              </Link>

              <MapPin size={20}/>
            </div> */}
          </div>

          {!!productData.item_list.length &&
            <>
              <div className="product-page-divider"></div>
    
              <div className="product-page-section-title">Itens do veículo</div>
    
              <ProductItemList list={productData.item_list} />
            </>
          }

          <div className="description-images">
            * Imagens meramente ilustrativas. Alguns itens apresentados poderão não estar disponíveis nas versões. Preços sugeridos e válidos de 31/03/2023. Os preços poderão ser modificados sem aviso prévio. Consulte e confirme todas as informações com um de nossos vendedores.
          </div>

          <div className="doubt-card">
            <div className="description-doubt">
              <div className="title-doubt">Ainda tem dúvidas?</div>
              <div className="subtitle-doubt">Fale com um de nossos especialistas.</div>
            </div>

            <ProductWhatsappButton link={`https://wa.me/${5585981263833}?text=Olá, tenho uma pergunta sobre o veículo ${productData.name}, o link dele é https://carmaisseminovos.com.br/seminovos/${params.productSlug}`} />
          </div>
        </div>

        <div className="desktopOnly">
          <FormProduct title={productData.name} subtitle={productData.subtitle} price={productData.price} brand={productData.brand} plate={productData.plate} unit={productData.item_unit.name} />
        </div>
      </div>

      <ProductPageCarousel slugList={productData.used_model_suggestions.map((v) => v.slug)} />      
    </main>
  )
}
