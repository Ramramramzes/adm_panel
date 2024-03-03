import styles from './popup.module.css';
import setCommentInBase from '../../../functions/setCommentInBase';
import { useEffect, useState } from 'react';
import currentDate from '../../../functions/currentDate';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

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
  const [commentState,setCommentState] = useState(false)
  const navigate = useNavigate()
  
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

  useEffect(()=> {
    if(commentState == true){
      setCommentState(false)
      navigate('/Main')
    }
  },[commentState])

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
    setStatus(0)
    setLikeStat('')
    setCommentInBase({
      i:indexForComments,
      adminName:admName,
      status:status,
      textOfComment: textArea,
      commentDate: date,
      workerName: personData.name,
      setCommentState: setCommentState,
    })

  }

  return ReactDOM.createPortal((
    <div className={styles.main}>
      <div className={styles.background} id='close_id'>
        <div className={styles.popup_block}>
          <div className={styles.forClose}>
            <span className={styles.worker_name_block}>Оцените сотрудника: <span className={styles.worker_name}>{personData && personData.name}</span></span>
            <span className={styles.close} id={'close_btn'}>✕</span>
          </div>
          <textarea onChange={handleChangeArea} cols={30} rows={10} placeholder='Ваш комментарий' value={textArea} className={styles.textarea}></textarea>
          <div className={styles.btn_block}>
            <button onClick={handleClickUp} className={styles.up} style={{backgroundColor: likeStat === '+' ? 'var(--light-back)' : '#fff'}}>👍</button>            {textArea == '' || likeStat == '' ? <span>Введите комментарий и оценку</span> : <button className='btn_style' onClick={sendComment}>Отправить</button>}
            <button onClick={handleClickDown} className={styles.down} style={{backgroundColor: likeStat === '-' ? 'var(--light-back)' : '#fff'}}>👎</button>
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