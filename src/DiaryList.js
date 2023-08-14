import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryData, onRemove, onEdit }) => {
  return (
    <div className="DiaryList">
      <div>
        <h2>일기 리스트</h2>
        <h4>{diaryData.length}개의 일기가 있습니다.</h4>
      </div>
      <div>
        {diaryData.map(
          (
            item // jsx에 배열도 들어갈 수 있다. -> {[]} 가능 => 배열을 html에 렌더링할 수 있음
          ) => (
            <DiaryItem
              key={item.id}
              {...item}
              onRemove={onRemove}
              onEdit={onEdit}
              diaryData={diaryData}
            />
          )
        )}
      </div>
    </div>
  );
};
DiaryList.defaultProps = {
  // props가 undefined인 경우 디폴트 값 설정
  diaryData: [],
};

export default DiaryList;
