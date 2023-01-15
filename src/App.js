import "./App.css";
import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import moment from "moment";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter(
        (it) => parseInt(it.id) !== parseInt(action.data.id)
      );
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData && JSON.parse(localData).length > 0) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(a.id) - parseInt(b.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);
  const dataId = useRef(0);
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new moment(date).format("YYYY-MM-DDTHH:mm"),
        content,
        emotion,
      },
    });
    dataId.current++;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", data: { id: targetId } });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new moment(date).format("YYYY-MM-DDTHH:mm"),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
