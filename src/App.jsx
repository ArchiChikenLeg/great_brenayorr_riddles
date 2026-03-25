import { useState } from 'react'
import './App.css'
import Cell from './Cell.jsx'

function App() {
  const [valueMatrix, setValueMatrix] = useState([
  ["success", "plus-two", "fail", "plus-one"],
  ["fail", "success", "plus-one", "fail"],
  ["plus-one", "fail", "success", "plus-two"],
  ["plus-two", "plus-one", "plus-two", "success"],
  ]);

  const VALUES = ["success", "plus-one", "plus-two", "fail"]
  const [cells, setCells] = useState(
  valueMatrix.map(row =>
    row.map(value => ({
      isOpen: false,
      value,
    }))
  )
);

const [ingeneeringCheck, setIngeneeringCheck] = useState(8);

const handleClick = (row, col) => {
  setCells(prev => {
    const copy = prev.map(r => r.map(c => ({ ...c })));
    copy[row][col].isOpen = !copy[row][col].isOpen;
    return copy;
  });
  if (cells[row][col].value == "plus-one" && !cells[row][col].isOpen)
    setIngeneeringCheck(ingeneeringCheck+1);
  if (cells[row][col].value == "plus-two" && !cells[row][col].isOpen)
    setIngeneeringCheck(ingeneeringCheck+2);
};

const [isDMMode, setIsDMMode] = useState(false); 

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function generateBalancedMatrix() {
  const columns = [];

  for (let c = 0; c < 4; c++) {
    columns[c] = shuffle([...VALUES]); // кожен стовпець має всі 4 значення
  }

  const matrix = [];
  for (let r = 0; r < 4; r++) {
    matrix[r] = [];
    for (let c = 0; c < 4; c++) {
      matrix[r][c] = columns[c][r];
    }
  }

  return matrix;
}
  
const generateNewMatrix = () => {
  const newMatrix = generateBalancedMatrix().map(row =>
    row.map(value => ({ isOpen: false, value }))
  );
  setCells(newMatrix);
  setIngeneeringCheck(8);
};
const updateCell = (rowIndex, colIndex, newData) => {
  setCells(prev =>
    prev.map((row, r) =>
      row.map((cell, c) =>
        r === rowIndex && c === colIndex
          ? { ...cell, ...newData } // змінюємо тільки цю клітинку
          : cell
      )
    )
  );
};

const ShowNextFail = () =>{
      let  maxOpenedCol = -1;
      

      for(let i = 0; i <4; i++ ){
        const tmpColumn = [];
        for(let j = 0; j < 4; j++){
          tmpColumn.push(cells[j][i].isOpen);
        }
        if (tmpColumn.includes(true))
          maxOpenedCol = i;
      }
      
      console.log(maxOpenedCol)

      cells.forEach((row, rowIndex) => {
        if (row[maxOpenedCol+1].value === "fail") {
          updateCell(rowIndex, maxOpenedCol+1, { isOpen: true });
        }
      });


      
}

  return (
    <>
    <p>Перевірка інженерії: {ingeneeringCheck}</p>
       <div className="grid">
      {cells.map((row, rowIndex) =>
    row.map((cell, colIndex) => (
      <Cell className="cell"
        key={`${rowIndex}-${colIndex}`}
        isOpen={cell.isOpen}
        value={cell.value}
        onClick={() => handleClick(rowIndex, colIndex)}
      />
    ))
  )}
    </div>
    <div className="command-pannel">
      <button onClick={() => setIsDMMode(prev => !prev)} className="btn-DM-mode">
        DM Mode
      </button>
      <button onClick={generateNewMatrix} className="btn-new-matrix">
        New Matrix
      </button>
      <button onClick={ShowNextFail} className="btn-new-matrix">Show next fail</button>
    </div>
    
    {isDMMode && (
  <div className="dm-grid">
    {cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          key={`dm-${rowIndex}-${colIndex}`}
          className={`cell-${cell.value}`}
        >
          {cell.value}
        </div>
      ))
    )}
  </div>
)}
    </>
  )
}

export default App
