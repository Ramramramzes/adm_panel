import axios from "axios";
import styles from './login.module.css';
import { tokenGenerate } from "../key_generator";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { findAdmContext } from "../context/findAdmContext";
import useGetCookie from "../hooks/useGetCookie";


const token = tokenGenerate(30); 

interface IAdmins{
  name: string;
  pass: string;
  token: string;
}

export function Login() {
  const navigate = useNavigate()
  const [login,setLogin] = useState('')
  const [pass,setPass] = useState('')
  const [tokenRes,setTokenRes] = useState('')

  const adminsArr = useContext(findAdmContext);
  const decoded = btoa(token)
  
  const myCookie = useGetCookie()
  
  useEffect(()=>{
    if(myCookie){
      setTokenRes(myCookie)
      const foundAdmin = adminsArr.find((admin: IAdmins) => admin.token === myCookie);
      
      if(foundAdmin){
        navigate('/main',{ state : {name: foundAdmin.name, token: foundAdmin.token}});
      }
    }
    
  },[myCookie])
  
  const setToken = () => {
    axios.get(`http://localhost:3001/set-cookie?token=${decoded}`, {
      withCredentials: true // Включаем отправку куков
    })
    .then(response => {
      console.log(response.data.token);
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
  };

  const setInBase = (name:string, token:string) => {
    axios.post(`http://localhost:3001/set_adm_token`, { login: name, token: token })
    .then(response => {
      console.log('Данные успешно отправлены:', response);
    })
    .catch(error => {
      console.error('Ошибка при отправке данных:', error);
    });
  }


  const changeLogin = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value.toString())
  }

  const changePass = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value.toString())
  }

  const sendHandle = () => {
    adminsArr.map((el:IAdmins) => {
      if(el.name == login && el.pass == pass){
        if(el.token == "" || el.token != tokenRes){
          setToken()
          setInBase(el.name, decoded)
          
          navigate('/main',{state : {name: el.name, token: el.token}})
        }
      }
    })
  }
  
  return (
    <div className={styles.container}>
      <span>Логин</span>
      <input onChange={changeLogin} type="text" defaultValue={login} className={styles.input}/>
      <span>Пароль</span>
      <input onChange={changePass} type="text" defaultValue={pass} className={styles.input}/>
      <button onClick={sendHandle} className={styles.btn}>Войти</button>
    </div>
  );
}
//! Команда mysql чтобы не забыть 🥲
//! UPDATE `admin` SET `token`='' WHERE `name`='Marat'

//? Позже декомпозировать запросы на хуки