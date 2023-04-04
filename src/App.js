import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };
  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };
  const moves = history.map((pastMove, move) => {
    let desciption = "";
    desciption = move ? `Go to move #${move}` : `Go to game start`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desciption}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  let status = "";
  const handleSqaureClick = (i) => {
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };
  const winner = calculateWinner(squares);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square val={squares[0]} onSqaureClick={() => handleSqaureClick(0)} />
        <Square val={squares[1]} onSqaureClick={() => handleSqaureClick(1)} />
        <Square val={squares[2]} onSqaureClick={() => handleSqaureClick(2)} />
      </div>
      <div className="board-row">
        <Square val={squares[3]} onSqaureClick={() => handleSqaureClick(3)} />
        <Square val={squares[4]} onSqaureClick={() => handleSqaureClick(4)} />
        <Square val={squares[5]} onSqaureClick={() => handleSqaureClick(5)} />
      </div>
      <div className="board-row">
        <Square val={squares[6]} onSqaureClick={() => handleSqaureClick(6)} />
        <Square val={squares[7]} onSqaureClick={() => handleSqaureClick(7)} />
        <Square val={squares[8]} onSqaureClick={() => handleSqaureClick(8)} />
      </div>
    </>
  );
}

function Square({ val, onSqaureClick }) {
  return (
    <button onClick={onSqaureClick} className="square">
      {val}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [first, sec, third] = lines[i];
    if (
      squares[first] &&
      squares[first] === squares[sec] &&
      squares[first] === squares[third]
    ) {
      return squares[first];
    }
  }
  return null;
}
