// import React from 'react';
// import styles from './person.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface IComments{
  adm: string,
  status: number,
  comments: string,
}

export function Person() {
  const location = useLocation();
  const navigate = useNavigate()
  // const [comments,setComments] = useState({})
  // setComments({'0': {adm: 'Main', status: 0, comments: 'bad'}})

  //! Cначала реализовать кнопку добавления комментария 
  //? Наверное попап

  console.log(JSON.parse(location.state.comments));  
  

  
  
  
  const handleClickBack = () => {
    navigate('/main');
  }

  return (
    <div>
      <h1>Сотрудник </h1>
      <div>
        <div>Комментарий от </div>
      </div>
      <button onClick={handleClickBack}>На главную</button>
    </div>
  );
}


// UPDATE worker SET comments = JSON_SET(comments, '$.adm', 'adm', '$.status', 0, '$.comment', 'плохой') WHERE `name` = 'Marat'

