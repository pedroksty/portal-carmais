'use client'

import { useState, useEffect, useRef } from 'react';

const  getWindowWidth = () => {
  const { innerWidth: width } = window;
  return width;
}

export const useWindowWidth = () => {
  const firstRender = useRef(true)
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if(firstRender.current){
      setWindowWidth(getWindowWidth());
      firstRender.current = false
    }
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

export default useWindowWidth