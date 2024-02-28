import styles from './login.module.css';
import { tokenGenerate } from "../../functions/key_generator";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { findAdmContext } from "../../context/findAdmContext";
import useGetCookie from "../../hooks/useGetCookie";
import setTokenInCookie from '../../functions/setTokenInCookie';
import setTokenInBase  from "../../functions/setTokenInBase";

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
  

  const changeLogin = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value.toString())
  }

  const changePass = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value.toString())
  }

  const sendHandle = () => {
    adminsArr.map(async (el:IAdmins) => {
      if(el.name == login && el.pass == pass){
        if(el.token == "" || el.token != tokenRes){
          await setTokenInBase(el.name, decoded)
          await setTokenInCookie(decoded)
          location.reload()
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