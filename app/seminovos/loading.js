import ProductCardSkeleton from '@/components/ProductCard/skeleton';
import styles from '../page.module.css';
import './index.css';

export default async function Home() {

  return (
    <main className={styles.containerLimit}>
      <div className='skeleton-container-filter'>
        <div className='skeleton-header-filter'>
          <div className='skeleton-search-filter'></div>
          <div className='skeleton-more-filter'></div>
          <div className='skeleton-price-filter'></div>
          <div className='skeleton-brand-filter'></div>
          <div className='skeleton-category-filter'></div>
          <div className='skeleton-color-filter'></div>
          <div className='skeleton-transmission-filter'></div>
        </div>

        <div className='skeleton-list-filter'>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </main>
  )
}
