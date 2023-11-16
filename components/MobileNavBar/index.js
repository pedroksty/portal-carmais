'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { Menu, Phone } from "lucide-react";

import { ContactModal } from '@/components/ContactModal';
import { ContactModalPhone } from '@/components/ContactModalPhone';
import SideRightOverlay from "../SideRightOverlay"
import SearchInput from '../SearchInput';

import './index.css';

const NavbarHeader = () => (
	<div style={{display: 'flex', gap: '24px'}}>
		<Link href='/' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			<Image 
				src='/Marca_SemiNovos_Horizontal_Positivo.png' 
				alt='Imagem logo'
				width={132}
				height={32}
			/>
		</Link>
		<div className='mobile-navbar-socialLinksContainer'>
			<ContactModal />
			<ContactModalPhone backgroundPrimary />
		</div>
	</div>
)

export default function MobileNavBar () {
    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    return (
        <div style={{ display: 'flex', gap: '16px' }} className='mobileOnly'>
            <Menu onClick={() => setSideMenuOpen(true)} />
            <SideRightOverlay title={<NavbarHeader />} open={sideMenuOpen} onClose={() => setSideMenuOpen(false)} >
                <div className='mobile-navbar-container'>
									<div className='mobile-navbar-search-input-container' >
										<SearchInput showMobile />
									</div>
									<ul className='mobile-navbar-link-list' > 
											<li>
													<Link href='/seminovos' onClick={() => setSideMenuOpen(false)}>Quero Comprar</Link>
											</li>
											<li>
													<Link href='/nossas-lojas' onClick={() => setSideMenuOpen(false)}>Nossas Lojas</Link>
											</li>
											<li>
													<Link href='/saiba-quem-somos' onClick={() => setSideMenuOpen(false)}>Quem Somos</Link>
											</li>
											<li>
													<Link href='/fale-conosco' onClick={() => setSideMenuOpen(false)}>Fale Conosco</Link>
											</li>
									</ul>
                </div>
            </SideRightOverlay>
        </div>
    )
}
