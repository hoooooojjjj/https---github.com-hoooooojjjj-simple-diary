import { useRef, useState } from "react";

const DiaryEditor = ({onCreate})=>{
    const authorInput = useRef();
    const contentText = useRef();

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
        if(state.author.length < 1){
            authorInput.current.focus();
            authorInput.current.placeholder = "작성자를 입력해주세요!"
            return;
        }
        if(state.content.length < 5){
            contentText.current.focus();
            contentText.current.placeholder = "일기 본문을 입력해주세요!"
            return;
        }
        // state.id = Date.now(); // 고유 id 추가
        // state.created_date = new Date().getTime(); // 입력한 시간 추가
        // setdiaryData(diaryData.concat(state)); // 기존 배열에 입력한 새로운 배열 추가
        // setstate({ // 입력한 새로운 배열 데이터를 diaryData로 보낸 후 초기화하여 input 입력값 초기화
        //     author : "",
        //     content : "",
        //     emotion : 1,
        // });
        onCreate(state.author, state.content, state.emotion);
        setstate({ // 입력한 새로운 배열 데이터를 diaryData로 보낸 후 초기화하여 input 입력값 초기화
            author : "",
            content : "",
            emotion : 1,
        });
    }
    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input placeholder="작성자" ref={authorInput} name="author" value={state.author} onChange={onChanges}/>
        </div>
        <div>
            <textarea placeholder="일기 본문" ref={contentText} name="content" value={state.content} onChange={onChanges}/>
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