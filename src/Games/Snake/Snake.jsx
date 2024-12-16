import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
    const [snake, setSnake] = useState([[0, 0]]);
    const [food, setFood] = useState([5, 5]);
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const gridSize = 10;

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [direction]);

    useEffect(() => {
        const gameInterval = setInterval(() => {
            moveSnake();
        }, 200);
        return () => clearInterval(gameInterval);
    }, [snake]);

    const moveSnake = () => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = newSnake[0];

        let newHead;
        switch (direction) {
            case 'UP':
                newHead = [head[0] - 1, head[1]];
                break;
            case 'DOWN':
                newHead = [head[0] + 1, head[1]];
                break;
            case 'LEFT':
                newHead = [head[0], head[1] - 1];
                break;
            case 'RIGHT':
                newHead = [head[0], head[1] + 1];
                break;
            default:
                return;
        }

        // Check for collision with food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            newSnake.unshift(newHead);
            setFood(generateFood());
        } else {
            newSnake.unshift(newHead);
            newSnake.pop();
        }

        // Check for collision with walls or self
        if (
            newHead[0] < 0 ||
            newHead[0] >= gridSize ||
            newHead[1] < 0 ||
            newHead[1] >= gridSize ||
            newSnake.slice(1).some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
            setGameOver(true);
        }

        setSnake(newSnake);
    };

    const generateFood = () => {
        let newFood;
        do {
            newFood = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)];
        } while (snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
        return newFood;
    };

    const resetGame = () => {
        setSnake([[0, 0]]);
        setFood(generateFood());
        setDirection('RIGHT');
        setGameOver(false);
    };

    return (
        <div style={styles.container}>
            <h1>Snake Game</h1>
            <div style={styles.grid}>
                {Array.from({ length: gridSize }).map((_, rowIndex) =>
                    <div key={rowIndex} style={styles.row}>
                        {Array.from({ length: gridSize }).map((_, colIndex) => {
                            const isSnake = snake.some(segment => segment[0] === rowIndex && segment[1] === colIndex);
                            const isFood = food[0] === rowIndex && food[1] === colIndex;
                            return (
                                <div
                                    key={colIndex}
                                    style={{
                                        ...styles.cell,
                                        backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'white'
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            {gameOver && (
                <div>
                    <h2>Game Over!</h2>
                    <button onClick={resetGame} style={styles.button}>Play Again</button>
                </div>
            )}


          <br />  <button onClick={() => setDirection('UP')} style={styles.button}>Up</button> <br />
            <button onClick={() => setDirection('LEFT')} style={styles.button}>Left</button>
            <button onClick={() => setDirection('RIGHT')} style={styles.buttonleft}>Right</button> <br />
            <button onClick={() => setDirection('DOWN')} style={styles.button}>Down</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
    },
    grid: {
        display: 'inline-block',
        border: '1px solid #000',
    },
    row: {
        display: 'flex',
    },
    cell: {
        width: '30px',
        height: '30px',
        border: '1px solid #ccc',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
    buttonleft: {
        marginTop: '20px',
        marginLeft: '30px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
};

export default SnakeGame;
