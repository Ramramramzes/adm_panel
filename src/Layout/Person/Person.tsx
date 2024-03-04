// import React from 'react';
import styles from './person.module.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Popup } from './Popup';
import { useState,useEffect } from 'react';
import { Commentblock } from './Commentblock';
import { useContext } from 'react';
import { findAdmContext } from '../../context/findAdmContext';
import useGetCookie from '../../hooks/useGetCookie';

interface IEldata{
  id:string,
  adm: string,
  date:string,
  status:number,
  comment:string,
}

export function Person() {
  const navigate = useNavigate()
  const myCookie = useGetCookie()
  const baseAdm = useContext(findAdmContext)
  const isValidAdmin = baseAdm.find(el => el.token === myCookie)
  const location = useLocation();
  const dataForPopup = location.state
  const commentsArr = dataForPopup && dataForPopup.personData && dataForPopup.personData.comments ? JSON.parse(dataForPopup.personData.comments) : [];
  const [addComment,setAddComment] = useState(false);

  useEffect(() => {
    if(!isValidAdmin){
      navigate('/');
    }
  }, [isValidAdmin, navigate]);


  const handleClickComment = () => {
    setAddComment(!addComment);
  }

  const handleClickBack = () => {
    navigate('/main',{state:{name:location.state.name}});
  }
  
  return (
    <div className={styles.container}>
      {dataForPopup && dataForPopup.personData && (
        <div>
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
      )}
    </div>
  );
}