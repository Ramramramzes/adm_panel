// import ProgressBar from 'react-bootstrap/ProgressBar';
import { useWorkers } from '../../../hooks/useWorker';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IWorker {
  name: string;
  points: number;
  comments: string;
}
// const colors: string[] = ['success', 'danger', 'warning', 'info'];






export default function CustomProgressbar() {
  // const [report,setReport] = useState({})
  const workers:IWorker[] = useWorkers();
  const navigate = useNavigate()

  useEffect (() =>{
    if(workers.length != 0){
      console.log(JSON.parse(workers[0].comments));
    }
  },[workers])
  
  
  const handleCkickRed = () => {
    navigate('/workers_edit');
  }
  
  return (
    <div>
      <button onClick={handleCkickRed}>Редактировать сотрудников</button>
    </div>
    
  )
}


{/* <ProgressBar variant={colors[(Math.floor(Math.random() * 3))]} animated now={el.points} /> */}

// UPDATE `worker` 
// SET `comments` = '{"adm": "Marat", "comment": "Сделал то-то то-то , плохо", "status": 0}' 
// WHERE `name` = 'Marat';
