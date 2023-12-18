import AboutUsBanner from '@/components/AboutUsBanner';
import styles from '../page.module.css';
import './styles.css';

export const metadata = {
  alternates: {
    canonical: '/saiba-quem-somos'
  }
}

export default async function About() {
  return (
    <main className={styles.containerLimit}>
      <div className='containerAbout'>
        <h1 className='titleAbout'>Quem somos</h1>
        <h2 style={{ display: "none" }}>Saiba quem somos</h2>
        <h3 style={{ display: "none" }}>Saiba quem somos</h3>
        {/* <AboutUsBanner /> */}
        <h4 className='description'>
        </h4>
      </div>
    </main>
  )
}
