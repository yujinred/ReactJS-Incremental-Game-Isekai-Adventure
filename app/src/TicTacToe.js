import "./TicTacToe.css";
import { useState } from "react";

function Square({ className, value, onSquareClick }) {
  return (
    <button className={`square ${className || ''}`.trim()} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, currentMove, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winnerResult = calculateWinner(squares);
  const winner = winnerResult ? winnerResult[0] : null;
  const winningLines = winnerResult ? winnerResult[1] : null;
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (currentMove < 9) {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  } else {
    status = "It's a draw";
  }

  const board = [];
  for (let i = 0; i < 3; i++) {
    const rows = [];
    for (let j = 0; j < 3; j++) {
      const currentPlace = i * 3 + j;
      rows.push(
        <Square
          key={currentPlace}
          className={
            winningLines && winningLines.includes(currentPlace)? "winning-move" : ""
          }
          value={squares[currentPlace]}
          onSquareClick={() => handleClick(currentPlace)}
        />
      );
    }
    board.push(<div key={i} className="board-row">{rows}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortBackwards, setSortBackwards] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function calculatePlayedSquare(squares, move) {
    if (move === 0) return -1;
    const prevSquares = history[move - 1];

    for (let i = 0; i < 9; i++) {
      if (prevSquares[i] != squares[i]) {
        return i;
      }
    }

    return -1;
  }

  const moves = history.map((squares, move) => {
    let description;
    const playedSquare = calculatePlayedSquare(squares, move);
    const previouslyPlayedSquare = playedSquare >= 0 ? ` at (${(playedSquare % 3)+ 1}, ${Math.floor(playedSquare / 3) + 1})` : '';
    if (move === currentMove) {
      return (
        <li key={move}>
          {"You are at move #" + move + previouslyPlayedSquare}
        </li>
      );
    }

    if (move > 0) {
      description = "Go to move #" + move + previouslyPlayedSquare;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function sortHistory() {
    setSortBackwards(!sortBackwards);
  }

  const displayedMoves = sortBackwards ? moves.toReversed() : moves;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          currentMove={currentMove}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <button onClick={sortHistory}>Sort Moves</button>
        <ol>{displayedMoves}</ol>
      </div>
    </div>
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
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}
