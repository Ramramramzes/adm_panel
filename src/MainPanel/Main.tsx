
import { useLocation } from 'react-router-dom';

export function Main() {
  const location = useLocation();
  const {name: admName, token: admToken} = location.state;
  console.log(admName,admToken);
  
  

  return (
    <div>Добро пожаловать {admName && admName}</div>
  );
}
