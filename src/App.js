import "./App.css";
import DiaryEditor from "./DiaryEdtor";
import DiaryList from "./DiaryList";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
// import OptimizeTest from "./OptimizeTest";
// import Lifecycle from "./Lifecycle";

const reducer = (state, action) => {
  // state와 action 객체를 인자로 받음
  switch (action.type) {
    case "INIT": {
      // 컴포넌트 안에 있던 상태관리 로직을 그대로 넣음
      // 변경할 state값을 리턴함, 즉 setdate(이 안에 들어갔던 것을 리턴함)
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((data) => data.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((data) => {
        if (data.id === action.targetId) {
          data.content = action.editContent;
        }
        return data;
      });
    }
    default:
      return state;
  }
};
// Context를 사용하여 하나의 기능을 하는 컴포넌트들을 묶어서 데이터를 공급해줄 수 있다.
// 이를 통해 ComponentDrilling을 해결할 수 있다.
// Provider 컴포넌트에 value로 공급해줄 데이터를 보내고 이를 자식 컴포넌트가 받는다.
export const DiaryStateContext = React.createContext(); // Context를 생성하고 export한다.
export const DiaryDispatchContext = React.createContext(); // 상태관리 로직은 분리해서 전달해야한다.

function App() {
  // const [diaryDatas, setdiaryDatas] = useState([]);

  // useReducer를 사용하여 복잡한 상태 관리(업데이트) 로직 분리하기
  // -> "상태변화함수를 사용하는 로직"이 많아지면 컴포넌트가 복잡하고 길어지기 때문에 이를 컴포넌트 밖으로 분리하는 방법
  const [diaryDatas, dispatch] = useReducer(reducer, []);
  // [state,상태변화함수(객체를 받음)] = useRudcer(상태를 변화시키는 함수(dispatch를 통해 데이터를 받음), 초깃값)

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
    // action객체를 dispatch함수에 전달
    // action 객체는 type과 로직을 그대로 옮길 때 필요한 인자 비슷한 것을 객체로 넘김
    // 그 다음 reducer 함수에 그대로 로직을 전달
    dispatch({ type: "INIT", data: ininData });
    // setdiaryDatas(ininData); // 초기 데이터 배열을 diaryDatas에 할당
  };

  useEffect(() => {
    getdata(); // getdata 함수 호출
  }, []);

  // state 끌어올리기 -> 최상위 컴포넌트에서 이벤트가 발생하면 실행될 '함수'를 만들고 전달,
  // 하위 컴포넌트에서 '이벤트'(->함수)를 현재 데이터를 인자로 전달하여 실행

  // 배열 데이터 생성
  // useCallback -> 자식 컴포넌트로 넘어가는 함수 props가 변하지 않으면 현재 컴포넌트가 리렌더링 되더라도 새로 만들어지지 않게
  // 이때는 "함수형 업데이트"를 사용해야함. 의존성 배열에 빈 배열을 전달하고 함수형 업데이트를 통해 현재 state를 전달해줘야함
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: Date.now() },
    });
    // const created_date = new Date().getTime();

    // // 새로 들어갈 배열 요소
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: Date.now(),
    // };
    // diaryDatasId.current += 1;
    // setdiaryDatas((diaryDatas) => [newItem, ...diaryDatas]); // [새로 들어갈 배열 요소, ...기존 요소들]
  }, []);

  // 배열 삭제
  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
    // setdiaryDatas((diaryDatas) =>
    //   diaryDatas.filter((data) => data.id !== targetId)
    // );
  }, []);

  // 배열 수정
  const onEdit = useCallback((targetId, editContent) => {
    dispatch({ type: "EDIT", targetId, editContent });
    // setdiaryDatas((diaryDatas) => {
    //   return diaryDatas.map((data) => {
    //     if (data.id === targetId) {
    //       data.content = editContent;
    //     }
    //     return data;
    //   });
    // });
  }, []);

  const MemoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

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
    <DiaryStateContext.Provider value={diaryDatas}>
      <DiaryDispatchContext.Provider value={MemoizedDispatches}>
        <div className="App">
          {/* <Lifecycle /> */}
          {/* <OptimizeTest /> */}
          <DiaryEditor />
          <div>전체 일기 개수 : {diaryDatas.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {sadCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
