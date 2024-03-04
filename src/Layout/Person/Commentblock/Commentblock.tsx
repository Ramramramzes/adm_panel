import React, { useEffect, useState } from 'react';
import styles from './commentblock.module.css';

interface IEldata {
  id: string,
  adm: string,
  date: string,
  status: number,
  comment: string,
}

export function Commentblock({ elData }: { elData: IEldata }) {
  const { id, adm, date, status, comment } = elData;
  const [colorBack,setColorBack] = useState('')

  useEffect(() => {
    if(status == 0){
      setColorBack('rgba(255, 127, 127, 0.375)')
    }else if(status == 1){
      setColorBack('rgba(140, 255, 127, 0.375)')
    }
  },[status])

  if (!id) {
    return <div>Нет данных</div>;
  }

  return (
    <div style={{backgroundColor: `${colorBack}`}} className={styles.comment_block}>
      <div className={styles.adm_info}><span className={styles.id}>{id}</span><span className={styles.name}>Комментарий от: {adm}</span><span className={styles.date}>{date}</span></div>
      <div><span className={styles.comment}>{comment}</span></div>
    </div>
  );
}
