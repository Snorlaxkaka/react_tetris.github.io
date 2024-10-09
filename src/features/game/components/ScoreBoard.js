import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resume, pause, restart, setScore } from '../game-slice'
import '../../../styles/ScoreBoard.css'

// 得分块 
export default function ScoreBoard (props) {
  //  eslint-disable-next-line 
  const dispatch = useDispatch()
  const game = useSelector((state) => state.game)
  const { score, isRunning, gameOver, highestScore } = game

  useEffect(() => {
    if (score > highestScore) {
      dispatch(setScore(score))
    }
    // eslint-disable-next-line
  }, [score, highestScore,])

  //暂停或继续
  function playHandler () {
    if (gameOver) return
    if (isRunning) {
      dispatch(pause())
    } else {
      dispatch(resume())
    }
  }
  //重开
  function restartHandler () {
    dispatch(restart())
  }

  return (
    <div className="score-board">
      <div>当前得分：{score}  </div>
      <div>最高得分：{highestScore} </div>
      <div className="btn-container">
        <button className="score-board-button" onClick={playHandler}>
          {isRunning ? '暂停' : '继续'}
        </button>
        <button className="score-board-button" onClick={restartHandler}>
          重开
        </button>
      </div>
    </div>
  )
}
