import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function delWorker(nameForDel:string) {
  axios.post('/api/delWorker',{'name': nameForDel})
  .then((response) =>{
    console.log('Сотрудник удален',response);
  })
  .catch((error) => {
    console.log('Ошибка при удалении сотрудника',error);
  })
}

export default delWorker