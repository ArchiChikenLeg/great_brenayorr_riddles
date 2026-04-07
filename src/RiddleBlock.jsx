import './App.css'
import LockPick from './LockPick';


function RiddleBlock({riddleCode}) {
  return(<>
    {(riddleCode == 'lockpick')
    &&
    (<LockPick></LockPick>)}
  </>)
}
export default RiddleBlock