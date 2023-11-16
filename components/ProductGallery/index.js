'use client'

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Glider from 'react-glider';
import Image from "next/image";

import useWindowWidth from "@/src/useWindowWidth";
import 'glider-js/glider.min.css';
import './index.css';

const ArrowIcon = ({left = true, onClick}) => {
	return (
		<div className={`product-page-carousel-arrow-button ${left ? 'product-page-carousel-arrow-button-left' : 'product-page-carousel-arrow-button-right'}`} onClick={onClick}>
			{left ? <ChevronLeft color='var(--gray-1)' /> : <ChevronRight color='var(--gray-1)' />}
		</div>
	)
}

export const ProductGallery = ({ galleryList }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [changeImageLoading, setChangeImageLoading] = useState(false)
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 1023;

  return (
    <>
      {!isMobile && <div className="gallery-container desktopOnly">
        <Image
          alt="capa"
          src={!!galleryList.length ? galleryList[selectedIndex].main_image : '/defaultImage.webp'}
          width={800}
          height={549}
          className="cover-image"
          onLoadingComplete={() => setChangeImageLoading(false)}
        />

        {changeImageLoading && <div className="loading-image">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>}

        {!!galleryList.length &&
          <div className="gallery">
            <Glider 
              slidesToShow={5}
              hasArrows
              hasDots={false}
              iconLeft={<ArrowIcon 
                onClick={() => {
                  if(selectedIndex > 0){
                    setSelectedIndex(selectedIndex - 1); 
                    setChangeImageLoading(true)
                  }
                }} />}
              iconRight={<ArrowIcon 
                left={false} 
                onClick={() => {
                  if(selectedIndex < galleryList.length - 1){
                    setSelectedIndex(selectedIndex + 1); 
                    setChangeImageLoading(true)
                  }
                }} />}
            >
              {galleryList.map((item, index) => (
                <Image
                  key={index}
                  alt="capa"
                  onClick={() => {
                    if(index !== selectedIndex){
                      setSelectedIndex(index);
                      setChangeImageLoading(true);
                    }
                  }}
                  src={item.main_image}
                  width={147}
                  height={101}
                  className={`gallery-small-image cover-image ${ index == selectedIndex ? 'gallery-small-image-selected' : '' }`}
                />
              ))}
            </Glider>
        </div>
        }
      </div>}

      {(isMobile && galleryList.length > 0) &&
      <div className="gallery-container-mobile mobileOnly">
        <Glider 
          slidesToShow='auto'
          scrollLock
          hasDots
          itemWidth={312} 
        >
          {galleryList.map((item, index) => (
            <Image
              key={index}
              alt="capa"
              src={item.middle_image}
              width={312}
              className="cover-image"
              height={240}
            />
          ))}
        </Glider>
      </div>}

      {(isMobile && galleryList.length == 0) && (
        <div className="gallery-container-mobile mobileOnly">
            <Image
              alt="capa"
              src='/defaultImage.webp'
              className="mobile-default-image-product cover-image"
              width={312}
              height={240}
            />
        </div>
      )}
    </>
  )
}
