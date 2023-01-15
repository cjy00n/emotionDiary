import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { DiaryDispatchContext } from "../App";
const EditAndRemoveMenu = ({ id }) => {
  const { onRemove } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();

  const handleRemove = () => {
    if (window.confirm("일기를 삭제할까요?")) {
      onRemove(id);
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="EditAndRemoveMenu">
      <MyButton text={"수정하기"} onClick={() => navigate("/edit/" + id)} />
      <MyButton text={"삭제하기"} type="negative" onClick={handleRemove} />
    </div>
  );
};
export default EditAndRemoveMenu;
