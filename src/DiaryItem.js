import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  const { onRemove } = useContext(DiaryDispatchContext);
  const { onEdit } = useContext(DiaryDispatchContext);
  useEffect(() => {
    console.log(`${author}의 일기 렌더`);
  });
  const editTextarea = useRef();
  const [localContent, setlocalContent] = useState(content); // textarea의 value를 상태로 만듦. 입력값은 항상 state로 관리

  const [isEdit, setisEdit] = useState(false); // 모든 토글 기능은 이렇게 처리하자
  const toggleisEdit = () => {
    setisEdit(!isEdit);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      editTextarea.current.focus();
      return;
    }
    if (window.confirm("일기를 수정하시겠습니까?")) {
      onEdit(id, localContent); // 배열 수정 함수 호출
    } else {
      setlocalContent(content);
    }
    toggleisEdit();
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      {isEdit ? (
        <div>
          <div>
            <textarea
              ref={editTextarea}
              value={localContent}
              className="content"
              onChange={(e) => {
                setlocalContent(e.target.value);
              }}
            ></textarea>
          </div>
          <span>
            <button
              onClick={() => {
                toggleisEdit();
                setlocalContent(content);
              }}
            >
              돌아가기
            </button>
          </span>
          <span>
            <button onClick={handleEdit}>저장하기</button>
          </span>{" "}
        </div>
      ) : (
        <div>
          <div className="content">{content}</div>
          <span>
            <button
              onClick={() => {
                if (window.confirm("정말 일기를 삭제하시겠습니까?")) {
                  onRemove(id);
                }
              }}
            >
              삭제하기
            </button>
          </span>
          <span>
            <button onClick={toggleisEdit}>수정하기</button>
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
