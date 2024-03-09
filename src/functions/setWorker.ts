import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function setWorker(nameForSet:string) {
  axios.post('/api/setWorker',{'name': nameForSet})
  .then((response) =>{
    console.log('Сотрудник добавлен',response);
  })
  .catch((error) => {
    console.log('Ошибка при добавлении сотрудника',error);
  })
}

export default setWorker