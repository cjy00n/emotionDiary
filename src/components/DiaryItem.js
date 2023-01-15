import { useNavigate } from "react-router-dom";
import React from "react";
import ToggleMenu from "./ToggleMenu";
import moment from "moment";
import "moment/locale/ko";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const strDate = moment(date).format("MM월 DD일 dddd");
  const strTime = moment(date).format("LT");

  return (
    <div className="DiaryItem">
      <div className="top" onClick={() => navigate("/diary/" + id)}>
        <div
          className={[
            "emotion_img_wrapper",
            "emotion_img_wrapper_" + emotion,
          ].join(" ")}
        >
          <img
            src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
            alt="face"
          />
        </div>
        <div className="date_wrapper">
          <div className="diary_date">{strDate}</div>
          <div className="diary_time">{strTime}</div>
        </div>
        <div className="btn_wrapper" onClick={(e) => e.stopPropagation()}>
          <ToggleMenu id={id} />
        </div>
      </div>
      <div className="bottom" onClick={() => navigate("/diary/" + id)}>
        <div className="info_wrapper">
          <div className="diary_content">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
