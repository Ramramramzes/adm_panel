import axios from "axios";
import styles from './login.module.css';
import { tokenGenerate } from "../key_generator";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAdm } from "../hooks/useAdm";

const token = tokenGenerate(30); 

interface IAdmins{
  name: string;
  pass: string;
  token: string;
}

export function Login1() {
  const navigate = useNavigate()
  const [login,setLogin] = useState('')
  const [pass,setPass] = useState('')
  const [tokenRes,setTokenRes] = useState('')
  const [findAdm,setFindAdm] = useState<IAdmins>()

  const adminsArr:IAdmins[] = useAdm();
  const decoded = btoa(token)
  
  useEffect(()=>{
    axios.get('http://localhost:3001/get-cookie', {
      withCredentials: true // Включаем отправку куков
    })
    .then(response => {
      if(response.data.token != ''){
        const res = atob(response.data.token);
        setTokenRes(res)
      }
    })
    .catch(error => {
      console.error('Нет токена:', error);
    });


    adminsArr.map((el) => {
      if(tokenRes == atob(el.token)){
        navigate('/main')
      }
    })

  },[tokenRes])
  
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
          setFindAdm(el)
          console.log(el.name);
          setInBase(el.name, decoded)
          navigate('/main')
        }
      }
    })
  }
  
  //? findAdm используя для прокидки пропсов
  console.log(findAdm);
  
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