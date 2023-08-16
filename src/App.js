import "./App.css";
import DiaryEditor from "./DiaryEdtor";
import DiaryList from "./DiaryList";
import { useState } from "react";
import Lifecycle from "./Lifecycle";
function App() {
  const [diaryDatas, setdiaryDatas] = useState([]);

  // const diaryDatasId = useRef(0);

  // state 끌어올리기 -> 최상위 컴포넌트에서 이벤트가 발생하면 실행될 '함수'를 만들고 전달,
  // 하위 컴포넌트에서 '이벤트'(->함수)를 현재 데이터를 인자로 전달하여 실행

  // 배열 데이터 생성
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();

    // 새로 들어갈 배열 요소
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: Date.now(),
    };
    // diaryDatasId.current += 1;
    setdiaryDatas([newItem, ...diaryDatas]); // [새로 들어갈 배열 요소, ...기존 요소들]
  };

  // 배열 삭제
  const onRemove = (targetId) => {
    const deleteData = diaryDatas.filter((data) => {
      return data.id !== targetId;
    });
    setdiaryDatas(deleteData);
  };

  // 배열 수정
  const onEdit = (targetId, editContent) => {
    const editdiaryDatas = diaryDatas.map((data) => {
      if (data.id === targetId) {
        data.content = editContent;
      }
      return data;
    });
    setdiaryDatas(editdiaryDatas);
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryData={diaryDatas} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
