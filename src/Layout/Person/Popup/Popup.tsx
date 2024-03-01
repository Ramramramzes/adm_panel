import styles from './popup.module.css';
import setCommentInBase from '../../../functions/setCommentInBase';
import { useEffect, useState } from 'react';
import currentDate from '../../../functions/currentDate';
import ReactDOM from 'react-dom';

interface IForPopup{
  personData:{
    name: string,
    points: number,
    comments: string,
  }
  admName: string,
  setAddComment: (com:boolean) => void,
}

interface IComments{
  adm: string,
  status: number,
  comment: string
}


export function Popup({personData,admName,setAddComment}:IForPopup) {
  const [indexForComments,setIndexForComments] = useState<number>(0)
  const [textArea,setTextArea] = useState('');
  const [status,setStatus] = useState(0);
  const [likeStat,setLikeStat] = useState('')
  const commentsArr:IComments[] = JSON.parse(personData.comments)
  const date:string = currentDate()
  
  
  useEffect(() => {
    if(commentsArr.length != 0){
      setIndexForComments(commentsArr.length)
    }
  },[indexForComments])
  
  
  
  
  useEffect(() => {
  const eventTarget1 = document.getElementById("close_id") as HTMLDivElement
  const eventTarget2 = document.getElementById("close_btn") as HTMLDivElement
  function handleClick(event: MouseEvent) {
    if(eventTarget1 == event.target || eventTarget2 == event.target){
      setAddComment(false)
    }
  }

  document.addEventListener('click',handleClick);

  return () => {
    document.removeEventListener('click',handleClick)
  };
}, []);


useEffect(()=>{
  //! Создать видимость кнопки отправки в зависимости от заполнения данных
},[textArea,likeStat])

  const rootModal = document.querySelector('#root_modal');
  if(!rootModal){
    return('Ошибка рута');
  }


  

  const handleChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(event.target.value);
  }
    
  const handleClickUp = () => {
    setStatus(1)
    setLikeStat('+')
  }

  const handleClickDown = () => {
    setStatus(0)
    setLikeStat('-')
  }
    
  const sendComment = () => {
    setTextArea('');
    setCommentInBase({
      i:indexForComments,
      adminName:admName,
      status:status,
      textOfComment: textArea,
      commentDate: date,
      workerName: personData.name,
    })
  }

  return ReactDOM.createPortal((
    <div className={styles.main}>
      <div className={styles.background} id='close_id'>
        <div className={styles.popup_block}>
          <div className={styles.forClose}>
            <span>Оцените сотрудника: {personData && personData.name}</span>
            <span className={styles.close} id={'close_btn'}>✕</span>
          </div>
          <textarea onChange={handleChangeArea} cols={30} rows={10} placeholder='Ваш комментарий' value={textArea}></textarea>
          <div className={styles.btn_block}>
            <button onClick={handleClickUp}>+</button>
            <button onClick={sendComment}>Отправить</button>
            <button onClick={handleClickDown}>-</button>
          </div>
        </div>
      </div>
    </div>
  ),rootModal)
}



// ?    UPDATE worker SET comments = JSON_SET(comments,'{"adm": "adm", "status": 0, "comment": "плохой"}','{}') WHERE `name` = 'test';
//? UPDATE worker 
//? SET comments = JSON_INSERT(comments, '$[0]', JSON_OBJECT('adm', 'adm1', 'status', 0, 'comment', 'плохой1')) 
//? WHERE `name` = 'test';