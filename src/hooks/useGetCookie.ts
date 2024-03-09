import { useEffect, useState } from "react";
import axios from "axios";



export default function useGetCookie(){
  const [cookie,setCookie] = useState('')

  useEffect(()=>{
    axios.get('/api/get-cookie', {
      withCredentials: true // Включаем отправку куков
    })
    .then(response => {
      if(response.data.token != ''){
        const res = response.data.token;
        setCookie(res);
      }
    })
    .catch(error => {
      console.error('Нет токена:', error);
    }); 
  },[cookie])

  return(cookie)
}