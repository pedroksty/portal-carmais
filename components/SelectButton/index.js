import React from 'react';
import { ChevronDown } from 'lucide-react';

import './index.css';

export default function SelectButton({current, onClick, disabled = false}) {
    return (
        <div onClick={onClick} className={`select-button-container ${disabled ? 'select-button-container-disabled' : ''}`}>
            <p>{current}</p>
            <ChevronDown />
        </div>
    )
}