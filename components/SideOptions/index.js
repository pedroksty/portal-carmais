'use client'

import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { ArrowLeft } from "lucide-react"

import './index.css'

export default function SideOptions ({ open, onClose, title, children }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    const modalContent = 
        (<div className={`modal-left-options ${open ? 'side-modal-open-options' : ''}`}>
            <div className="modal-header-options">
                <div className="close-icon-container-options" onClick={onClose} >
                    <ArrowLeft />
                </div>
                <h4>{title}</h4>
            </div>
            {children} 
        </div>)
    
    if(isBrowser){
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        )
    }else{
        return null
    }
}