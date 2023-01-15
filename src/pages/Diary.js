import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { emotionList } from "../util/emotion";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import ToggleMenu from "../components/ToggleMenu";
import moment from "moment";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find(
        (it) => parseInt(id) === parseInt(it.id)
      );
      if (targetDiary) {
        setData(targetDiary);
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `${moment(targetDiary.date).format(
          "MM월 DD일 dddd"
        )} - Emotion Dairy`;
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [id, diaryList, data, navigate]);

  if (data) {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="Diary">
        <MyHeader
          headText={`${moment(data.date).format("YYYY년 MM월 DD일 dddd")}`}
          leftChild={<MyButton type={"back"} onClick={() => navigate(-1)} />}
          rightChild={<ToggleMenu id={id} />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="face" />
              <div className="emotion_description">
                <span>{curEmotionData.emotion_description}</span>
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};
export default Diary;
