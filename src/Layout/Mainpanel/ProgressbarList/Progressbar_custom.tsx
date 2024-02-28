import { ProgressBar } from 'react-bootstrap';


const colors: string[] = ['success', 'danger', 'warning', 'info'];


export default function CustomProgressbar({name,points}:{name: string, points: number}) {
  
  return (
    <div>
      <h3>{name}</h3>
      <ProgressBar variant={colors[(Math.floor(Math.random() * 3))]} animated now={points} />
    </div>
    
  )
}


{/* <ProgressBar variant={colors[(Math.floor(Math.random() * 3))]} animated now={el.points} /> */}

// UPDATE `worker` 
// SET `comments` = '{"adm": "Marat", "comment": "Сделал то-то то-то , плохо", "status": 0}' 
// WHERE `name` = 'Marat';
