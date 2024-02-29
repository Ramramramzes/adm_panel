import axios from "axios";

async function setTokenInBase(name:string, token:string, setReload:(el:number)=>void){
  axios.post(`http://localhost:3001/set_adm_token`, { login: name, token: token })
  .then(response => {
    console.log('Данные успешно отправлены:', response);
    setReload(1)
  })
  .catch(error => {
    console.error('Ошибка при отправке данных:', error);
  });
}
export default setTokenInBase