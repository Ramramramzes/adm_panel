import styles from './popup.module.css';
import setCommentInBase from '../../../functions/setCommentInBase';
import { useEffect, useState } from 'react';
import currentDate from '../../../functions/currentDate';
import { useNavigate } from 'react-router-dom';

interface IForPopup{
  personData:{
    name: string,
    points: number,
    comments: string,
  }
  admName: string,
}

interface IComments{
  adm: string,
  status: number,
  comment: string
}


export function Popup({personData,admName}:IForPopup) {
  const [indexForComments,setIndexForComments] = useState<number>(0)
  const [textArea,setTextArea] = useState('');
  const [status,setStatus] = useState(0);
  const commentsArr:IComments[] = JSON.parse(personData.comments)
  const date:string = currentDate()
  const navigate = useNavigate()
  
  
  useEffect(() => {
    if(commentsArr.length != 0){
      setIndexForComments(commentsArr.length)
    }
  },[indexForComments])
  

  const handleChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(event.target.value);
  }
    
  const handleClickUp = () => {
    setStatus(1)
  }

  const handleClickDown = () => {
    setStatus(0)
  }
    
  const sendComment = () => {
    setCommentInBase({
      i:indexForComments,
      adminName:admName,
      status:status,
      textOfComment: textArea,
      commentDate: date,
      workerName: personData.name,
    })
  }

//! временный колбэк
  const handleClickBack = () => {
    navigate('/main');
  }

  return (
    <div className={styles.main}>
      <div className={styles.popup_block}>
        <span>Оцените сотрудника: {personData && personData.name}</span>
        <textarea onChange={handleChangeArea} cols={30} rows={10} placeholder='Ваш комментарий'></textarea>
        <div className={styles.btn_block}>
          <button onClick={handleClickUp}>+</button>
          <button onClick={sendComment}>Отправить</button>
          <button onClick={handleClickDown}>-</button>
        </div>
      </div>
      <button onClick={handleClickBack}>назад - временная кнопка</button>
    </div>
  );
}



// ?    UPDATE worker SET comments = JSON_SET(comments,'{"adm": "adm", "status": 0, "comment": "плохой"}','{}') WHERE `name` = 'test';
//? UPDATE worker 
//? SET comments = JSON_INSERT(comments, '$[0]', JSON_OBJECT('adm', 'adm1', 'status', 0, 'comment', 'плохой1')) 
//? WHERE `name` = 'test';