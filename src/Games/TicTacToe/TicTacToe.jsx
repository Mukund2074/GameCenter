import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || popupMessage) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for winner or draw after the move
    if (calculateWinner(newBoard)) {
      setPopupMessage(`Winner: ${isXNext ? 'X' : 'O'}`);
    } else if (newBoard.every((square) => square !== null)) {
      setPopupMessage("It's a Draw!");
    }
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setPopupMessage(null);
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
      {popupMessage && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content">
            <h2>{popupMessage}</h2>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .game-container {
          text-align: center;
          background: linear-gradient(135deg, #ff0080, #00bfff);
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          color: white;
          font-family: 'Courier New', Courier, monospace;
        }

        h1 {
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
        }

        .board {
          display: inline-block;
          margin: 20px 0;
          perspective: 1000px;
        }

        .row {
          display: flex;
        }

        .square {
          width: 80px;
          height: 80px;
          font-size: 40px;
          margin: 5px;
          cursor: pointer;
          border: none;
          border-radius: 10px;
          background: linear-gradient(145deg, #6a1b9a, #8e24aa);
          color: white;
          box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .square:hover {
          transform: translateY(-5px);
          box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.5);
        }

        .status {
          margin: 20px 0;
          font-size: 24px;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        }

        .reset-button {
          padding: 10px 20px;
          font-size: 18px;
          border: none;
          border-radius: 10px;
          background-color: #00bfff;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          transition: background-color 0.3s, transform 0.2s;
        }

        .reset-button:hover {
          background-color: #0081cb;
          transform: translateY(-3px);
        }

        .popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s;
        }

        .popup-content {
          background: linear-gradient(145deg, #2e2e2e, #4c4c4c);
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          color: white;
        }

        .close-button {
          margin-top: 15px;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          background-color: #ff0080;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .close-button:hover {
          background-color: #e6006d;
          transform: translateY(-3px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

const calculateWinner = (squares) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
