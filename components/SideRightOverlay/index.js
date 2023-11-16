'use client'

import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { X } from "lucide-react"

import './index.css'

export default function SideRightOverlay ({ open, onClose, title, children }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    const modalContent = 
        (<div className={`${open ? 'overlay' : ''}`}>
            <div className={`modal-right ${open ? 'side-modal-open' : ''}`}>
                <div className="modal-header-right">
                    <h4>{title}</h4>
                    <div className="close-icon-container" onClick={onClose} >
                        <X />
                    </div>
                </div>
                {children} 
            </div>
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
