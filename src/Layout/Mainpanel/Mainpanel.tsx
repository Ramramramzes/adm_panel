import { useContext, useEffect, useState } from 'react';
import { findAdmContext } from '../../context/findAdmContext';
import CustomProgressbar from './ProgressbarList/Progressbar_custom';
import { useLocation,useNavigate } from 'react-router-dom';
import styles from './mainpanel.module.css'
import { useWorkers } from '../../hooks/useWorker';

interface IWorker {
  name: string;
  points: number;
  comments: string;
}


export function Main() {
  const location = useLocation();
  const navigate = useNavigate()
  const baseAdm = useContext(findAdmContext)
  const workers:IWorker[] = useWorkers();
  const [guest,setGuest] = useState(false);

  const workersFiltered = workers.sort(function(a, b) {
    return b.points - a.points;
  });
  
  const handleCkickLogin = () => {
    navigate('/');
  }
  
  useEffect(() => {
    if(!guest){
      return
    }
    if (!location.state) {
      navigate('/')
    } else {
      const isValidAdmin = baseAdm.find(el => el.token === location.state.token && el.name === location.state.name)
      if(!isValidAdmin){
        setGuest(true)
      }
    }
  }, [navigate, baseAdm, location.state, guest]);

  const handleCkickRed = () => {
    navigate('/workers_edit',{state:{name:location.state.name}});
  }

  function handleClickPerson(personData:IWorker,admName:string){
    navigate('/person', {state: {personData,admName,name:location.state.name}});
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>Добро пожаловать <span className={styles.admin_name}>{!guest && location.state ? location.state.name : 'Гость'}</span></div>
      {workersFiltered && workersFiltered.map((el,index) => {
        return (
          <div className={styles.prog_block} key={index} onClick={() => handleClickPerson(el,location.state.name)}>
            <CustomProgressbar name={el.name} points={el.points}/>
            {index == 0 && <span className={styles.lead_los}>👑</span>}
            {index == workersFiltered.length -1 && <span className={styles.lead_los}>💩</span>}
          </div>
        )
      })}
      {!guest && location.state ? <button onClick={handleCkickRed} className={styles.btn + ' btn_style'}>Редактировать сотрудников</button> : <button onClick={handleCkickLogin} className={styles.btn + ' btn_style'}>Войти</button>}
    </div>
  );
}
