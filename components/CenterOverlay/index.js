'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import ReactDOM from "react-dom"
import { X } from "lucide-react"

import './index.css'

export default function CenterOverlay({ open, onClose, title, children }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const overlayRef = useRef(null);

  const backDropHandler = useCallback((e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }, [onClose])

  useEffect(() => {
    setIsBrowser(true);
    window.addEventListener('click', backDropHandler);
    return () => window.removeEventListener('click', backDropHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modalContent =
    (<div className={`${open ? 'overlay-center' : ''}`} ref={overlayRef}>
      <div className={`modal-center ${open ? 'side-modal-open-center' : ''}`}>
        <div className="modal-header-center">
          <h4>{title}</h4>
          <div className="close-icon-container-center" onClick={onClose} >
            <X />
          </div>
        </div>
        {children}
      </div>
    </div>)

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  } else {
    return null
  }
}