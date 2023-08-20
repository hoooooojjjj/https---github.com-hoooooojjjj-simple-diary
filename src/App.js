import "./App.css";
import DiaryEditor from "./DiaryEdtor";
import DiaryList from "./DiaryList";
import { useEffect, useMemo, useRef, useState } from "react";
// import Lifecycle from "./Lifecycle";

function App() {
  const [diaryDatas, setdiaryDatas] = useState([]);

  const dataId = useRef(0);

  // API를 호출하는 getdata 함수
  const getdata = async () => {
    const res = await fetch(
      // 비동기 함수 fetch()로 API 받아오기
      "https://jsonplaceholder.typicode.com/comments"
    )
      .then((res) => {
        return res.json(); // API 데이터를 json 형태로 변환
      })
      .catch((err) => {
        console.log(err);
      });

    // 초기 일기 데이터 세팅
    const ininData = res.slice(0, 20).map((item) => {
      // 초기 데이터 배열
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setdiaryDatas(ininData); // 초기 데이터 배열을 diaryDatas에 할당
  };

  useEffect(() => {
    getdata(); // getdata 함수 호출
  }, []);

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

  // useMemo() -> 연산 최적화 = 필요할 때만 연산을 수행하도록 해줌
  // 감정 비율 분석 -> useMemo 사용 -> 이것은 더 이상 함수가 아님. -> usememo가 리턴하는 값을 그대로 받음.
  const emotionAnalysis = useMemo(() => {
    // 첫번째 인자로 콜백함수 -> 콜백함수의 연산을 최적화해줌 -> 콜백함수의 리턴값을 그대로 반환
    const goodCount = diaryDatas.filter((it) => it.emotion >= 3).length;
    const sadCount = diaryDatas.length - goodCount;
    const goodRatio = (goodCount / diaryDatas.length) * 100;
    return { goodCount, sadCount, goodRatio }; // 리턴 값이 존재해야함
  }, [diaryDatas.length]); // 두번째 인자로 이 값이 바뀔 때만 콜백함수를 실행시킬 값

  const { goodCount, sadCount, goodRatio } = emotionAnalysis; // 값으로 사용해야함.
  return (
    <div className="App">
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 개수 : {diaryDatas.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {sadCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList diaryData={diaryDatas} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
