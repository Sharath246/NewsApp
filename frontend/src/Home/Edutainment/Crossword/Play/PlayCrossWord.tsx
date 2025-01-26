import React, { useState, useEffect } from "react";
import "../Styles/Sudoku.css";

type SudokuProps = {
  initialArray: number[];
};

type GridType = (number | "")[][];

const Sudoku: React.FC<SudokuProps> = ({ initialArray }) => {
  const [grid, setGrid] = useState<GridType>(
    Array(9)
      .fill(0)
      .map(() => Array(9).fill(""))
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (initialArray && initialArray.length === 81) {
      const newGrid: GridType = Array(9)
        .fill(0)
        .map((_, rowIndex) =>
          initialArray.slice(rowIndex * 9, rowIndex * 9 + 9)
        );
      setGrid(newGrid);
    }
  }, [initialArray]);

  useEffect(() => {
    const allFilled = grid.every((row) => row.every((cell) => cell !== ""));
    setIsSubmitDisabled(!allFilled);
  }, [grid]);

  const handleChange = (row: number, col: number, value: string): void => {
    const numericValue = Number(value);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 9) {
      const newGrid = [...grid];
      newGrid[row][col] = numericValue;
      setGrid(newGrid);
    } else if (value === "") {
      const newGrid = [...grid];
      newGrid[row][col] = "";
      setGrid(newGrid);
    }
  };

  function submitSudoku() {
    const isValid = (arr: (number | "")[]): boolean => {
      const seen = new Set<number>();
      for (const num of arr) {
        if (num !== "" && seen.has(num)) {
          return false;
        }
        if (num !== "") {
          seen.add(num);
        }
      }
      return true;
    };

    const checkRows = () => {
      for (let row = 0; row < 9; row++) {
        if (!isValid(grid[row])) {
          return false;
        }
      }
      return true;
    };

    const checkColumns = () => {
      for (let col = 0; col < 9; col++) {
        const column = grid.map((row) => row[col]);
        if (!isValid(column)) {
          return false;
        }
      }
      return true;
    };

    const checkSubgrids = () => {
      for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
          const subgrid = [];
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              subgrid.push(grid[row + i][col + j]);
            }
          }
          if (!isValid(subgrid)) {
            return false;
          }
        }
      }
      return true;
    };

    if (checkRows() && checkColumns() && checkSubgrids()) {
      alert("Sudoku is valid!");
    } else {
      alert("Sudoku is invalid.");
    }
  }

  const renderCell = (row: number, col: number): JSX.Element => {
    const cellValue = grid[row][col];
    const isStatic = typeof cellValue === "number" && cellValue !== 0;

    return (
      <input
        type="text"
        maxLength={1}
        value={cellValue || ""}
        onChange={(e) => !isStatic && handleChange(row, col, e.target.value)}
        className={`sudoku-cell ${!isStatic ? "editable" : ""}`}
        readOnly={isStatic}
        style={{ caretColor: "transparent", cursor: "context-menu" }}
      />
    );
  };

  return (
    <div className="sudoku-container">
      <div className="title">Sudoku Puzzle</div>
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((col, colIndex) => (
              <div
                key={colIndex}
                className={`sudoku-cell-wrapper ${
                  rowIndex % 3 === 2 && rowIndex !== 8 ? "bottom-border" : ""
                } ${
                  colIndex % 3 === 2 && colIndex !== 8 ? "right-border" : ""
                }`}
              >
                {renderCell(rowIndex, colIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sudoku-footer">
        <button
          onClick={submitSudoku}
          className={`footer-button-${isSubmitDisabled}`}
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
        <button
          onClick={() =>
            setGrid(
              Array(9)
                .fill(0)
                .map(() => Array(9).fill(""))
            )
          }
          className="footer-button-false"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
