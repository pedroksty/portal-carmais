import styles from '../page.module.css';
import './index.css';

export default async function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className='skeleton-container-about'>
          <div className='skeleton-title-about'></div>

          <div className='skeleton-banner-about'></div>
        </div>
      </div>
    </main>
  )
}
