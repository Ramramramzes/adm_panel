import { useContext, useEffect } from 'react';
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

  const workersFiltered = workers.sort(function(a, b) {
    return b.points - a.points;
  });
  
  useEffect(() => {
    if (!location.state) {
      navigate('/');
    } else {
      const isValidAdmin = baseAdm.find(el => el.token === location.state.token && el.name === location.state.name)
      if(!isValidAdmin){
        navigate('/');
      }
    }
  }, [navigate, baseAdm, location.state]);

  const handleCkickRed = () => {
    navigate('/workers_edit');
  }

  function handleClickPerson(personData:IWorker,admName:string){
    navigate('/person', {state: {personData,admName}});
  }

  
  console.log(workers);
  
  return (
    <div>
      <div className={styles.mainColor}>Добро пожаловать {location.state && location.state.name}</div>
      {workersFiltered && workersFiltered.map((el,index) => {
        return (
          <div key={index} onClick={() => handleClickPerson(el,location.state.name)}>
            <CustomProgressbar name={el.name} points={el.points}/>
            {index == 0 && <div> index == first</div>}
            {index == workersFiltered.length -1 && <div> index == last</div>}
          </div>
        )
      })}
      <button onClick={handleCkickRed}>Редактировать сотрудников</button>
    </div>
  );
}
