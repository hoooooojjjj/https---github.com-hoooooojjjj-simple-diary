import { useState } from "react";

const DiaryEditor = ()=>{

    // 상태 변화 과정이 동일하다면 묶어줄 수 있다.
    const [state,setstate] = useState({ 
        author : "",
        content : "",
        emotion : 1,
    }); // 초깃값으로 객체를 전달한다. 이 객체는 state에 할당됨.

    const onChanges = (e)=>{ 
        setstate({
            ...state,
            [e.target.name] : e.target.value,
        });
    }

    const handleSubmit = ()=>{
        console.log(state);

    }

    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input name="author" value={state.author} onChange={onChanges}/>
        </div>
        <div>
            <textarea name="content" value={state.content} onChange={onChanges}/>
        </div>
        <div>
            <span>오늘의 감정 점수 : </span>
            <select name="emotion" value={state.emotion} onChange={onChanges}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select> 
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>
    )
}

export default DiaryEditor;