import { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface IQuerry{
  i:number,
  adminName: string,
  status:number,
  textOfComment: string,
  commentDate: string,
  workerName: string,
  setCommentState: Dispatch<SetStateAction<boolean>>;
}


async function setCommentInBase({i,adminName,status,textOfComment,commentDate,workerName,setCommentState}:IQuerry) {
  axios.post('http://localhost:3001/addComment',{i,adminName,status,textOfComment,commentDate,workerName})
  .then(response => {
    console.log('Данные успешно отправлены:', response);
    setCommentState(true)
  })
  .catch(error => {
    console.error('Ошибка при отправке данных:', error);
  });
}
export default setCommentInBase