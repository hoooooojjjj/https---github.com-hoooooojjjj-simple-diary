import React, { useEffect, useState } from "react";

// React.memo를 사용하면 컴포넌트가 받는 props만 바뀔 때 컴포넌트가 렌더링되어 성능 최적화!
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log({ count });
  });
  return <div>{count}</div>;
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(obj.count);
  });
  return <div>{obj.count}</div>;
};
const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
};
const MemoizedCounterB = React.memo(CounterB, areEqual);
const OptimizeTest = () => {
  const [count, setcount] = useState(1);
  const [obj, setobj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>counter A</h2>
        <CounterA count={count} />
        <button
          onClick={() => {
            setcount(count);
          }}
        >
          A button
        </button>
      </div>
      <div>
        <h2>counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() => {
            setobj({
              count: obj.count,
            });
          }}
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
