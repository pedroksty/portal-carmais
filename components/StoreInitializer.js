'use client'

import { useRef, useEffect } from "react"
import { useStore } from "@/src/store"
import { usePathname } from "next/navigation";
import { goTop } from "@/src/helpers";

function StoreInitializer({privacyPolicy, indexBanners, aboutUsTextHTML, whatsappInfo, phoneInfo}) {
	const pathName = usePathname();
	const initialized = useRef(false);

	useEffect(() => {
		goTop()
	}, [pathName])
	if(!initialized.current){
		useStore.setState({ privacyPolicy, indexBanners, aboutUsTextHTML, whatsappInfo, phoneInfo });
		initialized.current = true
	}
	return null
}

export default StoreInitializer