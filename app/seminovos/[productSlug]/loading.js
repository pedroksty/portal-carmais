import styles from '../../page.module.css';

export default async function Home() {

  return (
    <div className={styles.containerLimit}>
      <div className={styles.skeletonContainerHome}>
        <div className={styles.skeletonBannerHome}></div>
      </div>
    </div>
  )
}
