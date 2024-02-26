import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setTokenInCookie = (decoded:string):void => {
  axios.get(`http://localhost:3001/set-cookie?token=${decoded}`, {
    withCredentials: true,
  })
  .then(response => {
    console.log(response.data.token);
  })
  .catch(error => {
    console.log('Ошибка отправки данных',error);
  })
}