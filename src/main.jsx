import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Game2048 from './Games/2048/2048'
import SnakeGame from './Games/Snake/Snake'
import TicTacToe from './Games/TicTacToe/TicTacToe'
import MemoryCardGame from './Games/MemoryCard/MemoryCard'
import './index.css'
import Home from './Home'


const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/2048',
    element: <Game2048 />
  },
  {
    path: '/snake',
    element: <SnakeGame />
  },
  {
    path: 'tictactoe',
    element: <TicTacToe />
  },
  {
    path: 'memoryCard',
    element: <MemoryCardGame />
  }

])


createRoot(document.getElementById('root')).render(
    <RouterProvider router={browserRouter} />
)
