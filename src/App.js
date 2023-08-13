import './App.css';
import DiaryEditor from './DiaryEdtor';
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';
function App() {
  const [diaryDatas, setdiaryDatas] = useState([]);

  const diaryDatasId = useRef(0);

  const onCreate = (author,content,emotion)=>{
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : diaryDatasId.current,
    }
    diaryDatasId.current += 1;
    setdiaryDatas([newItem,...diaryDatas]);
  }
  return (
    <div className="App">
      <DiaryEditor onCreate ={onCreate}/>
      <DiaryList  diaryData={diaryDatas}/> 
    </div>
  );
}

export default App;
