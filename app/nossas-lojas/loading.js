import styles from '../page.module.css';
import StoreCardSkeleton from './skeleton';
import './index.css';

export default async function Home() {

  return (
    <main className={styles.main}>
      <div className='skeleton-container-stores'>
        <div className='skeleton-header-stores'>
          <div className='skeleton-title-stores'></div>
          <div className='skeleton-search-stores'></div>
        </div>

        <div className='skeleton-list-stores'>
          <StoreCardSkeleton />
          <StoreCardSkeleton />
          <StoreCardSkeleton />
          <StoreCardSkeleton />
        </div>
      </div>
    </main>
  )
}
