// import React from 'react';
// import styles from './person.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Popup } from './Popup';
import { useState } from 'react';

export function Person() {
  const navigate = useNavigate()
  const location = useLocation();
  const dataForPopup = location.state
  const [addComment,setAddComment] = useState(false);

  const handleClickComment = () => {
    setAddComment(!addComment);
  }

  const handleClickBack = () => {
    navigate('/main');
  }
  
  return (
    <div>
      <h1>Сотрудник </h1>
      <div>{addComment && <Popup admName={dataForPopup.admName} personData={dataForPopup.personData} setAddComment={setAddComment}/>}</div>
      <button onClick={handleClickComment}>Оставить комментарий</button>
      <button onClick={handleClickBack}>Назад</button>
    </div>
  );
}


//? Создать попап с помощью portal
//? В этот portal компонент передавать location.state.name и location.state.points 
//? Сформировать шаблон как будет выглядеть 1 блок {} комментария (время / id для удаления)
//? Сформировать запрос для добавления коммента (...Json) с деструктуризацие старого

//?    UPDATE worker SET comments = JSON_SET(comments, '$."0"', '{"adm": "adm", "status": 0, "comment": "плохой"}', '$."1"', '{}') WHERE `name` = 'test';

