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
  console.log(id, adm, date, status, comment);
  const [colorBack,setColorBack] = useState('')

  useEffect(() => {
    if(status == 0){
      setColorBack('rgba(255, 127, 127, 0.616) ')
    }else if(status == 1){
      setColorBack('rgba(129, 255, 127, 0.616)')
    }
  },[status])

  if (!id) {
    return <div>Нет данных</div>;
  }

  return (
    <div style={{backgroundColor: `${colorBack}`}} className={styles.comment_block}>
      <div>{id} <div>{adm}{date}</div></div>
      <div>{comment}</div>
    </div>
  );
}
