import styles from '../page.module.css';
import './index.css';

export default async function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className='skeleton-container-contact'>
          <div className='skeleton-title-contact'></div>
          <div className='skeleton-subtitle-contact'></div>
          <div className='skeleton-form-contact'></div>
        </div>
      </div>
    </main>
  )
}
