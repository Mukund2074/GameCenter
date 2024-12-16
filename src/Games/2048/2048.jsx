import React, { useState, useEffect } from 'react';
import './styles.css'; // Add styles for the game

 const Game2048 = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [gameOver, setGameOver] = useState(false);

  function createInitialBoard() {
    const board = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(board);
    addRandomTile(board);
    return board;
  }

  function addRandomTile(board) {
    const emptyTiles = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) {
          emptyTiles.push({ r, c });
        }
      }
    }
    const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  const move = (direction) => {
    let newBoard = JSON.parse(JSON.stringify(board));
    let moved = false;

    switch (direction) {
      case 'up':
        for (let c = 0; c < 4; c++) {
          let stack = [];
          for (let r = 0; r < 4; r++) {
            if (newBoard[r][c] !== 0) {
              stack.push(newBoard[r][c]);
            }
          }
          const mergedRow = mergeTiles(stack);
          for (let r = 0; r < 4; r++) {
            newBoard[r][c] = mergedRow[r] || 0;
          }
          if (JSON.stringify(newBoard) !== JSON.stringify(board)) moved = true;
        }
        break;
      case 'down':
        for (let c = 0; c < 4; c++) {
          let stack = [];
          for (let r = 3; r >= 0; r--) {
            if (newBoard[r][c] !== 0) {
              stack.push(newBoard[r][c]);
            }
          }
          const mergedRow = mergeTiles(stack);
          for (let r = 3; r >= 0; r--) {
            newBoard[r][c] = mergedRow[3 - r] || 0;
          }
          if (JSON.stringify(newBoard) !== JSON.stringify(board)) moved = true;
        }
        break;
      case 'left':
        for (let r = 0; r < 4; r++) {
          let stack = [];
          for (let c = 0; c < 4; c++) {
            if (newBoard[r][c] !== 0) {
              stack.push(newBoard[r][c]);
            }
          }
          const mergedRow = mergeTiles(stack);
          for (let c = 0; c < 4; c++) {
            newBoard[r][c] = mergedRow[c] || 0;
          }
          if (JSON.stringify(newBoard) !== JSON.stringify(board)) moved = true;
        }
        break;
      case 'right':
        for (let r = 0; r < 4; r++) {
          let stack = [];
          for (let c = 3; c >= 0; c--) {
            if (newBoard[r][c] !== 0) {
              stack.push(newBoard[r][c]);
            }
          }
          const mergedRow = mergeTiles(stack);
          for (let c = 3; c >= 0; c--) {
            newBoard[r][c] = mergedRow[3 - c] || 0;
          }
          if (JSON.stringify(newBoard) !== JSON.stringify(board)) moved = true;
        }
        break;
      default:
        break;
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      checkGameOver(newBoard);
    }
  };

  const mergeTiles = (tiles) => {
    const newTiles = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === tiles[i + 1]) {
        newTiles.push(tiles[i] * 2);
        i++;
      } else {
        newTiles.push(tiles[i]);
      }
    }
    return [...newTiles, 0, 0, 0, 0].slice(0, 4);
  };

  const checkGameOver = (newBoard) => {
    if (newBoard.flat().includes(0)) return;
    setGameOver(true);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        move('up');
        break;
      case 'ArrowDown':
        move('down');
        break;
      case 'ArrowLeft':
        move('left');
        break;
      case 'ArrowRight':
        move('right');
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (direction) => {
    move(direction);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  return (
    <div className="game-container">
      <h1>2048 Game</h1>
      <div className="board">
        {board.map((row, rIndex) => (
          <div key={rIndex} className="row">
            {row.map((value, cIndex) => (
              <div key={cIndex} className={`tile tile-${value}`}>
                {value > 0 ? value : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">Game Over!</div>}
      <div className="controls">
        <button onClick={() => handleButtonClick('up')}>Up</button>
        <button onClick={() => handleButtonClick('left')}>Left</button>
        <button onClick={() => handleButtonClick('down')}>Down</button>
        <button onClick={() => handleButtonClick('right')}>Right</button>
      </div>
    </div>
  );
};

export default Game2048;