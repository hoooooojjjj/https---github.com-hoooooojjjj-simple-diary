// import React, { useEffect, useState } from "react";

// // React.memo를 사용하면 컴포넌트가 받는 props가 바뀔 때만 컴포넌트가 렌더링되어 성능 최적화!
// const CounterA = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log({ count });
//   });
//   return <div>{count}</div>;
// });

// // 하지만 props가 객체일 경우 그냥 React.memo를 사용하면 안되고, 비교함수를 사용해야 한다. -> 참조 타입 문제
// // 1. 컴포넌트를 하나 기본적으로 만들고
// const CounterB = ({ obj }) => {
//   useEffect(() => {
//     console.log(obj.count);
//   });
//   return <div>{obj.count}</div>;
// };
// // 2. 비교함수를 생성
// const areEqual = (prevProps, nextProps) => {
//   return prevProps.obj.count === nextProps.obj.count;
// };
// // 3. 새로운 컴포넌트를 만듦(고차 컴포넌트) -> 이를 상위 컴포넌트로 임폴트함.
// const MemoizedCounterB = React.memo(CounterB, areEqual);

// const OptimizeTest = () => {
//   const [count, setcount] = useState(1);
//   const [obj, setobj] = useState({
//     count: 1,
//   });
//   return (
//     <div style={{ padding: 50 }}>
//       <div>
//         <h2>counter A</h2>
//         <CounterA count={count} />
//         <button
//           onClick={() => {
//             setcount(count);
//           }}
//         >
//           A button
//         </button>
//       </div>
//       <div>
//         <h2>counter B</h2>
//         <MemoizedCounterB obj={obj} />
//         <button
//           onClick={() => {
//             setobj({
//               count: obj.count,
//             });
//           }}
//         >
//           B button
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OptimizeTest;
