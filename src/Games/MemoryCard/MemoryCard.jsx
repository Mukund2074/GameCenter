import React, { useState, useEffect } from 'react';

const cardImages = ['🐶', '🐱', '🐰', '🐻', '🦁', '🐼', '🐨', '🐸']; // 8 unique pairs

const MemoryCardGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        initializeCards();
    }, []);

    const initializeCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((image, index) => ({ image, id: index, flipped: false }));
        setCards(shuffledCards);
    };

    const handleCardClick = (id) => {
        if (flippedCards.length < 2 && !cards[id].flipped) {
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
                        style={{ ...styles.card, backgroundColor: card.flipped || matchedPairs.includes(card.image) ? '#FFF' : '#CCC' }}
                        onClick={() => handleCardClick(index)}
                    >
                        {card.flipped || matchedPairs.includes(card.image) ? card.image : '?'}
                    </div>
                ))}
            </div>
            <button onClick={resetGame} style={styles.button}>Reset Game</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 100px)',
        gap: '10px',
        justifyContent: 'center',
        margin: '20px 0',
    },
    card: {
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        cursor: 'pointer',
        border: '1px solid #000',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
};

export default MemoryCardGame;
