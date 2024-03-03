// import React from 'react';
// import styles from './person.css';
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
    <div>
      <h1>Сотрудник {dataForPopup.personData.name}</h1>
      <h3>Колличество баллов {dataForPopup.personData.points}</h3>
      <div>{addComment && <Popup admName={dataForPopup.admName} personData={dataForPopup.personData} setAddComment={setAddComment}/>}</div>
      <ul>
        {commentsArr && commentsArr.map((el:IEldata) => {
          return <li><Commentblock elData={el}/></li>
        })}
      </ul>
      <button onClick={handleClickComment}>Оставить комментарий</button>
      <button onClick={handleClickBack}>Назад</button>
    </div>
  );
}