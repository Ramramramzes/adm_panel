import ProgressBar from 'react-bootstrap/ProgressBar';

interface IWorker {
  name: string;
  points: number;
}

const colors: string[] = ['success', 'danger', 'warning', 'info'];
const workers: IWorker[] = [
  {
    name: 'Марат',
    points: 10,
  }
]


export default function CustomProgressbar() {
  return (
    <div>
      <div>{workers[0].name}</div>
      <ProgressBar variant={colors[0]} animated now={workers[0].points} />
    </div>
    
  )
}