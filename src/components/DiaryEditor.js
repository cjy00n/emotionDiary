import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import moment from "moment";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [date, setDate] = useState(new moment().format("YYYY-MM-DDTHH:mm"));
  const [emotion, setEmotion] = useState(1);
  const [content, setContent] = useState("");

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm((isEdit ? "수정된 " : "새 ") + "일기를 저장할까요?")) {
      if (isEdit) {
        onEdit(originData.id, date, content, emotion);
      } else {
        onCreate(date, content, emotion);
      }
    } else {
      return;
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(originData.date);
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <div>
        <MyHeader
          headText={isEdit ? "일기 수정하기" : "새 일기 작성하기"}
          leftChild={<MyButton type={"back"} onClick={() => navigate(-1)} />}
        />
      </div>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 기분은 어때요?</h4>
          <div className="emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기를 작성해주세요.</h4>
          <div className="text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="submit_btn">
            <MyButton text={"완료"} type="positive" onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
