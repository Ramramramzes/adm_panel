import { useNavigate } from "react-router-dom";

export function Edit() {
  const navigate = useNavigate()
  const handleClickBack = () => {
    navigate('/main');
  }
  return (
    <div>
      <form action="">
        <input type="text" />
        <input type="button" value="Добавить сотрудника" />
      </form>
      <form action="">
        <input type="text" />
        <input type="button" value="Удалить сотрудника" />
      </form>
      <button onClick={handleClickBack}>На главную</button>
    </div>
  );
}
