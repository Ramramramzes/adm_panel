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

  const [reload,setReload] = useState(0)

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
  
  useEffect(() => {
    if(reload != 0){
      location.reload();
    }
  },[reload])

  const changeLogin = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value.toString())
  }

  const changePass = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value.toString())
  }

  const sendHandle = () => {
    for (const el of adminsArr) {
      if (el.name == login && el.pass == pass) {
        if (el.token == "" || el.token != tokenRes) {
          setTokenInBase(el.name, decoded,setReload);
          setTokenInCookie(decoded,setReload);
        }
      }
    }
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