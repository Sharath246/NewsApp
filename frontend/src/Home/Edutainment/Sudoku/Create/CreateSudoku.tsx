import React, { useState } from "react";
import "./CreateSudoku.css";
import { setSudoku } from "../../../../api/games";

export default function CreateSudoku() {
  const [grid, setGrid] = useState<string[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(""))
  );
  const [difficulty, setDifficulty] = useState("easy");

  const handleChange = (row: number, col: number, value: string): void => {
    const numericValue = Number(value);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 9) {
      const newGrid = [...grid];
      newGrid[row][col] = value;
      setGrid(newGrid);
    } else if (value === "") {
      const newGrid = [...grid];
      newGrid[row][col] = "";
      setGrid(newGrid);
    }
  };

  const validateGrid = (): boolean => {
    const isValid = (arr: string[]): boolean => {
      const seen = new Set<string>();
      for (const num of arr) {
        if (num !== "") {
          if (seen.has(num)) return false;
          seen.add(num);
        }
      }
      return true;
    };

    // Validate rows
    for (const row of grid) {
      if (!isValid(row)) {
        alert("Invalid Sudoku: A row contains duplicate numbers.");
        return false;
      }
    }

    // Validate columns
    for (let col = 0; col < 9; col++) {
      const column = grid.map((row) => row[col]);
      if (!isValid(column)) {
        alert("Invalid Sudoku: A column contains duplicate numbers.");
        return false;
      }
    }

    // Validate 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const subgrid: string[] = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            subgrid.push(grid[row + i][col + j]);
          }
        }
        if (!isValid(subgrid)) {
          alert("Invalid Sudoku: A subgrid contains duplicate numbers.");
          return false;
        }
      }
    }
    let count=0;
    for(let i=0;i<9;i++)
    {
      for(let j=0;j<9;j++)
      {
        if(grid[i][j]!=="")
          count++;
      }
    }
    console.log(count);
    if(count<20)
    {
      alert("Fill Atleast 20 Cells");
      return false;
    }
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateGrid()) {
      return;
    }

    const sudokuString = grid
      .map((row) => row.map((cell) => (cell === "" ? "0" : cell)).join(""))
      .join("");

    try {
      const response = await setSudoku(sudokuString, difficulty);
      if (response === "Failed") {
        alert("Failed to submit Sudoku.");
      }
    } catch (error) {
      console.error("Error submitting Sudoku:", error);
      alert("An error occurred while submitting the Sudoku.");
    }
  };

  const renderCell = (row: number, col: number): JSX.Element => {
    const cellValue = grid[row][col];

    return (
      <input
        type="text"
        maxLength={1}
        value={cellValue || ""}
        onChange={(e) => handleChange(row, col, e.target.value)}
        className="create-sudoku-cell"
      />
    );
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  return (
    <div className="create-sudoku-container">
      <h2 className="create-sudoku-title">Create Your Sudoku</h2>

      <div className="difficulty-selection">
        <label htmlFor="difficulty" className="difficulty-label">
          Select Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="difficulty-dropdown"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="create-sudoku-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="create-sudoku-row">
            {row.map((_, colIndex) => (
              <div key={colIndex} className="create-sudoku-cell-wrapper">
                {renderCell(rowIndex, colIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="create-sudoku-footer">
        <button className="create-sudoku-button" onClick={handleSubmit}>
          Submit Sudoku
        </button>
      </div>
    </div>
  );
}
