import styles from './edit.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from "react";
import delWorker from "../../functions/delWorker";
import setWorker from "../../functions/setWorker";
import { useContext } from "react";
import { findAdmContext } from "../../context/findAdmContext";
import useGetCookie from "../../hooks/useGetCookie";

export function Edit() {
  const navigate = useNavigate()
  const [delInpt,setDelInpt] = useState('')
  const [setInpt,setSetInpt] = useState('')
  const baseAdm = useContext(findAdmContext)
  const myCookie = useGetCookie()
  const isValidAdmin = baseAdm.find(el => el.token === myCookie)
  const location = useLocation()

  useEffect(() => {
      if(!isValidAdmin){
        navigate('/');
      }
  }, [baseAdm, myCookie, navigate]);

  const handleSetChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSetInpt('')
    setSetInpt(event.target.value.toString())
  }

  const handleDelChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    
    setDelInpt(event.target.value.toString())
  }

  const handleClickBack = () => {
    navigate('/main',{state:{name:location.state.name}});
  }
  return (
    <div className={styles.container}>
      <Accordion className={styles.accordion}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Добавить сотрудника</Accordion.Header>
          <Accordion.Body className={styles.acc_body}>
            <input onChange={handleSetChange} value={setInpt} type="text" placeholder="Имя сотрудника" className={styles.input}/>
            <button onClick={() => {setWorker(setInpt),setSetInpt('')}}  className={styles.btn + ' btn_style'}>Добавить</button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Удалить сотрудника</Accordion.Header>
          <Accordion.Body className={styles.acc_body}>
            <input onChange={handleDelChange} value={delInpt} type="text" placeholder="Имя сотрудника" className={styles.input}/>
            <button onClick={() => {delWorker(delInpt), setDelInpt('')}} className={styles.btn + ' btn_style'}>Удалить</button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <button onClick={handleClickBack} className={styles.back_btn + ' btn_style'}>Назад</button>
    </div>
  );
}




