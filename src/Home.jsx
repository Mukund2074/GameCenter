import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main className="home">
            <header className="header">
                <h1 className="title">Welcome to Game Center</h1>
            </header>

            <section className="game-links">
                <Link to="/2048" className="game-link">
                    <h3>2048</h3>
                </Link>

                <Link to="/snake" className="game-link">
                    <h3>Snake Game</h3>
                </Link>

                <Link to="/tictactoe" className="game-link">
                    <h3>Tic Tac Toe</h3>
                </Link>

                <Link to="/memoryCard" className="game-link">
                    <h3>Memory Card</h3>
                </Link>
            </section>

            <footer className="footer">
                <p>Developed by Mukund Hadiya</p>
            </footer>
        </main>
    );
};

export default Home;
