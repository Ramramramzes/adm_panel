import { useState, useEffect } from 'react';
import axios from 'axios';

export function useWorkers() {
  const [workersArr, setWorkersArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/workers');
        setWorkersArr(response.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    fetchData();
  }, []);

  return workersArr;
}
