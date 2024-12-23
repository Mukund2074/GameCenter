import React, { useState, useEffect } from 'react';

const cardImages = ['🐶', '🐱', '🐰', '🐻', '🦁', '🐼', '🐨', '🐸']; 

const MemoryCardGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        initializeCards();
    }, []);

    useEffect(() => {
        if (matchedPairs.length === cardImages.length) {
            setGameWon(true); // Victory condition
        }
    }, [matchedPairs]);

    const initializeCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((image, index) => ({ image, id: index, flipped: false }));
        setCards(shuffledCards);
        setGameWon(false); // Reset gameWon state when initializing
    };

    const handleCardClick = (id) => {
        if (flippedCards.length < 2 && !cards[id].flipped && !gameWon) {
            const newCards = [...cards];
            newCards[id].flipped = true;
            setCards(newCards);
            setFlippedCards([...flippedCards, id]);

            if (flippedCards.length === 1) {
                setMoves(moves + 1);
                checkForMatch(newCards, id);
            }
        }
    };

    const checkForMatch = (newCards, id) => {
        const firstCard = flippedCards[0];
        if (newCards[firstCard].image === newCards[id].image) {
            setMatchedPairs([...matchedPairs, newCards[firstCard].image]);
            setFlippedCards([]);
        } else {
            setTimeout(() => {
                newCards[firstCard].flipped = false;
                newCards[id].flipped = false;
                setCards(newCards);
                setFlippedCards([]);
            }, 1000);
        }
    };

    const resetGame = () => {
        initializeCards();
        setMatchedPairs([]);
        setMoves(0);
        setFlippedCards([]);
    };

    return (
        <div style={styles.container}>
            <h1>Memory Card Game</h1>
            <h2>Moves: {moves}</h2>
            <div style={styles.grid}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.card, 
                            backgroundColor: card.flipped || matchedPairs.includes(card.image) ? '#FFF' : '#CCC',
                            transform: matchedPairs.includes(card.image) && gameWon ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.3s ease, background-color 0.3s ease'
                        }}
                        onClick={() => handleCardClick(index)}
                    >
                        {card.flipped || matchedPairs.includes(card.image) ? card.image : '?'}
                    </div>
                ))}
            </div>
            <button onClick={resetGame} style={styles.button}>Reset Game</button>
            {gameWon && <div style={styles.victoryMessage}>You Win!</div>}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, calc(25% - 10px))',
        gap: '10px',
        justifyContent: 'center',
        padding: '10px',
    },
    card: {
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        cursor: 'pointer',
        border: '1px solid #000',
        transition: 'transform 0.2s ease-in-out',
        borderRadius: '8px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
    victoryMessage: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'green',
        marginTop: '20px',
        animation: 'victory 1s ease-in-out',
    },
    '@keyframes victory': {
        '0%': {
            transform: 'scale(0)',
            opacity: '0',
        },
        '100%': {
            transform: 'scale(1)',
            opacity: '1',
        },
    },
    '@media (max-width: 768px)': {
        grid: {
            gridTemplateColumns: 'repeat(4, calc(50% - 10px))',  
        },
        card: {
            width: '50px',
            height: '50px',
            fontSize: '18px',  
        },
        button: {
            fontSize: '14px',  
        }
    },
    '@media (max-width: 480px)': {
        grid: {
            gridTemplateColumns: 'repeat(4, calc(100% - 10px))',  
        },
        card: {
            width: '40px',
            height: '40px',
            fontSize: '16px',  
        },
        button: {
            fontSize: '12px',  
        }
    },
};

export default MemoryCardGame;
    