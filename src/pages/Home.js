import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";
import moment from "moment";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new moment());

  const headText = curDate.format("YYYY년 MM월");

  const increaseMonth = () => {
    setCurDate(curDate.clone().add(1, "months"));
  };
  const decreaseMonth = () => {
    setCurDate(curDate.clone().add(-1, "months"));
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Emotion Dairy`;
  });

  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = curDate.clone().startOf("month");
      const lastDay = curDate.clone().endOf("month");
      setData(
        diaryList.filter(
          (it) =>
            moment(it.date).isSameOrAfter(firstDay) &&
            moment(it.date).isSameOrBefore(lastDay)
        )
      );
    }
  }, [diaryList, curDate]);

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton text="◀" type="transparent" onClick={decreaseMonth} />
        }
        rightChild={
          <MyButton text="▶" type="transparent" onClick={increaseMonth} />
        }
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
export default Home;
