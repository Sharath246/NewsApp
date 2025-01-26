import React, { useState, useEffect } from "react";
import "./PlaySudoku.css";
import { useNavigate } from "react-router-dom";

export default function PlaySudoku() {
  const [sudoku, setSudoku] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<string>("Easy");
  let grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  function handleGetSudoku() {
    function getNumClues() {
      if (difficulty === "") return -1;
      let random = Math.random();
      if (difficulty === "Easy") return Math.floor(35 + random * 11);
      else if (difficulty === "Medium") return Math.floor(28 + random * 7);
      else return Math.floor(20 + random * 8);
    }

    function fillCells(cells: number[]) {
      for (let i = 0; i < cells.length; i++) {
        let row = Math.floor(cells[i] / 9),
          col = cells[i] % 9,
          gridNum = 0;

        if (row <= 2) {
          if (col <= 2) gridNum = 0;
          else if (col >= 6) gridNum = 2;
          else gridNum = 1;
        } else if (row >= 6) {
          if (col <= 2) gridNum = 6;
          else if (col >= 6) gridNum = 8;
          else gridNum = 7;
        } else {
          if (col <= 2) gridNum = 3;
          else if (col >= 6) gridNum = 5;
          else gridNum = 4;
        }
        for (let j = 1; j <= 9; j++) {
          let p = true;
          for (let k = 0; k < 9; k++) {
            if (grid[row][k] === j) {
              p = false;
              break;
            }
          }
          if (p === false) continue;
          for (let k = 0; k < 9; k++) {
            if (grid[k][col] === j) {
              p = false;
              break;
            }
          }
          if (p === false) continue;
          for (
            let k = Math.floor(gridNum / 3) * 3;
            k < Math.floor(gridNum / 3) * 3 + 3;
            k++
          ) {
            for (let l = (gridNum % 3) * 3; l < (gridNum % 3) * 3 + 3; l++) {
              if (grid[k][l] === j) {
                p = false;
                break;
              }
            }
            if (p === false) break;
          }
          if (p === true) {
            grid[row][col] = j;
            break;
          }
        }
      }
      setSudoku(grid);
    }

    function getSudoku(clues: number) {
      const arr = Array(81).fill(1);
      const cells = [];
      let start = 0;
      for (let i = 0; i < clues; i++) {
        let random = Math.floor(Math.random() * 80) + 1;
        while (random--) {
          start++;
          if (start === 82) start = 1;
          if (arr[start - 1] === 0) random++;
        }
        cells.push(start - 1);
        arr[start - 1] = 0;
      }
      return fillCells(cells);
    }
    let numClues = getNumClues();
    getSudoku(numClues);
  }

  return (
    <div className="play-sudoku-container">
      <div className="difficulty-selection">
        <label htmlFor="difficulty" className="difficulty-label">
          Select Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
          className="difficulty-dropdown"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button
          className={`play-sudoku-button`}
          onClick={handleGetSudoku}
          disabled={difficulty === ""}
        >
          Submit
        </button>
      </div>
      {sudoku.length !== 0 && (
        <div className="sudoku-wrapper">
          <Sudoku sudoku={sudoku} difficulty={difficulty} />
        </div>
      )}
    </div>
  );
}

export function Sudoku({
  sudoku,
  difficulty,
}: {
  sudoku: number[][];
  difficulty: string;
}) {
  const navigator = useNavigate();
  const [grid, setGrid] = useState<number[][]>(
    Array(9).map(() => Array(9).fill(""))
  );
  const [staticCell, setStaticCell] = useState<boolean[][]>(
    Array(9).map(() => Array(9).fill(true))
  );

  useEffect(() => {
    const staticArr: boolean[][] = [];
    for (let i = 0; i < 9; i++) {
      let statics = [];
      for (let j = 0; j < 9; j++) {
        statics.push(sudoku[i][j] !== 0);
      }
      staticArr.push(statics);
    }
    setGrid(sudoku);
    setStaticCell(staticArr);
  }, [sudoku]);

  const handleChange = (row: number, col: number, value: number): void => {
    if (!isNaN(value) && value >= 1 && value <= 9) {
      const newGrid = [...grid];
      newGrid[row][col] = value;
      setGrid(newGrid);
    } else if (value === 0) {
      const newGrid = [...grid];
      newGrid[row][col] = 0;
      setGrid(newGrid);
    }
  };

  const renderCell = (row: number, col: number): JSX.Element => {
    return (
      <input
        type="text"
        maxLength={1}
        value={grid[row][col] || ""}
        onChange={(e) =>
          !staticCell[row][col] &&
          handleChange(row, col, Number(e.target.value))
        }
        className={`sudoku-cell ${
          staticCell[row][col] ? "static" : "editable"
        }`}
      />
    );
  };

  function submitSudoku() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          alert("All cells must be filled.");
          return;
        }
      }
    }

    // Check if each row contains unique values
    for (let row = 0; row < 9; row++) {
      const rowValues = grid[row].filter((cell) => cell !== 0);
      const uniqueValues = new Set(rowValues);
      if (rowValues.length !== uniqueValues.size) {
        alert("Invalid Sudoku: A row contains duplicate values.");
        return;
      }
    }

    // Check if each column contains unique values
    for (let col = 0; col < 9; col++) {
      const columnValues = grid
        .map((row) => row[col])
        .filter((cell) => cell !== 0);
      const uniqueValues = new Set(columnValues);
      if (columnValues.length !== uniqueValues.size) {
        alert("Invalid Sudoku: A column contains duplicate values.");
        return;
      }
    }

    // Check if each 3x3 subgrid contains unique values
    for (let startRow = 0; startRow < 9; startRow += 3) {
      for (let startCol = 0; startCol < 9; startCol += 3) {
        const subgridValues: number[] = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const value = grid[startRow + i][startCol + j];
            if (value !== 0) subgridValues.push(value);
          }
        }
        const uniqueValues = new Set(subgridValues);
        if (subgridValues.length !== uniqueValues.size) {
          alert("Invalid Sudoku: A 3x3 subgrid contains duplicate values.");
          return;
        }
      }
    }

    alert("Correct Solution");

    setTimeout(() => {
      navigator("");
    }, 1500);
  }

  return (
    <>
      <div className="sudoku-container">
        <div className="sudoku-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((_, colIndex) => (
                <div key={colIndex} className="sudoku-cell-wrapper">
                  {renderCell(rowIndex, colIndex)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="sudoku-footer">
          <button className="sudoku-button" onClick={submitSudoku}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
