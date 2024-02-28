import { useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { useState } from "react";
import delWorker from "../hooks/delWorker";
import setWorker from "../hooks/setWorker";






export function Edit() {
  const navigate = useNavigate()

  const [delInpt,setDelInpt] = useState('')
  const [setInpt,setSetInpt] = useState('')

  const handleSetChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSetInpt('')
    setSetInpt(event.target.value.toString())
  }

  const handleDelChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    
    setDelInpt(event.target.value.toString())
  }

  const handleClickBack = () => {
    navigate('/main');
  }
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Добавить сотрудника</Accordion.Header>
          <Accordion.Body>
            <input onChange={handleSetChange} value={setInpt} type="text" placeholder="Имя сотрудника"/>
            <button onClick={() => {setWorker(setInpt),setSetInpt('')}}>Добавить</button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Удалить сотрудника</Accordion.Header>
          <Accordion.Body>
            <input onChange={handleDelChange} value={delInpt} type="text" placeholder="Имя сотрудника"/>
            <button onClick={() => {delWorker(delInpt), setDelInpt('')}}>Удалить</button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <button onClick={handleClickBack}>На главную</button>
    </div>
  );
}




