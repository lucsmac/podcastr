import styles from './styles.module.scss';

export function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.emptySlider} />
          <span>00:00</span>
        </div>
      </footer>
    </div>
  )
}
