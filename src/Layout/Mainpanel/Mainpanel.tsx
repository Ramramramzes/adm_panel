import { useContext, useEffect } from 'react';
import { findAdmContext } from '../../context/findAdmContext';
import CustomProgressbar from './ProgressbarList/Progressbar_custom';
import { useLocation,useNavigate } from 'react-router-dom';
import styles from './mainpanel.module.css'


export function Main() {
  const location = useLocation();
  const navigate = useNavigate()
  const baseAdm = useContext(findAdmContext)

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


  return (
    <div>
      <div className={styles.mainColor}>Добро пожаловать {location.state && location.state.name}</div>
      <CustomProgressbar />
    </div>
  );
}
