import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.header}>
        <span>😕</span>
        <br />
        Страница не найдена
      </h1>
      <div className={styles.description}>
        К сожалению, данная страница отсутствует в нашем интернет-магазине
      </div>
    </div>
  );
};

export default NotFoundBlock;
