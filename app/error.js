'use client'

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({ error, reset }) {

  return (
    <div className={styles.containerLimit}>
      <div className={styles.containerError}>
        <Image 
          src="/error.png"
          alt='error'
          width={312}
          height={285}
          className={styles.imageError}
        />

        <div className={styles.titleError}>Algo inesperado aconteceu</div>

        <Link href='/'>
          <div className={styles.buttonError}>Voltar</div>
        </Link>
      </div>
    </div>
  )
}
