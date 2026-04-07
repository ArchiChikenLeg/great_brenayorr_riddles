import { useState } from 'react'
import './App.css'
import RiddleBlock from './RiddleBlock.jsx'


function App() {
  let [riddle, setRiddle] = useState('none');
  return(<>
    <div className='btnList'>
      <button onClick={() => setRiddle('lockpick')} className='rdlBtn'>Lock Pick</button>
      <button onClick={() => setRiddle('none')} className='rdlBtn clsBtn'>Close</button>
    </div> 
    <RiddleBlock riddleCode={riddle}></RiddleBlock>
  </>)
}
export default App
