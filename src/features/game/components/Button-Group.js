import React, { useEffect } from 'react'
import '../../../styles/Controls.css'

import { useSelector, useDispatch } from 'react-redux'
import { moveLeft, moveRight, moveDown, rotate } from '../game-slice'

export default function Controls (props) {
  const dispatch = useDispatch()
  const isRunning = useSelector((state) => state.game.isRunning)
  const gameOver = useSelector((state) => state.game.gameOver)
  //旋转
  const handleRotate = () => {
    if (!isRunning || gameOver) return
    dispatch(rotate())
  }
  //右移
  const handleRight = () => {
    if (!isRunning || gameOver) return
    dispatch(moveRight())
  }
  //左移
  const handleLeft = () => {
    if (!isRunning || gameOver) return
    dispatch(moveLeft())
  }
  //下移
  const handleDown = () => {
    if (!isRunning || gameOver) return
    dispatch(moveDown())
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleLeft()
          break
        case 'ArrowRight':
          handleRight()
          break
        case 'ArrowDown':
          handleDown()
          break
        case 'ArrowUp':
          handleRotate()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line
  }, [isRunning, gameOver])

  return (
    <div className="controls">
      {/* left */}
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={handleLeft}
      >
        左移
      </button>
      {/* right */}
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={handleRight}
      >
        右移
      </button>
      {/* rotate */}
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={handleRotate}
      >
        旋转
      </button>
      {/* down */}
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={handleDown}
      >
        下移
      </button>
    </div>
  )
}
