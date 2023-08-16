import { useEffect, useState } from "react";

const Unmount = () => {
  // *** Lifecycle 컴포넌트가 언마운트됐을 때 -> 화면에서 사라졌을 때
  useEffect(() => {
    console.log("Mount!");
    return () => {
      // 함수를 리턴하면 언마운트됐을 때 이 함수가 실행됨
      console.log("unmount!");
    };
  }, []);
  return <div>unmount testing component</div>;
};

const Lifecycle = () => {
  //   const [count, setcount] = useState(0);
  //   const [text, settext] = useState("");
  const [isvisible, setisvisible] = useState(false);
  const toggle = () => {
    setisvisible(!isvisible);
  };

  //   // *** Lifecycle 컴포넌트가 마운트됐을 때 -> 화면에 생겼을 때
  //   useEffect(() => {
  //     console.log("Mount!");
  //   }, []); // 의존성 배열에 빈 배열을 전달하면 마운트됐을 때 함수 실행 가능

  //   // *** Lifecycle 컴포넌트가 업데이트됐을 때 -> 리렌더링 됐을 때
  //   useEffect(() => {
  //     console.log("Update!");
  //   }); // 의존성 배열을 전달하지 않으면 업데이트 됐을 때 함수 실행 가능
  //   useEffect(() => {
  //     console.log("count Update!");
  //   }, [count]); // 의존성 배열에 특정 상태를 넣으면 그 상태로 인해
  //   // 컴포넌트가 업데이트 됐을 때 함수 실행 가능
  //   useEffect(() => {
  //     console.log("text Update!");
  //   }, [text]);

  return (
    <div style={{ padding: 20 }}>
      {/* {count}
      <button
        onClick={() => {
          setcount(count + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setcount(count - 1);
        }}
      >
        -
      </button>
      <div>
        <input
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />
      </div> */}

      <button onClick={toggle}>on/off</button>
      {isvisible && <Unmount />}
    </div>
  );
};

export default Lifecycle;
