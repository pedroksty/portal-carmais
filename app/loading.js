import styles from './page.module.css';

export default async function Home() {

  return (
    <div className={styles.containerLimit}>
      <div className={styles.skeletonContainerHome}>
        <div className={styles.skeletonBannerHome}></div>

        <div className={styles.skeletonTitleHome}></div>

        <div className={styles.skeletonPillContainerHome}>
          <div className={styles.skeletonPillHome}></div>
          <div className={styles.skeletonPillHome}></div>
          <div className={styles.skeletonPillHome}></div>
        </div>
      </div>
    </div>
  )
}
