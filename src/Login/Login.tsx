// import styles from './login.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdm } from '../hooks/useAdm';
import { tokenGenerate } from '../key_generator';

interface IAdmins{
  name: string;
  pass: string;
  token: string;
}

export function Login() {
  const [login,setLogin] = useState('')
  const [pass,setPass] = useState('')
  const [findAdm,setFindAdm] = useState<IAdmins>()
  const navigate = useNavigate()


  const adminsArr = useAdm()
  
  useEffect(() => {
    if(findAdm?.token == ''){
      console.log(tokenGenerate(30))
      localStorage.setItem('adm_pan_key', JSON.stringify(tokenGenerate(30)));
      localStorage.setItem('adm_pan_name', JSON.stringify(findAdm.name));
      navigate('/main')
    }else{
      console.log(findAdm?.token);
    }
    
    
  }, [findAdm]);




  const checkHandler = () => {
    adminsArr.map((el:IAdmins) => {
      if(el.name == login && el.pass == pass){
        setFindAdm(el)
      }
    })
  }
  
  const changeLogin = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value.toString())
  }

  const changePass = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value.toString())
  }

  return (
    <div>
      <input onChange={changeLogin} type="text" defaultValue={login}/>
      <input onChange={changePass} type="text" defaultValue={pass}/>
      <button onClick={checkHandler}>Отправить</button>
    </div>
  );
}
