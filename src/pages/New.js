import DiaryEditor from "../components/DiaryEditor";
import { useEffect } from "react";
const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `새 일기 작성하기 - Emotion Dairy`;
  });

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};
export default New;
