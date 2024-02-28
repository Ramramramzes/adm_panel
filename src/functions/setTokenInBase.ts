import axios from "axios";

async function setTokenInBase(name:string, token:string){
  axios.post(`http://localhost:3001/set_adm_token`, { login: name, token: token })
  .then(response => {
    console.log('Данные успешно отправлены:', response);
  })
  .catch(error => {
    console.error('Ошибка при отправке данных:', error);
  });
}
export default setTokenInBase