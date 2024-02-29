// import React from 'react';
// import styles from './person.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// interface IComments{
//   adm: string,
//   status: number,
//   comments: string,
// }

export function Person() {
  const location = useLocation();
  const navigate = useNavigate()

  const comments = JSON.parse(location.state.comments)

  console.log(location.state);
  
  const commentWorkArr = Object.values<string>(comments).map((el:string) => {return JSON.parse(el)});
  //? console.log(Object.values<string>(comments).map((el:string) => {return JSON.parse(el)}));
  

  
  
  
  const handleClickBack = () => {
    navigate('/main');
  }

  return (
    <div>
      <h1>Сотрудник </h1>
      <button>Добавить отзыв</button>
      <div>
        {comments && commentWorkArr.map((el, index) => {
          if (el.adm != undefined){
            return <div key={index}>{el.adm + ' - ' + el.comment}</div>
          }
        })}
      </div>
      <button onClick={handleClickBack}>На главную</button>
    </div>
  );
}


//? Создать попап с помощью portal
//? В этот portal компонент передавать location.state.name и location.state.points 
//? Сформировать шаблон как будет выглядеть 1 блок {} комментария (время / id для удаления)
//? Сформировать запрос для добавления коммента (...Json) с деструктуризацие старого

//?    UPDATE worker SET comments = JSON_SET(comments, '$."0"', '{"adm": "adm", "status": 0, "comment": "плохой"}', '$."1"', '{}') WHERE `name` = 'test';

