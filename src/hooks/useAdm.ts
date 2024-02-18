import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAdm() {
  const [adminsArr, setAdminsArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admins');
        setAdminsArr(response.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    fetchData();
  }, []);

  return adminsArr;
}
