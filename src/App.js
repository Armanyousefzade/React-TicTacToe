import { useState } from "react";

function Cell({ value, onCellClick }) {
  return (
    <button className="square" onClick={onCellClick}>
      {value}
    </button>
  );
}

function Grid({ isXNext, gridState, onGridUpdate }) {
  function handleCellClick(index) {
    if (findWinner(gridState) || gridState[index]) {
      return;
    }
    const newGridState = gridState.slice();
    newGridState[index] = isXNext ? "X" : "O";
    onGridUpdate(newGridState);
  }

  const winner = findWinner(gridState);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (isXNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Cell value={gridState[0]} onCellClick={() => handleCellClick(0)} />
        <Cell value={gridState[1]} onCellClick={() => handleCellClick(1)} />
        <Cell value={gridState[2]} onCellClick={() => handleCellClick(2)} />
      </div>
      <div className="board-row">
        <Cell value={gridState[3]} onCellClick={() => handleCellClick(3)} />
        <Cell value={gridState[4]} onCellClick={() => handleCellClick(4)} />
        <Cell value={gridState[5]} onCellClick={() => handleCellClick(5)} />
      </div>
      <div className="board-row">
        <Cell value={gridState[6]} onCellClick={() => handleCellClick(6)} />
        <Cell value={gridState[7]} onCellClick={() => handleCellClick(7)} />
        <Cell value={gridState[8]} onCellClick={() => handleCellClick(8)} />
      </div>
    </>
  );
}

export default function TicTacToe() {
  const [moves, setMoves] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const isXNext = currentStep % 2 === 0;
  const currentGrid = moves[currentStep];

  function handleGridUpdate(newGrid) {
    const updatedMoves = [...moves.slice(0, currentStep + 1), newGrid];
    setMoves(updatedMoves);
    setCurrentStep(updatedMoves.length - 1);
  }

  function moveToStep(step) {
    setCurrentStep(step);
  }

  const historyButtons = moves.map((grid, move) => (
    <li key={move}>
      <button onClick={() => moveToStep(move)}>
        {move > 0 ? "Go to move #" + move : "Go to game start"}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <div className="game-board">
        <Grid
          isXNext={isXNext}
          gridState={currentGrid}
          onGridUpdate={handleGridUpdate}
        />
      </div>
      <div className="game-info">
        <ol>{historyButtons}</ol>
      </div>
    </div>
  );
}

function findWinner(grid) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of winningCombos) {
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      return grid[a];
    }
  }
  return null;
}
