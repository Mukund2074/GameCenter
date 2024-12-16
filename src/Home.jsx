import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="app-container">
            <div className="header">
                <h1>Welcome to Game Center</h1>
            </div>

            <div className="cards-container">
                <div className="card">
                    <Link to="/2048" className="card-link">
                        <div className="card-content">
                            <h3>2048</h3>
                        </div>
                    </Link>
                </div>

                <div className="card">
                    <Link to="/snake" className="card-link">
                        <div className="card-content">
                            <h3>Snake Game</h3>
                        </div>
                    </Link>
                </div>

                <div className="card">
                    <Link to="/tictactoe" className="card-link">
                        <div className="card-content">
                            <h3>Tic Tac Toe</h3>
                        </div>
                    </Link>
                </div>

                <div className="card">
                    <Link to="/memoryCard" className="card-link">
                        <div className="card-content">
                            <h3>Memory Card</h3>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="credits">
                <p>Developed by Mukund Hadiya</p>
            </div>

        </div>
    );
};

export default Home;
