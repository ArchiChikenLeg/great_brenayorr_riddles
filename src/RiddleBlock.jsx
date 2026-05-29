import './App.css'
import LockPick from './LockPick';
import Mechanic from './Mechanic';


function RiddleBlock({riddleCode}) {
  return(<>
    {(riddleCode == 'lockpick')
    &&
    (<LockPick></LockPick>)}
    {(riddleCode == 'mechanic')
    &&
    (<Mechanic></Mechanic>)}
  </>)
}
export default RiddleBlock