import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();

  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `일기 수정 - Emotion Dairy`;
  });

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find(
        (it) => parseInt(id) === parseInt(it.id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [diaryList, id]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};
export default Edit;
