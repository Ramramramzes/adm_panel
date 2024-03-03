// import React from 'react';
import styles from './person.module.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Popup } from './Popup';
import { useState } from 'react';
import { Commentblock } from './Commentblock';

interface IEldata{
  id:string,
  adm: string,
  date:string,
  status:number,
  comment:string,
}

export function Person() {
  const navigate = useNavigate()
  const location = useLocation();
  const dataForPopup = location.state
  const [addComment,setAddComment] = useState(false);
  const commentsArr = JSON.parse(dataForPopup.personData.comments)
  console.log(dataForPopup);
  
  const handleClickComment = () => {
    setAddComment(!addComment);
  }

  const handleClickBack = () => {
    navigate('/main');
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.worker_title}>Сотрудник: <span className={styles.worker_name}>{dataForPopup.personData.name}</span></div>
      <div className={styles.points_btns}>
        <div className={styles.ball_title}>Колличество баллов: <span className={styles.ball_name}>{dataForPopup.personData.points}</span></div>
        <div className={styles.btn_block}>
          <button onClick={handleClickComment} className={styles.btn + ' btn_style'}>Оставить комментарий</button>
          <button onClick={handleClickBack} className={styles.btn + ' btn_style'}>Назад</button>
        </div>
      </div>
      <ul className={styles.list}>
        {commentsArr && commentsArr.map((el:IEldata) => {
          return <li className={styles.item}><Commentblock elData={el}/></li>
        })}
      </ul>
      {/* Попап -----> */}
      <div>{addComment && <Popup admName={dataForPopup.admName} personData={dataForPopup.personData} setAddComment={setAddComment}/>}</div>
    </div>
  );
}