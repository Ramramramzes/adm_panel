import { useContext, useEffect } from 'react';
import { findAdmContext } from '../context/findAdmContext';
import CustomProgressbar from './Progressbar/Progressbar_custom';
import { useLocation,useNavigate } from 'react-router-dom';
import styles from './mainpanel.module.css'


export function Main() {
  const location = useLocation();
  const navigate = useNavigate()
  const baseAdm = useContext(findAdmContext)
  const {name: admName, token: admToken} = location.state;

  useEffect(()=>{
    baseAdm.find(el => el.token == admToken)?.name != admName ? navigate('/') : false;
  },[])
  

  return (
    <div>
      <div className={styles.mainColor}>Добро пожаловать {admName && admName}</div>
      <CustomProgressbar />
    </div>
  );
}
